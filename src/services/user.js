import { axiosClient } from '../helpers/axiosClient';

async function updateMe(userData) {
  try {
    const { data } = await axiosClient.patch('/user/me', userData);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.data}`);
    }
  }
}

async function getMe(userData) {
  try {
    const { data } = await axiosClient.get('/user/me', userData);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.data}`);
    }
  }
}

async function updatePhoto(photoData) {
  try {
    const { data } = await axiosClient.patch('/user/photo', photoData);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.data}`);
    }
  }
}

export const userService = { updatePhoto, updateMe, getMe };
