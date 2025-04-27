import React, { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Or use react-native-vector-icons if not using Expo

const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,
  isPassword,
  isPhone,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.inputContainer, style]}>
      {isPhone && (
        <View style={styles.phonePrefix}>
          <Image 
            source={require('../../assets/ReactNativeImages/lebanon-flag.png')}
            style={styles.flagIcon} 
          />
          <Text style={styles.prefixText}>+961</Text>
        </View>
      )}
      <TextInput
        style={[styles.input, isPhone && styles.phoneInput]}
        placeholder={placeholder}
        placeholderTextColor="#9A9A9A"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword ? !showPassword : false}
      />
      {isPassword && (
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons 
            name={showPassword ? "eye-outline" : "eye-off-outline"} 
            size={24} 
            color="#9A9A9A" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "85%",
    height: 60,
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#9A9A9A",
    paddingLeft: 10,
  },
  phoneInput: {
    paddingLeft: 5,
  },
  eyeIcon: {
    padding: 10,
  },
  phonePrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#9A9A9A',
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 5,
  },
  prefixText: {
    fontSize: 16,
    color: '#9A9A9A',
  }
});

export default InputField;