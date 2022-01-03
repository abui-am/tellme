import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

// Define a type for the slice state
interface AppState {
  tab: '' | 'gif';
}

// Define the initial state using that type
const initialState: AppState = {
  tab: '',
};

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<'' | 'gif'>) => {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTab = (state: RootState) => state.app.tab;

export default appSlice.reducer;
