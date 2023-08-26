import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { fetchPokemon } from "./api";

const useAllPokemonData = () => {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [allPokemonDataloading, setAllPokemonDataloading] = useState(false);
  const [allPokemonDataApiError, setAllPokemonDataApiError] =
    useState<AxiosError>();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setAllPokemonDataloading(true);
        setAllPokemonDataApiError(undefined);

        const data = await fetchPokemon();
        const dataWithId = data.results.map((pokemon: any) => {
          const id = pokemon.url.split("/")[6];
          return { ...pokemon, id };
        });

        setAllPokemonData(dataWithId);
      } catch (error) {
        setAllPokemonDataApiError(error as AxiosError);
      } finally {
        setAllPokemonDataloading(false);
      }
    };

    fetchPokemonData();
  }, []);

  return { allPokemonData, allPokemonDataloading, allPokemonDataApiError };
};

export default useAllPokemonData;
