import React from 'react';
import { render, fireEvent, waitForElement, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchShow as mockFetchShow } from '../api/fetchShow';
import App from '../App';
import Episodes from '../components/Episodes';
import data from './dataSample';
import { formatSeasons } from '../utils/formatSeasons';

jest.mock('../api/fetchShow');

test("Fetching initial data and app renders without crashing!", async () => {
    mockFetchShow.mockResolvedValueOnce({data})
    const {getByTestId} = render(<App />);
    expect(getByTestId(/fetching-loader/i)).toHaveTextContent("Fetching data...");
    await wait()
    expect(mockFetchShow).toHaveBeenCalledTimes(1);
    expect(getByTestId(/resolved-name/i)).toHaveTextContent(data.name);
});

test("Renders Episodes components without crashing", async () => {
    const { getAllByTestId } = render(<Episodes episodes={data._embedded.episodes} />)

    expect(getAllByTestId(/resolved-episode/i)).toHaveLength(2);
})