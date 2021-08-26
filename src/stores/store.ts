import { createContext, useContext } from "react";
import CameraStore from "./cameraStore";
import PostStore from "./postStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  cameraStore: CameraStore;
  postStore: PostStore;
}

export const store: Store = {
  userStore: new UserStore(),
  cameraStore: new CameraStore(),
  postStore: new PostStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};

export const resetStore = () => {
  const { userStore, cameraStore, postStore } = store;
  userStore.reset();
  cameraStore.reset();
  postStore.reset();
};
