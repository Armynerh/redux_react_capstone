import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://www.arbeitnow.com/api/job-board-api';
const initialState = {
  jobs: [],
  status: 'idle',
  error: null,
};
export const fetchJobs = createAsyncThunk('Jobs/fetchJobs', async () => {
  const response = await axios.get(`${API_URL}`);
  console.log(response.data);
  return response.data;
});
const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log({ action });
        state.jobs = action.payload.data;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default jobsSlice.reducer;
