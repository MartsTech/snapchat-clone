import { createContext, useContext } from "react";
import CameraStore from "./cameraStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  cameraStore: CameraStore;
}

export const store: Store = {
  userStore: new UserStore(),
  cameraStore: new CameraStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};

export const resetStore = () => {
  const { userStore, cameraStore } = store;
  userStore.reset();
  cameraStore.reset();
};
