import metricsReducer, { fetchMetrics } from './metricsSlice';

describe('metricsSlice Reducer', () => {
  it('should handle fetchMetrics fulfilled action', () => {
    const initialState = {
      metrics: [],
      status: 'idle',
      error: null,
    };

    const mockResponseData = { modifiedData: [{ metric: 'example' }] };

    const newState = metricsReducer(
      initialState,
      fetchMetrics.fulfilled(mockResponseData),
    );

    expect(newState.status).toEqual('succeeded');
    expect(newState.error).toBeNull();
    expect(newState.metrics).toEqual(mockResponseData.modifiedData);
  });

  it('should handle fetchMetrics pending action', () => {
    const initialState = {
      metrics: [],
      status: 'idle',
      error: null,
    };

    const newState = metricsReducer(
      initialState,
      fetchMetrics.pending,
    );

    expect(newState.status).toEqual('loading');
    expect(newState.error).toBeNull();
  });

  it('should handle fetchMetrics rejected action', () => {
    const initialState = {
      metrics: [],
      status: 'idle',
      error: null,
    };

    const errorMessage = 'An error occurred';

    const newState = metricsReducer(
      initialState,
      fetchMetrics.rejected(errorMessage),
    );

    expect(newState.status).toEqual('failed');
    expect(newState.error).toEqual(errorMessage);
  });
});
