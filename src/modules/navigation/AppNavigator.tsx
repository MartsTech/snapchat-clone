import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import PostsCreateScreen from "../../screens/PostsCreateScreen";
import { AppStackParamList } from "../../types/navigation";
import PostsPreview from "../posts/preview/PostsPreview";

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#FFFC00" },
        headerTitleStyle: { color: "black" },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="PostsCreate"
        component={PostsCreateScreen}
        options={{
          headerBackTitle: "Back to Posts",
          title: "",
        }}
      />
      <Stack.Screen
        name="PostsPreview"
        component={PostsPreview}
        options={{
          headerBackTitle: "",
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
