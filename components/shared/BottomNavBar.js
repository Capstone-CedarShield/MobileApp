import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the current active route

  // Function to check if a tab is active
  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.container}>
      {/* Leftmost Section (Home & Map) */}
      <View style={styles.leftSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.navItem}
        >
          <Image
            source={require("../../assets/icons/home-icon.png")}
            style={[
              styles.icon,
              isActive("Home") && styles.activeIcon,
            ]}
          />
          <Text
            style={[
              styles.text,
              isActive("Home") && styles.activeText,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <View style={{ width: 30 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate("Map")}
          style={styles.navItem}
        >
          <Image
            source={require("../../assets/icons/map-icon.png")}
            style={[styles.icon, isActive("Map") && styles.activeIcon]}
          />
          <Text style={[styles.text, isActive("Map") && styles.activeText]}>
            Map
          </Text>
        </TouchableOpacity>
      </View>

      {/* Floating Center Button */}
      <View style={styles.centerButtonWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ReportIncident")}
          style={styles.centerButton}
        >
          <Image
            source={require("../../assets/icons/plus-icon.png")}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Rightmost Section (List & Profile) */}
      <View style={styles.rightSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate("IncidentList")}
          style={styles.navItem}
        >
          <Image
            source={require("../../assets/icons/list-icon.png")}
            style={[styles.icon, isActive("IncidentList") && styles.activeIcon]}
          />
          <Text
            style={[styles.text, isActive("IncidentList") && styles.activeText]}
          >
            List
          </Text>
        </TouchableOpacity>
        <View style={{ width: 30 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.navItem}
        >
          <Image
            source={require("../../assets/icons/profile-icon.png")}
            style={[styles.icon, isActive("Profile") && styles.activeIcon]}
          />
          <Text style={[styles.text, isActive("Profile") && styles.activeText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: 110,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingHorizontal: 50,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "40%",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "40%",
  },
  navItem: {
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#9A9A9A", // Default gray color
  },
  text: {
    fontSize: 12,
    color: "#9A9A9A", // Default gray color
    marginTop: 4,
  },
  activeIcon: {
    tintColor: "#D23C3C", // Red when active
  },
  activeText: {
    color: "#D23C3C", // Red when active
  },
  centerButtonWrapper: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    left: width / 2 - 32.5,
  },
  centerButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#D23C3C",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  plusIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "#fff",
  },
});

export default BottomNavBar;