import { Pokemon } from "@/app/utils/types";
import Image from "next/image";
import { padNumberToFourDigits } from "../../utils/utils";
import PokemonCard from "../PokemonCard";
import { useEffect, useState } from "react";

interface PokemonListProps {
  data: Pokemon[];
  favoritedPokemon: string[];
  onFavoriteClick: (name: string) => void;
  onClick: (pokemonName: string) => void;
}

const PokemonList = ({
  data,
  favoritedPokemon,
  onClick,
  onFavoriteClick,
}: PokemonListProps) => {
  const [displayCount, setDisplayCount] = useState(10);

  const handlePokemonSelected = (pokemonName: string) => {
    onClick(pokemonName);
  };

  useEffect(() => {
    setDisplayCount(10);
  }, [data]);

  const handleLoadMoreClick = () => {
    setDisplayCount(displayCount + 10);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {data.slice(0, displayCount).map(pokemon => (
          <PokemonCard
            data={pokemon}
            favoritedPokemon={favoritedPokemon}
            key={pokemon.id}
            onClick={name => {
              handlePokemonSelected(name);
            }}
            onFavoriteClick={name => {
              onFavoriteClick(name);
            }}
          />
        ))}
        {data.length > displayCount && (
          <div className="flex justify-center items-center">
            <button
              className="bg-amber-400 hover:bg-amber-600 font-bold py-2 px-4 ml-2 rounded-md"
              onClick={handleLoadMoreClick}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
