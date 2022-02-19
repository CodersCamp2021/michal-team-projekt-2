import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks';
import { useFetchPlaces } from './useFetchPlaces';
// eslint-disable-next-line
import requestModule from '../helpers/request';

jest.mock('../helpers/request', () => ({
  request: () =>
    Promise.resolve({
      features: [
        { place_name: 'Poznań, Greater Poland Voivodeship, Poland' },
        { place_name: 'Polany, Powiat Jasielski, Podkarpackie Voivodeship, Poland' },
        { place_name: 'Polana, Powiat Bieszczadzki, Podkarpackie Voivodeship, Poland' },
      ],
      error: '',
    }),
}));
const mockData = {
  features: [
    { place_name: 'Poznań, Greater Poland Voivodeship, Poland' },
    { place_name: 'Polany, Powiat Jasielski, Podkarpackie Voivodeship, Poland' },
    { place_name: 'Polana, Powiat Bieszczadzki, Podkarpackie Voivodeship, Poland' },
  ],
  error: '',
};
const mockSuggestions = mockData.features.map(({ place_name }) => place_name);

describe('useFetchPlaces', () => {
  it('should return initial data', () => {
    const { result } = renderHook(() => useFetchPlaces());
    const { suggestions, error } = result.current;
    expect(suggestions).toStrictEqual([]);
    expect(error).toStrictEqual('');
  });

  it('should return updated data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchPlaces('poznan'));
    await waitForNextUpdate();
    const { suggestions, error } = result.current;
    expect(suggestions).toStrictEqual(mockSuggestions);
    expect(error).toStrictEqual('');
  });

  it('should catch error', async () => {
    jest.spyOn(requestModule, 'request').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          error: 'error',
        }),
      ),
    );
    const { result, waitForNextUpdate } = renderHook(() => useFetchPlaces('xyz'));
    await waitForNextUpdate();
    const { suggestions, error } = result.current;
    expect(suggestions).toStrictEqual([]);
    expect(error).toStrictEqual('Cant fetch suggestions');
  });
});
