import axios from 'axios';

const BASE_URL = '/api/v1/';

export default axios.create({
  baseURL: BASE_URL,
});
