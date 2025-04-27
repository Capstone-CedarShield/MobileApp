
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TestMap from "../shared/TestMap";

const MapSection = ({location,description }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.mapCard}>
        <View style={styles.mapInner}>
          <TestMap location={location} />
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Incident Description</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
};

export default MapSection;

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  mapCard: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  mapInner: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 18,
  },
});




