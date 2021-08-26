import { Camera, CameraCapturedPicture } from "expo-camera";
import firebase from "firebase/app";
import { makeAutoObservable, runInAction } from "mobx";
import { Alert } from "react-native";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { db, storage } from "../config/firebase";
import { store } from "./store";

class CameraStore {
  camera: Camera | null = null;
  picture?: CameraCapturedPicture;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.camera = null;
    this.loading = false;
    this.picture = undefined;
  };

  takePicture = async () => {
    if (!this.camera || this.loading) {
      return false;
    }

    this.loading = true;

    const picture = await this.camera.takePictureAsync({ quality: 1, base64: true });

    runInAction(() => {
      this.loading = false;
    });

    if (!picture) {
      return false;
    }

    this.picture = picture;

    return true;
  };

  sendPicture = async () => {
    const { user } = store.userStore;

    if (!this.picture?.base64 || this.loading || !user) {
      return false;
    }

    this.loading = true;

    const id = uuid();

    const response = await fetch(this.picture.uri);
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
      },
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
