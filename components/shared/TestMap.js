import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geocoder from "react-native-geocoding";


Geocoder.init("AIzaSyBXGGBbpCxSdardQw9h_BlN6EwpGgARxTg");

const TestMap = memo(({ location, scrollEnabled = true, style }) => {
  const [region, setRegion] = useState(null);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location && typeof location === "string") {
      Geocoder.from(location)
        .then(json => {
          const { lat, lng } = json.results[0].geometry.location;
          const newRegion = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setRegion(newRegion);
          setCoords({ latitude: lat, longitude: lng });
          setLoading(false);
        })
        .catch(error => {
          console.warn("Geocoding error:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [location]);

  if (loading || !region) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={[styles.container, style]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        scrollEnabled={scrollEnabled}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        showsUserLocation={false}
        showsMyLocationButton={false}
        liteMode={true} // Better performance for multiple maps
      >
        {coords && <Marker coordinate={coords} />}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default TestMap;
