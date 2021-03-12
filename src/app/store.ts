import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import cameraReducer from "../features/cameraSlice";

export const store = configureStore({
  reducer: {
    camera: cameraReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
