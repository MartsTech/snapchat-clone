import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface ChatState {
  image: string | null;
}

const initialState: ChatState = {
  image: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectImage: (state, action: { payload: string }) => {
      state.image = action.payload;
    },
    resetImage: (state) => {
      state.image = null;
    },
  },
});

export const { selectImage, resetImage } = chatSlice.actions;

export const selectSelectedImage = (state: RootState) => state.chat.image;

export default chatSlice.reducer;
