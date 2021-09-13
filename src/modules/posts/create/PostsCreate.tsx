import React from "react";
import { StyleSheet, View } from "react-native";
import PostsCreateButton from "./PostsCreateButton";
import PostsCreateCamera from "./PostsCreateCamera";

const PostsCreate = () => {
  return (
    <View style={styles.container}>
      <PostsCreateCamera />
      <PostsCreateButton />
    </View>
  );
};

export default PostsCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "black",
  },
});
