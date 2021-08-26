import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import TimeAgo from "react-native-timeago";
import { Post } from "../../../types/post";

interface PostsListItemProps {
  post: Post;
  handleSelect: (id: string) => void;
}

const PostsListItem: React.FC<PostsListItemProps> = ({ post, handleSelect }) => {
  const { id, read, timestamp, profilePic, username } = post;

  return (
    <ListItem bottomDivider onPress={() => !read && handleSelect(id)}>
      <Avatar rounded source={{ uri: profilePic }} />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{username}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Tap to view - {<TimeAgo time={timestamp} />}
        </ListItem.Subtitle>
      </ListItem.Content>
      {!read && <Icon type="material" name="stop" size={30} color="#ed3b55" />}
    </ListItem>
  );
};

export default PostsListItem;

const styles = StyleSheet.create({
  title: {
    fontWeight: "800",
  },
});
