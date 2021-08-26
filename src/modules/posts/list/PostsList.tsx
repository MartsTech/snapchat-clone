import React from "react";
import { FlatList, StyleSheet } from "react-native";
import PostsListItem from "./PostsListItem";

const PostsList = () => {
  return (
    <FlatList
      style={styles.container}
      data={new Array(20).fill(20)}
      keyExtractor={(_item, index) => index.toLocaleString()}
      renderItem={() => <PostsListItem />}
    />
  );
};

export default PostsList;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
