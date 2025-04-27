import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import CustomButton from "../components/shared/CustomButton";
import profileIcon from "../assets/icons/profile2-icon.png";
import emailIcon from "../assets/icons/envelope2-icon.png";
import phoneIcon from "../assets/icons/phone2-icon.png";
import notifyIcon from "../assets/icons/notify-icon.png";
import keyIcon from "../assets/icons/key-icon.png";
import BottomNavbar from "../components/shared/BottomNavBar";
import { AuthContext } from "../context/AuthContext";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { logout, resetPassword } from "../services/firebase/firebaseServices";
import api from "../services/api/axiosInstance";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext) || {};
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigation = useNavigation();

  const auth = getAuth();

  // Safely get user properties with fallbacks
  const fullNameDefault = user?.displayName || "User Name";
  const emailDefault = user?.email || "user@example.com";
  const phoneDefault = user?.phoneNumber || "+00000000000";

  const [fullName, setFullName] = useState(fullNameDefault);
  const [emailValue, setEmailValue] = useState(emailDefault);
  const [phoneValue, setPhoneValue] = useState(phoneDefault);

  // Fetch user details when user changes
  useEffect(() => {
    if (user?.email) {
      fetchUserDetails(user.email);
    }
  }, [user]);

  // Fetch user details from the backend
  const fetchUserDetails = async (userEmail) => {
    try {
      const response = await api.get('/api/auth/userDetails', {
        params: {
          email: userEmail,
        },
      });
      if (response.data) {
        setUserDetails(response.data);
        setFullName(response.data.fullName || fullNameDefault);
        setEmailValue(response.data.email || emailDefault);
        setPhoneValue(response.data.phone || phoneDefault);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      Alert.alert("Error", "Failed to fetch user details.");
    }
  };

  const handleResetPassword = async (email) => {
    try {
      await resetPassword(email);
      Alert.alert("Success", "Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error resetting password:", error);
      Alert.alert("Error", "Failed to send password reset email.");
    }
  };

  // Compute initials safely
  const initials = fullName
    ? fullName
        .split(" ")
        .map((word) => word[0]?.toUpperCase() || "")
        .join("")
    : "U";

  // Handle saving updated user details
  const handleSave = async () => {
    if (!user?.email) {
      Alert.alert("Error", "No user email found.");
      return;
    }

    try {
      const response = await api.put('/api/auth/updateUserDetails', {
        email: user.email,
        fullName,
        phone: phoneValue,
      });

      if (response.data) {
        Alert.alert("Success", "User details updated successfully.");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      Alert.alert("Error", "Failed to update user details.");
    }
  };


  const handleLogout = () => {
    logout();
    navigation.navigate("GetStarted");
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.profileHeader}>
          <View style={styles.profileCircle}>
            <Text style={styles.initials}>{initials}</Text>
          </View>
          <Text style={styles.userName}>{fullName}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Info</Text>
            <TouchableOpacity onPress={() => (isEditing ? handleSave() : setIsEditing(true))}>
              <View
                style={[
                  styles.editButtonContainer,
                  isEditing && styles.saveButtonContainer,
                ]}
              >
                <Text
                  style={[styles.editButton, isEditing && styles.saveButton]}
                >
                  {isEditing ? "Save" : "Edit"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Image source={profileIcon} style={styles.iconPerfect} />
            {isEditing ? (
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                style={styles.infoInput}
              />
            ) : (
              <Text style={styles.infoText}>{fullName}</Text>
            )}
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Image source={emailIcon} style={styles.iconPerfect} />
            <Text style={styles.infoText}>{emailValue}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Image source={phoneIcon} style={styles.iconPerfect} />
            {isEditing ? (
              <TextInput
                value={phoneValue}
                onChangeText={setPhoneValue}
                style={styles.infoInput}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoText}>{phoneValue}</Text>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.infoRow}>
            <Image source={notifyIcon} style={styles.iconPerfect} />
            <Text style={styles.infoText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ true: "#D23C3C", false: "#ccc" }}
              thumbColor={notificationsEnabled ? "#D23C3C" : "#f4f3f4"}
            />  

          </View>
          <View style={styles.divider} />
          <TouchableOpacity 
            style={styles.infoRow} 
            onPress={() => handleResetPassword(emailValue)}
          >
            <Image source={keyIcon} style={styles.iconPerfect} />
            <Text style={styles.infoText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Sign out"
          onPress={handleLogout}
          style={styles.signOutButton}
          textStyle={styles.signOutButtonText}
        />
      </ScrollView>

      <BottomNavbar style={styles.navbarContainer} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: "32%",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileCircle: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D23C3C",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 17,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  editButtonContainer: {
    backgroundColor: "#FFF2F2",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  saveButtonContainer: {
    backgroundColor: "#EAFFEB",
  },
  editButton: {
    color: "#D23C3C",
  },
  saveButton: {
    color: "#27AE60",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingLeft: 15,
  },
  iconPerfect: {
    width: 24,
    height: 24,
    marginRight: 20,
    resizeMode: "contain",
  },
  infoText: {
    fontSize: 16,
    flex: 1,
  },
  infoInput: {
    fontSize: 16,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 5,
  },
  signOutButton: {
    width: "100%",
    marginTop: 20,
    borderColor: "#D23C3C",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  signOutButtonText: {
    color: "#D23C3C",
  },
  navbarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});