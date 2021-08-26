import { observer } from "mobx-react-lite";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useStore } from "../../../stores/store";
import PostsPreviewBottom from "./PostsPreviewBottom";
import PostsPreviewRight from "./PostsPreviewRight";

const PostsPreview = () => {
  const { picture } = useStore().cameraStore;

  return (
    <ImageBackground source={{ uri: picture && picture.uri }} style={styles.container}>
      <View style={styles.inner}>
        <PostsPreviewRight />
        <PostsPreviewBottom />
      </View>
    </ImageBackground>
  );
};

export default observer(PostsPreview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    transform: [{ scaleX: -1 }],
  },
  inner: {
    flex: 1,
    transform: [{ scaleX: -1 }],
    position: "relative",
  },
});
