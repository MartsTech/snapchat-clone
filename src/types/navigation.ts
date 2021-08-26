import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  PostsCreate: undefined;
  PostsPreview: undefined;
  PostsView: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>;
