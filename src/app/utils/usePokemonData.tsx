import { useState, useEffect } from "react";
import { fetchPokemon } from "./api";
import { Pokemon } from "./types";
import { AxiosError } from "axios";

const usePokemonData = (filter: string[]) => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [pokemonDataLoading, setPokemonDataLoading] = useState(false);
  const [pokemonDataApiError, setPokemonDataApiError] = useState<AxiosError>();

  const fetchPokemonData = async (filter: string[]) => {
    setPokemonDataLoading(true);
    setPokemonDataApiError(undefined);
    try {
      if (filter.length > 0) {
        const data = await Promise.all(
          filter.map(async pokemon => {
            try {
              const pokemonRecord = await fetchPokemon(pokemon);
              return pokemonRecord;
            } catch (error: any) {
              console.error(
                `Error fetching ${pokemon}: ${error.response.data}`
              );
              return null;
            }
          })
        );
        const filteredData = data.filter(
          pokemonRecord => pokemonRecord !== null
        );

        filteredData.sort((a, b) => a.id - b.id);

        setPokemonData(filteredData);
      } else {
        setPokemonData([]);
      }
      setPokemonDataLoading(false);
    } catch (error) {
      setPokemonDataApiError(error as AxiosError);
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
    refetchPokemonData: (filter: string[]) => {
      fetchPokemonData(filter);
    },
  };
};

export default usePokemonData;
