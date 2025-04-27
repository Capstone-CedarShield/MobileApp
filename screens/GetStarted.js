import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/shared/CustomButton";

const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 🔹 Top Content */}
      <View style={styles.topContainer}>
        {/* 🔹 Image */}
        <Image
          source={require("../assets/getstarted-image.png")}
          style={styles.image}
        />

        {/* 🔹 Title with "Cedar" in red */}
        <Text style={styles.title}>
          Welcome to <Text style={styles.cedarText}>Cedar</Text>Shield!
        </Text>

        {/* 🔹 Subtitle */}
        <Text style={styles.subtitle}>Stay Alert. Stay Safe.</Text>
      </View>

      {/* 🔹 Buttons - Placed at the bottom */}
      <View style={styles.bottomContainer}>
        <CustomButton
          title="Login"
          onPress={() => navigation.navigate("Login")}
        />

        <CustomButton
          title="Sign up"
          style={styles.outlinedButton}
          textStyle={styles.outlinedButtonText}
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Keeps top content up & buttons down
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 50, // Adds spacing at top & bottom
  },
  topContainer: {
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 230,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 1,
  },
  cedarText: {
    color: "#D23C3C",
  },
  subtitle: {
    fontSize: 19,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  outlinedButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#D23C3C",
    marginTop: 15,
  },
  outlinedButtonText: {
    color: "#D23C3C",
  },
});

export default GetStarted;
