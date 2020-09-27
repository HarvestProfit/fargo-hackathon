import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../slices/map';

export default configureStore({
  reducer: {
    map: mapReducer,
  },
});
