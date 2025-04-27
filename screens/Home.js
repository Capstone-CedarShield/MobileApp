import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import api from "../services/api/axiosInstance";
import BottomNavBar from "../components/shared/BottomNavBar";
import MyReportsCard from "../components/IncidentList/MyReportsCard";
import { getIncidentIcon } from "../utils/incidentIcon";
import { AuthContext } from "../context/AuthContext";


const TestScreen = () => {
  const [incidents, setIncidents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(AuthContext) || {};

  useEffect(() => {
    api
      .get("/api/incidents/verified/user", {
        params: {
          email: user?.email,
        },
      })
      .then((response) => {
        setIncidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching incidents:", error);
        setErrorMessage("Error fetching data");
      });
  }, []);

  const renderIncidentItem = ({ item }) => (
    <MyReportsCard
      id={item.uuid}
      icon={getIncidentIcon(item.type)}
      incidentType={item.type || "Unknown"}
      location={item.location || "Unknown"}
      dateTime={item.createdAt || "Unknown"}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Reports</Text>
        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : incidents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyMessage}>You have not reported any incidents yet.</Text>
          </View>
        ) : (
          <FlatList
            data={incidents}
            keyExtractor={(item) => item.uuid.toString()}
            renderItem={renderIncidentItem}
            contentContainerStyle={styles.listContent}
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
        )}
      </View>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  error: {
    marginTop: 20,
    color: "red",
    textAlign: "center",
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: "56%", // Adjust for BottomNavBar overlap
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  }
});

export default TestScreen;