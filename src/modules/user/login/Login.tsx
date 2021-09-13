import React from "react";
import { StyleSheet } from "react-native";
import { Button, Image } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import useSignInGoogle from "../../../hooks/useSignInGoogle";

const Login = () => {
  const [signInGoogle, loading] = useSignInGoogle();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/meta/icon.png")}
      />
      <Button
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
        raised
        title="Sign In"
        type="outline"
        disabled={loading}
        onPress={signInGoogle}
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#FFFC00",
  },
  image: {
    height: 300,
    width: 300,
  },
  buttonContainer: {
    width: 300,
  },
  buttonTitle: {
    color: "black",
  },
});
