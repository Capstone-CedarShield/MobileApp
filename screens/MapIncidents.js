import React from "react";
import { View, StyleSheet } from "react-native";
import Map from "./Map";
import BottomNavBar from "../components/shared/BottomNavBar";

export default function MapIncidents() {
  return (
    <View style={styles.container}>
      <Map />
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});