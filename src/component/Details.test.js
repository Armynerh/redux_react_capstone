import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Details from './Details';

const mockStore = configureStore([]);

describe('Details Component', () => {
  it('should render the details page with data', async () => {
    const initialState = {
      metrics: {
        metrics: [
          {
            total: 123,
            '18to59': 45,
            '60andAbove': 78,
          },
        ],
        status: 'succeeded',
        error: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/123']}>
          <Routes>
            <Route path="/details/:slug" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    // Use waitFor to wait for asynchronous actions to complete
    await screen.findByText('Total Number of people Vaccinated');
    await screen.findByText('Total Number of people Vaccinated between the ages of 18-59');
    await screen.findByText('Total Number of people Vaccinated between the ages of 60-60+');
    await screen.findByText('123');
    await screen.findByText('45');
    await screen.findByText('78');
  });

  it('should handle the case when there is no matching data', async () => {
    const initialState = {
      metrics: {
        metrics: [],
        status: 'idle',
        error: null,
      },
    };

    const store = mockStore(initialState);

    // Mock the dispatch function to handle async actions
    store.dispatch = jest.fn().mockResolvedValueOnce();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/456']}>
          <Routes>
            <Route path="/details/:slug" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    // Ensure that the component handles the case of no matching data by not rendering anything
    const noDataElement = screen.queryByText('Total Number of people Vaccinated');
    expect(noDataElement).toBeNull();
  });
});
