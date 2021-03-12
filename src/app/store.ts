import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cameraReducer from "../features/cameraSlice";
import chatReducer from "../features/chatSlice";

const cameraPersistConfig = {
  key: "camera",
  storage,
};

const cameraPersistedReducer = persistReducer(
  cameraPersistConfig,
  cameraReducer
);

export const store = configureStore({
  reducer: {
    camera: cameraPersistedReducer,
    chat: chatReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
