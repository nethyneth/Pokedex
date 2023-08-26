import axios from "axios";

const API_BASE_URL = `https://pokeapi.co/api/v2`;

export const fetchPokemon = async input => {
  const endpoint = input
    ? `${API_BASE_URL}/pokemon/${input}`
    : `${API_BASE_URL}/pokemon-species?limit=1500`;

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
