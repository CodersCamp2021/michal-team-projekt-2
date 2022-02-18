import '@testing-library/jest-dom';
import { request } from './request';

const mockResponse = {
  data: {},
};

describe('request', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return data', async () => {
    const data = await request('test.url');
    expect(data).toEqual(mockResponse);
  });

  it('should catch fetch error', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    });
    await expect(request('')).rejects.toThrow('Fetch error');
  });
});
