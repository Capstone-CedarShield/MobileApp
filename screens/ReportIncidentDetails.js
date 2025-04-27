import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Animated,
} from "react-native";
import io from 'socket.io-client';
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import DropdownField from "../components/shared/DropdownField";
import InputField from "../components/shared/InputField";
import CustomButton from "../components/shared/CustomButton";
import BottomNavBar from "../components/shared/BottomNavBar";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import api from "../services/api/axiosInstance";
import uuid from 'react-native-uuid';
import * as Location from 'expo-location';

const ReportIncidentDetails = ({ navigation }) => {
  const [incidentType, setIncidentType] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("");
  const [incidentDescription, setIncidentDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false); 
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const socket = io('http://10.0.2.2:3000');
  const { user } = useContext(AuthContext);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    try {

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;


      let address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address.length > 0) {
        const formattedAddress = `${address[0].name}, ${address[0].city}, ${address[0].region}, ${address[0].country}`;
        setLocation(formattedAddress);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setErrorMsg("Unable to fetch location. Please try again.");
    }
  };

  useEffect(() => {
    if (useCurrentLocation) {
      getCurrentLocation();
    } else {
      setLocation(""); 
    }
  }, [useCurrentLocation]);

  const handleImagePicker = async (source) => {
    let permissionResult;

    if (source === "camera") {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (permissionResult.status !== "granted") {
      alert("You need to grant permissions to use this feature.");
      return;
    }

    let result;
    if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert("Upload Image", "Choose an option", [
      { text: "Camera Roll", onPress: () => handleImagePicker("gallery") },
      { text: "Take a Photo", onPress: () => handleImagePicker("camera") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleDeleteImage = (index) => {
    Alert.alert("Delete Image", "Are you sure you want to remove this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setImages(images.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowSuccess(false);
    });
  };

  const handleSubmitReport = async () => {
    // Validate required fields
    if (!incidentType || !urgencyLevel || !location) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields: Incident Type, Urgency Level, and Location",
        [{ text: "OK" }]
      );
      return;
    }

    const uniqueId = uuid.v4();

    const reportData = {
      incidentType,
      urgencyLevel,
      location,
      incidentDescription,
      userEmail: user.email,
      uuid: uniqueId,
    };

    socket.emit('incidentReport', reportData);

    try {
      const formData = new FormData();
      formData.append("type", incidentType);
      formData.append("urgencyLevel", urgencyLevel);
      formData.append("location", location);
      formData.append("description", incidentDescription);
      formData.append("userEmail", user.email);
      formData.append("uuid", uniqueId);
      formData.append("isVerified", false); 

      images.forEach((imageUri, index) => {
        formData.append('files', {
          uri: imageUri,
          type: 'image/jpeg',
          name: `incident_image_${index}.jpg`,
        });
      });

      const response = await api.post("/api/incidents/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Alert.alert(
        "Success",
        "Your incident report has been submitted successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form fields after user acknowledges
              setIncidentType("");
              setUrgencyLevel("");
              setLocation("");
              setIncidentDescription("");
              setImages([]);
              setUseCurrentLocation(false);
            },
          },
        ]
      );


    } catch (error) {
      console.error("Error submitting report:", error);
      Alert.alert(
        "Error",
        "There was an error submitting your report. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {showSuccess && (
            <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
              <Text style={styles.successText}>Report submitted successfully!</Text>
            </Animated.View>
          )}
          <Text style={styles.title}>Report an Incident</Text>

          <DropdownField
            placeholder="Incident Type Selection"
            options={[
              "Theft",
              "Accident",
              "Fire",
              "Robbery",
              "Assault",
              "Sexual Assault",
              "Other",
            ]}
            selectedValue={incidentType}
            onValueChange={setIncidentType}
            style={styles.dropdown}
          />
          <DropdownField
            placeholder="Urgency Level"
            options={["Urgent", "Moderate", "Low"]}
            selectedValue={urgencyLevel}
            onValueChange={setUrgencyLevel}
            style={styles.dropdown}
          />

          <View style={styles.locationToggleContainer}>
            <Text style={styles.label}>Use Current Location</Text>
            <Switch
              value={useCurrentLocation}
              onValueChange={setUseCurrentLocation}
              trackColor={{ false: "#9A9A9A", true: "#D23C3C" }}
              thumbColor={useCurrentLocation ? "#D23C3C" : "#9A9A9A"}
            />
          </View>
          <InputField
            placeholder="Location"
            onChangeText={setLocation}
            value={location}
            style={styles.inputContainer}
            editable={!useCurrentLocation} 
          />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Upload Photos/Videos of incident</Text>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={showImagePickerOptions}
            >
              {images.length > 0 ? (
                <View style={styles.imagePreviewContainer}>
                  {images.map((img, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image
                        source={{ uri: img }}
                        style={styles.imagePreview}
                      />
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteImage(index)}
                      >
                        <MaterialIcons name="delete" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.uploadText}>Upload</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.fullWidthContainer}>
            <Text style={styles.label}>Incident Description</Text>
            <InputField
              placeholder="Write additional information..."
              value={incidentDescription}
              onChangeText={setIncidentDescription}
              style={styles.descriptionInput}
              inputStyle={styles.descriptionText}
              multiline={true}
            />
          </View>

          <CustomButton
            title="Send Report"
            onPress={handleSubmitReport}
            style={styles.button}
          />
        </View>
      </ScrollView>

      <BottomNavBar />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: "22%",
  },
  container: {
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: "5%",
  },
  dropdown: {
    marginBottom: 25,
  },
  inputContainer: {
    width: "85%",
    marginBottom: 25,
  },
  fullWidthContainer: {
    width: "85%",
    marginBottom: 10,
  },
  label: {
    fontSize: 19,
    marginBottom: 10,
    fontWeight: "500",
  },
  uploadBox: {
    height: 100,
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#9A9A9A",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 16,
    color: "#9A9A9A",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  imagePreview: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 2,
  },
  descriptionInput: {
    height: 140,
    textAlignVertical: "top",
    width: "100%",
  },
  descriptionText: {
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    marginBottom: 30,
  },
  locationToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
    marginBottom: 20,
  },
  successMessage: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  successText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ReportIncidentDetails;