import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface CameraState {
  cameraImg: string | null;
}

const initialState: CameraState = {
  cameraImg: null,
};

export const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    setCameraImg: (state, action: { payload: string }) => {
      state.cameraImg = action.payload;
    },
    resetCameraImg: (state) => {
      state.cameraImg = null;
    },
  },
});

export const { setCameraImg, resetCameraImg } = cameraSlice.actions;

export const selectCameraImg = (state: RootState) => state.camera.cameraImg;

export default cameraSlice.reducer;
