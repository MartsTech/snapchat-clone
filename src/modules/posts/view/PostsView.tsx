import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useStore } from "../../../stores/store";

const PostsView = () => {
  const { selectedPost } = useStore().postStore;
  const navigation = useNavigation();

  if (!selectedPost) {
    navigation.goBack();
    return null;
  }

  const { imageUrl } = selectedPost;

  return (
    <ImageBackground source={{ uri: imageUrl }} style={styles.container}>
      <View style={styles.count}>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
          onComplete={() => navigation.goBack()}
        >
          {({ remainingTime, animatedColor }) => (
            <Animated.Text style={{ color: animatedColor, fontSize: 25 }}>
              {remainingTime}
            </Animated.Text>
          )}
        </CountdownCircleTimer>
      </View>
    </ImageBackground>
  );
};

export default observer(PostsView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  count: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 60,
    margin: 20,
  },
});
