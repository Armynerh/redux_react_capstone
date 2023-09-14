import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://myvaccination-backend.vercel.app/api/pop';
const initialState = {
  metrics: [],
  status: 'idle',
  error: null,
};
export const fetchMetrics = createAsyncThunk('metrics/fetchMetrics', async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
});
const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetrics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.metrics = action.payload.modifiedData;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default metricsSlice.reducer;
