import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

// Define a type for the slice state
interface AppState {
  tab: '' | 'gif' | 'emoji';
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
    setTab: (state, action: PayloadAction<'' | 'gif' | 'emoji'>) => {
      state.tab = action.payload;
    },
    closeTabWithException: (state) => {
      const exception = ['emoji'];
      if (!exception.includes(state.tab)) state.tab = '';
    },
  },
});

export const { setTab, closeTabWithException } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTab = (state: RootState) => state.app.tab;

export default appSlice.reducer;
