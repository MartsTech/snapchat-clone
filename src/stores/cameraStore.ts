import { Camera } from "expo-camera";
import firebase from "firebase/app";
import { makeAutoObservable, runInAction } from "mobx";
import { Alert } from "react-native";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { db, storage } from "../config/firebase";
import { store } from "./store";

class CameraStore {
  camera: Camera | null = null;
  pictureUri?: string;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.camera = null;
    this.loading = false;
    this.pictureUri = undefined;
  };

  takePicture = async () => {
    if (!this.camera || this.loading) {
      return false;
    }

    this.loading = true;

    const picture = await this.camera.takePictureAsync({ quality: 0.7 });

    runInAction(() => {
      this.loading = false;
    });

    if (!picture) {
      return false;
    }

    this.pictureUri = picture.uri;

    return true;
  };

  sendPicture = async () => {
    const { user } = store.userStore;

    if (!this.pictureUri || this.loading || !user) {
      return false;
    }

    this.loading = true;

    const id = uuid();

    const response = await fetch(this.pictureUri);
    const blob = await response.blob();

    const uploadTask = storage.ref(`posts/${id}`).put(blob);

    uploadTask.on(
      "state_changed",
      null,
      (err) => {
        Alert.alert(err.message);
      },
      () => {
        void storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            void db.collection("posts").add({
              imageUrl: url,
              read: false,
              username: user.displayName,
              profilePic: user.photoURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
      }
    );

    runInAction(() => {
      this.loading = false;
    });

    return true;
  };

  setCamera = (camera: Camera) => {
    this.camera = camera;
  };
}

export default CameraStore;
