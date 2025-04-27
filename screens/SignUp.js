import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Alert, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SharedForm from "../components/authForm/SharedForm";
import { AuthContext } from "../context/AuthContext";
import { signUp } from "../services/firebase/firebaseServices";
import {signUpApi} from "../services/user/UserServices";

const SignUp = () => {
  const { auth, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  const handleSignUp = async (email, password, phone,fullName) => {

    try {
      const userCredential = await signUp(email, password, phone, fullName);
      Alert.alert(
        "Success",
        "Account created! Please check your email to verify your account before logging in."
      );
      signUpApi(email, phone, fullName);
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
    setLoading(false);
  };



  return (
    <View style={styles.container}>
      <SharedForm
        title="Sign up"
        buttonText="Sign up"
        onSubmit={handleSignUp}
        isSignUp={true}
        imageSource={require("../assets/signup-image.png")}
        navigation={navigation}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginVertical: 10,
  },
});

export default SignUp;
