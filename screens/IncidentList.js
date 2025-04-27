import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import api from "../services/api/axiosInstance";
import FilterTabs from "../components/IncidentList/FilterTabs";
import IncidentCard from "../components/IncidentList/IncidentCard";
import BottomNavBar from "../components/shared/BottomNavBar";
import { getIncidentIcon } from "../utils/incidentIcon"; // Import the function

// Updated filters: "Today" replaces "Pending"
const filters = ["All", "Most Urgent", "Today"];

// Helper function to check if a date is today
const isToday = (dateStr) => {
  const today = new Date();
  const date = new Date(dateStr);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const IncidentList = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [incidents, setIncidents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    api
      .get("/api/incidents/verified") // Fetch only verified incidents
      .then((response) => {
        setIncidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching incidents:", error);
        setErrorMessage("Could not load incidents.");
      });
  }, []);

  // **Sorting Function for Most Urgent**
  const urgencyOrder = {
    Urgent: 1,
    Moderate: 2,
    Low: 3,
  };

  const getFilteredIncidents = () => {
    if (selectedFilter === "All") {
      return incidents;
    }
    if (selectedFilter === "Most Urgent") {
      // Filter incidents that occurred today and then sort by urgency
      return incidents
        .filter((incident) => isToday(incident.createdAt))
        .sort(
          (a, b) => urgencyOrder[a.urgencyLevel] - urgencyOrder[b.urgencyLevel]
        );
    }
    if (selectedFilter === "Today") {
      // Filter incidents that occurred today
      return incidents.filter((incident) => isToday(incident.createdAt));
    }
    return incidents;
  };

  const renderIncidentItem = ({ item }) => (
    <IncidentCard
      id={item.uuid}
      icon={getIncidentIcon(item.type)} // Assuming getIncidentIcon is a function that returns the correct icon path
      incidentType={item.type || "Unknown"}
      location={item.location || "Unknown"}
      dateTime={item.createdAt || "Unknown"}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Incident List</Text>

        <View style={styles.filterTabsContainer}>
          <FilterTabs
            filters={filters}
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
          />
        </View>

        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : (
          <FlatList
            data={getFilteredIncidents()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderIncidentItem}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      <BottomNavBar />
    </View>
  );
};

export default IncidentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  error: {
    marginTop: 20,
    color: "red",
    textAlign: "center",
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: "56%", // Prevent overlap with BottomNavBar
  },
});
