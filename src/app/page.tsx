"use client";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ErrorHandler from "./components/ErrorHandler";
import InputField from "./components/InputField";
import PokemonDataModal from "./components/PokemonDataModal";
import PokemonList from "./components/PokemonList";
import Spinner from "./components/Spinner";
import useAllPokemonData from "./utils/useAllPokemonData";
import usePokemonData from "./utils/usePokemonData";
import ScrollToTopButton from "./components/ScrollToTopButton";

const Home = () => {
  const [filter, setFilter] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [favoritedPokemon, setFavoritedPokemon] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const [showPokemonDataModal, setShowPokemonDataModal] = useState(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const { allPokemonData, allPokemonDataloading, allPokemonDataApiError } =
    useAllPokemonData();

  const {
    pokemonData,
    refetchPokemonData,
    pokemonDataLoading,
    pokemonDataApiError,
  } = usePokemonData(filter);

  const loading = allPokemonDataloading || pokemonDataLoading || initialLoading;

  const fetchFavorites = () => {
    return new Promise(resolve => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavoritedPokemon(favorites);
      resolve(favorites);
    });
  };

  const clearFilters = () => {
    setFilter([]);
    refetchPokemonData([]);
  };

  const init = async () => {
    const favorites = await fetchFavorites();
    setFilter(favorites as string[]);
    setInitialLoading(false);
  };

  const handlePokemonSelected = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    setShowPokemonDataModal(true);
  };

  const handleErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  const handleFavoriteClick = (name: string) => {
    const updatedFavorites = favoritedPokemon.includes(name)
      ? favoritedPokemon.filter(pokemonId => pokemonId !== name)
      : [...favoritedPokemon, name];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoritedPokemon(updatedFavorites);
  };

  const handleShowFavorites = () => {
    setFilter(favoritedPokemon);
  };

  useEffect(() => {
    if (
      allPokemonDataApiError?.response?.data ||
      pokemonDataApiError?.response?.data
    ) {
      handleErrorMessage(
        allPokemonDataApiError?.message ||
          pokemonDataApiError?.message ||
          "An error occurred."
      );
    }
  }, [allPokemonDataApiError, pokemonDataApiError]);

  useEffect(() => {
    init();
  }, []);

  return (
    <main className="p-10">
      {errorMessage && (
        <ErrorHandler
          errorMessage={errorMessage}
          onClose={() => handleErrorMessage("")}
        />
      )}
      {showPokemonDataModal && (
        <PokemonDataModal
          onClose={() => setShowPokemonDataModal(false)}
          onFavoriteClick={name => {
            handleFavoriteClick(name);
          }}
          pokemon={selectedPokemon}
          favoritedPokemon={favoritedPokemon}
        />
      )}
      <div>
        <h1>Pokédex</h1>
        <p>Search for a Pokémon by name or id number</p>
        <InputField
          onSubmit={fuzzyList => {
            setFilter(fuzzyList);
          }}
          onError={errorMessage => {
            handleErrorMessage(errorMessage);
          }}
          allPokemonData={allPokemonData}
        />
        <button
          className="bg-amber-400 hover:bg-amber-600 font-bold py-2 px-4 rounded-md"
          onClick={handleShowFavorites}
        >
          Show Favorites
        </button>
        {filter.length > 0 && (
          <button
            className="bg-amber-400 hover:bg-amber-600 font-bold py-2 px-4 ml-2 rounded-md"
            onClick={clearFilters}
          >
            Clear List
          </button>
        )}
      </div>
      <div className="mt-4">
        {loading && <Spinner />}
        <PokemonList
          data={pokemonData}
          favoritedPokemon={favoritedPokemon}
          onClick={pokemonName => {
            handlePokemonSelected(pokemonName);
          }}
          onFavoriteClick={name => {
            handleFavoriteClick(name);
          }}
        />
      </div>
      <ScrollToTopButton />
    </main>
  );
};

export default Home;
