import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import api from "../services/api/axiosInstance";

// Initialize the Geocoder with your Google API key
Geocoder.init(""); 

const Map = () => {
  // State to hold markers and loading state
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the region for Lebanon
  const lebanonRegion = {
    latitude: 33.8547, // Center of Lebanon
    longitude: 35.8623,
    latitudeDelta: 2.5,  // Increased delta for a more zoomed out view
    longitudeDelta: 2.5,
  };
  
  useEffect(() => {
    // Fetch incidents data from the API
    api.get("/api/incidents/verified/today")
      .then(async (response) => {
        const incidents = response.data;

        // For each incident, geocode the provided location string
        const markersData = await Promise.all(
          incidents.map(async (incident) => {
            try {
              const geoResponse = await Geocoder.from(incident.location);
              const { lat, lng } = geoResponse.results[0].geometry.location;
              return {
                id: incident.uuid,
                coordinate: {
                  latitude: lat,
                  longitude: lng,
                },
                title: incident.type || "Incident",
                description: incident.location,
              };
            } catch (error) {
              console.warn("Geocoding failed for", incident.location, error);
              return null;
            }
          })
        );

        // Remove any incidents where geocoding failed
        setMarkers(markersData.filter(marker => marker !== null));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching incidents:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={lebanonRegion}
        scrollEnabled={true}
        zoomEnabled={true}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};

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

export default Map;
