import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

const FilterTabs = ({ filters, selectedFilter, onSelectFilter }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            selectedFilter === filter
              ? styles.selectedTab
              : styles.unselectedTab,
          ]}
          onPress={() => onSelectFilter(filter)}
        >
          <Text
            style={[
              styles.tabText,
              selectedFilter === filter
                ? styles.selectedText
                : styles.unselectedText,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    marginRight: 10,
  },
  selectedTab: {
    backgroundColor: "#FFD9D9",
  },
  unselectedTab: {
    backgroundColor: "#EAEAEA",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "350",
  },
  selectedText: {
    color: "#9A9A9A",
  },
  unselectedText: {
    color: "#9A9A9A",
  },
});

export default FilterTabs;
