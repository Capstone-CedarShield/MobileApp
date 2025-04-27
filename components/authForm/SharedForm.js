import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal } from "react-native";
import InputField from "../shared/InputField";
import CustomButton from "../shared/CustomButton";

const SharedForm = ({
  title,
  buttonText,
  onSubmit,
  isSignUp,
  imageSource,
  navigation,
  onForgotPassword,
  handleGoogleLogin 
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  const handlePhoneChange = (value) => {
    // Remove any non-numeric characters and the prefix if accidentally included
    const cleanNumber = value.replace(/\D/g, '').replace(/^961/, '');
    setPhone(cleanNumber);
  };

  return (
    <View style={styles.container}>
      {imageSource && (
        <Image source={imageSource} style={isSignUp ? styles.image : styles.largeImage} />
      )}

      <Text style={styles.title}>{title}</Text>

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.inputField, styles.fullWidth]}
      />

      {isSignUp && (
        <InputField
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={[styles.inputField, styles.fullWidth]}
        />
      )}

      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
        style={[styles.inputField, styles.fullWidth]}
      />

      {isSignUp && (
        <InputField
          placeholder="Phone Number"
          value={phone}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          isPhone={true}
          style={[styles.inputField, styles.fullWidth]}
        />
      )}

      {!isSignUp && (
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={onForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      )}

      <CustomButton
        title={buttonText}
        onPress={() => onSubmit(email, password, phone, fullName)}
        style={styles.fullWidthButton}
      />

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity 
        onPress={handleGoogleLogin} 
        style={styles.googleButton}>
        <Image
          source={require("../../assets/icons/google-icon.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      {isSignUp ? null : (
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don't have an account?{" "}
            <Text
              style={styles.signUpLink}
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      )}

      {isSignUp ? (
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      ) : null}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    paddingTop: 30, 
  },
  image: {
    width: 150,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  largeImage: {
    width: 200,
    height: 175,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
    width: "100%",
    textAlign: "center",
  },
  inputField: {
    marginBottom: 15,
  },

  forgotPasswordContainer: {
    width: "85%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#555",
    marginBottom: 25,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "85%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#888",
  },
  googleButton: {
    flexDirection: "row",
    width: "85%",
    height: 65,
    backgroundColor: "#F3F3F3",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 18,
    color: "#000",
  },
  signUpContainer: {
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
    color: "#555",
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "bold",
  },
  loginContainer: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#555",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SharedForm;