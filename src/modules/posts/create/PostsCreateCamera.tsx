import { Camera } from "expo-camera";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useCameraHeight from "../../../hooks/useCameraHeight";
import useCameraPermission from "../../../hooks/useCameraPermission";
import { useStore } from "../../../stores/store";
import { useIsFocused } from "@react-navigation/native";

const PostsCreateCamera = () => {
  const { setCamera } = useStore().cameraStore;
  const [permission] = useCameraPermission();
  const [height] = useCameraHeight();
  const [type, setType] = useState(Camera.Constants.Type.front);
  const isFocused = useIsFocused();

  return (
    <>
      {permission && isFocused && (
        <Camera
          type={type}
          ratio="16:9"
          ref={(camera) => camera && setCamera(camera)}
          style={{
            height,
            width: "100%",
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                );
              }}
            >
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </>
  );
};

export default PostsCreateCamera;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
