import { Link } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const HomeButton = () => {
  return (
    <Link to="/PostsCreate" style={styles.container}>
      <Icon type="material" name="circle" size={40} />
    </Link>
  );
};

export default HomeButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    left: "44%",
    zIndex: 50,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "gray",
    borderRadius: 999,
  },
});
