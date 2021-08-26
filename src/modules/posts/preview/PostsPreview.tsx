import { observer } from "mobx-react-lite";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { useStore } from "../../../stores/store";
import PostsPreviewBottom from "./PostsPreviewBottom";
import PostsPreviewRight from "./PostsPreviewRight";

const PostsPreview = () => {
  const { pictureUri } = useStore().cameraStore;

  return (
    <ImageBackground source={{ uri: pictureUri }} style={styles.container}>
      <PostsPreviewRight />
      <PostsPreviewBottom />
    </ImageBackground>
  );
};

export default observer(PostsPreview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
