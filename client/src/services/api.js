
import axios from 'axios';

const API_URL = ''; // Replace with your API's base URL

const API = async (urlObject, data , type) => {
  const { endpoint, method } = urlObject;
  const url = `${API_URL}/${endpoint}/${type}`;

  return axios({
    method,
    url,
    data,
  })
    .then((response) => response)
    .catch((error) => {
      throw error; // Implement error handling here
    });
};


export default API;