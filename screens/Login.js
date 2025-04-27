import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Alert, TextInput, Modal, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SharedForm from "../components/authForm/SharedForm";
import { AuthContext } from "../context/AuthContext";
import { signIn, resetPassword } from "../services/firebase/firebaseServices";
import { getAuth } from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const auth = getAuth();

const Login = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '764623030223-vmkip1k79jvca8sqnbhe2njrc26k5cq5.apps.googleusercontent.com'
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("ReportIncident");
    }
  }, [isAuthenticated, navigation]);

  async function onGoogleButtonPress() {

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const signInResult = await GoogleSignin.signIn();
  
    idToken = signInResult.data?.idToken;
    if (!idToken) {
      idToken = signInResult.idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }
  
    const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);

    return auth().signInWithCredential(googleCredential);
  }

  const handleLogin = async (email, password, phone, fullName) => {
    setLoading(true);
    try {
      // If you need to add the prefix for the server
      const fullPhoneNumber = phone ? `+961${phone}` : '';
      
      const userCredential = await signIn(email, password);
      await userCredential.user.reload();
      const updatedUser = auth.currentUser;

      if (!updatedUser.emailVerified) {
        Alert.alert("Error", "Email not verified. Please check your inbox.");
        return;
      }

      setIsAuthenticated(true);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert("Success", "Password reset email sent. Check your inbox.");
      setForgotPasswordVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SharedForm
        title="Login"
        buttonText="Login"
        onSubmit={handleLogin}
        isSignUp={false}
        imageSource={require("../assets/signup-image.png")}
        navigation={navigation}
        onForgotPassword={() => setForgotPasswordVisible(true)}
        handleGoogleLogin={onGoogleButtonPress}
      />


      <Modal visible={forgotPasswordVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleForgotPassword}>
              <Text style={styles.modalButtonText}>Send Reset Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setForgotPasswordVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  forgotPasswordText: {
    marginTop: 10,
    color: "#007BFF",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: "#D23C3C",
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#ddd",
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default Login;