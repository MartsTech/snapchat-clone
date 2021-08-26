import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const HomeHeaderRight = () => {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <Icon type="material" name="chat" color="black" size={24} />
    </TouchableOpacity>
  );
};

export default HomeHeaderRight;
