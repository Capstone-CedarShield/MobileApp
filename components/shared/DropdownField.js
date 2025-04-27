import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const DropdownField = ({
  placeholder,
  options,
  selectedValue,
  onValueChange,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter options by the search query
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.dropdown} onPress={() => setIsOpen(true)}>
        <Text
          style={selectedValue ? styles.textSelected : styles.textPlaceholder}
        >
          {selectedValue || placeholder}
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="#9A9A9A" />
      </TouchableOpacity>
      <Modal visible={isOpen} transparent={true} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              placeholderTextColor="#9A9A9A"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <ScrollView style={{ maxHeight: 200 }}>
              {filteredOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    onValueChange(option);
                    setIsOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}

              {/* If no matches found, display a "no results" message */}
              {filteredOptions.length === 0 && (
                <View style={styles.option}>
                  <Text style={styles.noResultsText}>No results found</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
  },
  dropdown: {
    height: 60,
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textPlaceholder: {
    fontSize: 18,
    color: "#9A9A9A",
  },
  textSelected: {
    fontSize: 18,
    color: "#000",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchBar: {
    height: 40,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 18,
    color: "#000",
  },
  noResultsText: {
    fontSize: 16,
    color: "#9A9A9A",
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default DropdownField;
