import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

const PostsPreviewRight = () => {
  return (
    <View style={styles.rightContainer}>
      <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
        <Icon type="material" name="text-fields" color="white" size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
        <Icon type="material" name="create" color="white" size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
        <Icon type="material" name="note" color="white" size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
        <Icon type="material" name="music-note" color="white" size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
        <Icon type="material" name="attach-file" color="white" size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
        <Icon type="material" name="timer" color="white" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default PostsPreviewRight;

const styles = StyleSheet.create({
  rightContainer: {
    position: "absolute",
    right: 0,
    padding: 30,
  },
  icon: {
    marginBottom: 10,
  },
});
