import axios from "axios";

const API_BASE_URL = `https://pokeapi.co/api/v2`;

export const fetchPokemon = async input => {
  try {
    let response;
    if (input) {
      response = await axios.get(`${API_BASE_URL}/pokemon/${input}`);
    } else {
      response = await axios.get(`${API_BASE_URL}/pokemon-species?limit=1500`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
