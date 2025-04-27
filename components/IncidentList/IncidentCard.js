import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For the arrow icon
import { useNavigation } from "@react-navigation/native";
import { formatTime } from "../../utils/formatTime"; // Adjust the path as needed

const IncidentCard = ({ id, icon, incidentType, location, dateTime }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("IncidentDetails", { incidentId: id })}
    >
      <Image source={icon} style={styles.icon} />
      <View style={styles.details}>
        <Text style={styles.incidentType}>{incidentType}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.dateTime}>{formatTime(dateTime)}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("IncidentDetails", { incidentId: id })}
        style={styles.viewMapContainer}
      >
        <Text style={styles.viewMapText}>View Details</Text>
        <MaterialIcons name="chevron-right" size={20} color="#9A9A9A" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Android shadow
    paddingBottom: 20,
    paddingTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  incidentType: {
    fontSize: 19,
    fontWeight: "600", // Semi-bold
  },
  location: {
    fontSize: 14,
    fontWeight: "300", // Light
    color: "#000",
  },
  dateTime: {
    fontSize: 14,
    fontWeight: "300", // Light
    color: "#9A9A9A",
    marginTop: 5,
  },
  viewMapContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewMapText: {
    fontSize: 14,
    color: "#9A9A9A",
  },
});

export default IncidentCard;
