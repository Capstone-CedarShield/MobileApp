
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderDetails from "../components/IncidentDetails/HeaderDetails";
import BottomNavBar from "../components/shared/BottomNavBar";
import IncidentGallery from "../components/IncidentDetails/IncidentGallery";


const BASE_URL = "http://10.0.2.2:3000";

const IncidentContent = ({ route }) => {

  const { title, location, date, severity, images } = route.params;

  const imageUrls = images.map((imagePath) => ({
    uri: `${BASE_URL}/${imagePath.replace(/\\/g, "/")}`,
  }));
  

  console.log(imageUrls);

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <HeaderDetails
          date={date}
          title={title}
          location={location}
          severity={severity} 
        />


        <IncidentGallery images={imageUrls} />

        <View style={{ height: 80 }} />
      </ScrollView>

      <BottomNavBar style={styles.navBar} />
    </View>
  );
};

export default IncidentContent;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: "12%",
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  urgencyContainer: {
    padding: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginVertical: 10,
  },
  urgencyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
