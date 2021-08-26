import { observer } from "mobx-react-lite";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { useStore } from "../../../stores/store";

const HomeHeaderLeft = () => {
  const { user, signOut } = useStore().userStore;

  return (
    <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
      <Avatar
        rounded
        source={
          user?.photoURL ? { uri: user.photoURL } : require("../../../../assets/images/avatar.png")
        }
      />
    </TouchableOpacity>
  );
};

export default observer(HomeHeaderLeft);
