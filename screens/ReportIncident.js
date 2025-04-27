import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavBar from "../components/shared/BottomNavBar";
import { logout } from "../services/firebase/firebaseServices";

const { width, height } = Dimensions.get("window");

const ReportIncident = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const navigation = useNavigation();
  const handleReportPress = () => {
    navigation.navigate("ReportIncidentDetails");
  };
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1200, 
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, 
          duration: 1200, 
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => pulse()); 
    };

    pulse();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Report an Incident</Text>
        <Text style={styles.subtitle}>
          Click 'Report Now' to provide essential details and help us respond
          effectively.
          {"\n"}Stay safe!
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <View style={styles.outerCircle}>
          <View style={styles.middleCircle}>
            <Animated.View
              style={[styles.button, { transform: [{ scale: scaleAnim }] }]}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={handleReportPress}
              >
                <Text style={styles.buttonText}>Report Now</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: height * 0.08,
    paddingBottom: height * 0.2,
    backgroundColor: "#fff",
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    width: "80%",
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: "#FBF6F6",
    alignItems: "center",
    justifyContent: "center",
  },
  middleCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: "#F8EAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: width * 0.48,
    height: width * 0.48,
    borderRadius: (width * 0.48) / 2,
    backgroundColor: "#D23C3C",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ReportIncident;
