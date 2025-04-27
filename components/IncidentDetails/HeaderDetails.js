import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getSeverityColor } from "./colorSet"; // Import the function

import placeholderIcon from "../../assets/icons/home-icon.png";
import { formatTime } from "../../utils/formatTime";
import {getIncidentIcon} from "../../utils/incidentIcon"; // Import the function

const HeaderDetails = ({ date, title, location, severity }) => {
  const { textColor, bgColor } = getSeverityColor(severity); // Get dynamic colors

  return (
    <View style={styles.headerContainer}>
      {/* Date at top */}
      <Text style={styles.dateText}>{formatTime(date)}</Text>

      {/* Main row with icon on the left, then textContainer */}
      <View style={styles.titleRow}>
        {/* Icon */}
        <Image source={getIncidentIcon(title)} style={styles.icon} />

        {/* Texts & Severity */}
        <View style={styles.textContainer}>
          <View style={styles.titleSeverityRow}>
            <Text style={styles.titleText}>{title}</Text>
            <View style={[styles.severityBadge, { backgroundColor: bgColor }]}>
              <Text style={[styles.severityText, { color: textColor }]}>
                {severity}
              </Text>
            </View>
          </View>
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderDetails;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 15,
    color: "#999",
    marginBottom: 14,
    marginTop: 7,
    textAlign: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  icon: {
    width: 42,
    height: 42,
    resizeMode: "contain",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  titleSeverityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 15,
    color: "#666",
    marginTop: 2,
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 5,
  },
  severityText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
