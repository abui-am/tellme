import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

// Define a type for the slice state
interface PostMessageState {
  message: string;
  imgUrl: string;
  imgType: 'gif' | '';
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: PostMessageState = {
  message: '',
  imgUrl: '',
  imgType: '',
  isOpen: false,
};

export const postMessageSlice = createSlice({
  name: 'postMessage',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setImgUrl: (state, action: PayloadAction<string>) => {
      state.imgUrl = action.payload;
    },
    setImgType: (state, action: PayloadAction<'gif'>) => {
      state.imgType = action.payload;
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setMessage, setImgUrl, setImgType } = postMessageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPostMessage = (state: RootState) => state.postMessage.message;
export const selectImgUrl = (state: RootState) => state.postMessage.imgUrl;
export const selectImgType = (state: RootState) => state.postMessage.imgType;

export default postMessageSlice.reducer;
