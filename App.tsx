import { StatusBar } from "expo-status-bar";
import React from "react";
import AuthProvider from "./src/modules/auth/AuthProvider";
import Navigation from "./src/modules/navigation/Navigation";
import { store, StoreContext } from "./src/stores/store";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <AuthProvider>
        <Navigation />
        <StatusBar />
      </AuthProvider>
    </StoreContext.Provider>
  );
};

export default App;
