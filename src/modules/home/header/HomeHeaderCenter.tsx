import React from "react";
import { Platform, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";

const HomeHeaderCenter = () => {
  return (
    // @ts-ignore
    <SearchBar
      placeholder="Friends"
      containerStyle={styles.search}
      inputStyle={styles.input}
      autoCapitalize={"none"}
      platform={Platform.OS === "ios" ? "ios" : "android"}
    />
  );
};

export default HomeHeaderCenter;

const styles = StyleSheet.create({
  search: {
    flex: 1,
    maxHeight: "60%",
    maxWidth: 240,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 9999,
  },
  input: {
    flex: 1,
  },
});
