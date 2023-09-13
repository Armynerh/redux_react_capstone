import { configureStore } from '@reduxjs/toolkit';
import metricsReducer from './metrics/metricsSlice';

const store = configureStore({
  reducer: {
    metrics: metricsReducer,
  },
});
export default store;
