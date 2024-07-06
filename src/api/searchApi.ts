import axios from 'axios';

const searchApi = async (query: string) => {
  const response = await axios.get(`/api/search?query=${query}`);
  return response.data;
};

export default searchApi;
