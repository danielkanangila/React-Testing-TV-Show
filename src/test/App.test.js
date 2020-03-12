import React from 'react';
import { render, fireEvent, waitForElement, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchShow as mockFetchShow } from '../api/fetchShow';
import App from '../App';
import data from './dataSample';

jest.mock('../api/fetchShow');

test("Fetching data and renders app without crashing!", async () => {
    mockFetchShow.mockResolvedValueOnce({data})
    const {getByTestId} = render(<App />);
    expect(getByTestId(/fetching-loader/i)).toHaveTextContent("Fetching data...");
    await wait()
    expect(mockFetchShow).toHaveBeenCalledTimes(1);
    expect(getByTestId(/resolved-name/i)).toHaveTextContent(data.name);
});