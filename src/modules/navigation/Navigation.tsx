import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import Loading from "../../components/loading/Loading";
import { useStore } from "../../stores/store";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

const Navigation = () => {
  const { user, loading } = useStore().userStore;

  if (!user && loading) {
    return <Loading />;
  }

  return <NavigationContainer>{!user ? <AuthNavigator /> : <AppNavigator />}</NavigationContainer>;
};

export default observer(Navigation);
