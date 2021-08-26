import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

const PostsListItem = () => {
  return (
    <ListItem bottomDivider>
      <Avatar rounded source={require("../../../../assets/images/avatar.png")} />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>Martin</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Tap to view - 10 minutes ago
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default PostsListItem;

const styles = StyleSheet.create({
  title: {
    fontWeight: "800",
  },
});
