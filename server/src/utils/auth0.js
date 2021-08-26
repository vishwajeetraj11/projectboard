import axios from 'axios';
import { config } from '../config/index.js';

export const getUserDetails = (token) =>
  axios({
    url: `https://${config.domain}/userinfo`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
