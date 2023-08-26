import { useState, useEffect } from "react";
import { fetchPokemon } from "./api";
import { Pokemon } from "./types";
import { AxiosError } from "axios";

const usePokemonData = (filter: string[]) => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [pokemonDataLoading, setPokemonDataLoading] = useState(false);
  const [pokemonDataApiError, setPokemonDataApiError] = useState<
    AxiosError | undefined
  >();

  const fetchPokemonData = async (filter: string[]) => {
    setPokemonDataLoading(true);
    setPokemonDataApiError(undefined);

    try {
      const dataPromises = filter.map(async pokemon => {
        try {
          return await fetchPokemon(pokemon);
        } catch (error: any) {
          console.error(`Error fetching ${pokemon}: ${error.response?.data}`);
          return null;
        }
      });

      const data = await Promise.all(dataPromises);
      const filteredData = data.filter(pokemonRecord => pokemonRecord !== null);

      filteredData.sort((a, b) => a.id - b.id);

      setPokemonData(filteredData);
    } catch (error) {
      setPokemonDataApiError(error as AxiosError);
    } finally {
      setPokemonDataLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData(filter);
  }, [filter]);

  return {
    pokemonData,
    pokemonDataLoading,
    pokemonDataApiError,
    refetchPokemonData: (newFilter: string[]) => {
      fetchPokemonData(newFilter);
    },
  };
};

export default usePokemonData;
