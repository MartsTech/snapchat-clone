import { AuthSessionResult } from "expo-auth-session";
import firebase from "firebase/app";
import { makeAutoObservable, runInAction } from "mobx";
import { auth } from "../config/firebase";
import { User } from "../types/user";
import { resetStore } from "./store";

class UserStore {
  user: User | null = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.user = null;
  };

  signInGoogle = async (response: AuthSessionResult) => {
    this.loading = true;

    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      await auth.signInWithCredential(credential);
    }

    runInAction(() => {
      this.loading = false;
    });
  };

  signOut = async () => {
    await auth.signOut();
    resetStore();
  };

  setUser = (user: firebase.User | null) => {
    if (user) {
      this.user = {
        email: user.email!,
        displayName: user.displayName!,
        photoURL: user.photoURL!,
      };
    } else {
      this.user = null;
    }

    this.loading = false;
  };
}

export default UserStore;
