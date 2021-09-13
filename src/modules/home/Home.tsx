import React from "react";
import { StyleSheet, View } from "react-native";
import PostsList from "../posts/list/PostsList";
import HomeButton from "./HomeButton";

const Home = () => {
  return (
    <View style={styles.container}>
      <PostsList />
      <HomeButton />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
