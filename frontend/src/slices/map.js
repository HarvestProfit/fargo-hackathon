import { createSlice } from '@reduxjs/toolkit';
import { defaultViewState } from '../utilities/mapping-helpers';

export const counterSlice = createSlice({
  name: 'map',
  initialState: {
    active: null,
    elevationScale: 1,
    extrude: false,
    shape: 'rectangle',
    view: 'counties',
    viewMode: 'view',
    viewPort: defaultViewState,
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setActiveGeography: (state, action) => {
      state.active = {
        ...state.active,
        geometry: action.payload,
      };
    },
    setElevationScale: (state, action) => {
      state.elevationScale = action.payload;
    },
    setExtrude: (state, action) => {
      state.extrude = action.payload;
    },
    setShape: (state, action) => {
      state.shape = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setViewPort: (state, action) => {
      state.viewPort = action.payload;
    }
  },
});

export const {
  setActive,
  setActiveGeography,
  setElevationScale,
  setExtrude,
  setShape,
  setView,
  setViewMode,
  setViewPort,
} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// Export the reducer by default
export default counterSlice.reducer;
