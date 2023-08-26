import { useState, useEffect } from "react";
import { fetchPokemon } from "./api";
import { Pokemon } from "./types";
import { AxiosError } from "axios";

const useAllPokemonData = () => {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [allPokemonDataloading, setAllPokemonDataloading] = useState(false);
  const [allPokemonDataApiError, setAllPokemonDataApiError] =
    useState<AxiosError>();

  useEffect(() => {
    const fetchPokemonData = async () => {
      setAllPokemonDataloading(true);
      setAllPokemonDataApiError(undefined);
      try {
        const data = await fetchPokemon();
        const dataWithId = data.results.map((pokemon: any) => {
          const id = pokemon.url.split("/")[6];
          return { ...pokemon, id };
        });
        setAllPokemonData(dataWithId);

        setAllPokemonDataloading(false);
      } catch (error) {
        setAllPokemonDataApiError(error as AxiosError);
        setAllPokemonDataloading(false);
      }
    };

    fetchPokemonData();
  }, []);

  return { allPokemonData, allPokemonDataloading, allPokemonDataApiError };
};

export default useAllPokemonData;
