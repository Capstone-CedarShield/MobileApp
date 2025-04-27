import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TestMap from "../shared/TestMap";
import { formatTime } from "../../utils/formatTime"; // Adjust the path as needed

const MyReportsCard = ({
  id,
  icon,
  incidentType,
  location,
  dateTime,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("IncidentDetails", { incidentId: id })}
    >
      <View style={styles.header}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.incidentType}>{incidentType}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
        <Text style={styles.dateTime}>{formatTime(dateTime)}</Text>
      </View>

      <View style={styles.mapWrapper}>
        <TestMap
          location={location}
          scrollEnabled={false}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 25,
    overflow: "hidden", // Ensures the map corners are rounded
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  incidentType: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  location: {
    fontSize: 16,
    fontWeight: "300",
    color: "#333",
    marginTop: 5,
  },
  dateTime: {
    fontSize: 14,
    fontWeight: "300",
    color: "#9A9A9A",
    marginLeft: 10,
  },
  mapWrapper: {
    width: "100%",
    height: 200, // Fixed height for better consistency
  },
});

export default MyReportsCard;
