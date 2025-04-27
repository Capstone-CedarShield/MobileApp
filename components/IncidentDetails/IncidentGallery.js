
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const IncidentGallery = ({ images }) => {
  return (
    <View style={styles.galleryContainer}>
      <Text style={styles.galleryTitle}>Incident Content</Text>
      <View style={styles.galleryGrid}>
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.galleryImage} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  galleryImage: {
    width: "32%", // Three images per row (100% / 3 ≈ 32%)
    height: 140, // Set height greater than width
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default IncidentGallery;

