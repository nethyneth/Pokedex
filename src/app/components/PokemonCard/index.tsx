import React from "react";
import Image from "next/image";
import { padNumberToFourDigits } from "../../utils/utils";
import FavoriteButton from "../FavoriteButton";
import { Pokemon } from "@/app/utils/types";

interface PokemonCardProps {
  data: Pokemon;
  favoritedPokemon: string[];
  onClick: (pokemonName: string) => void;
  onFavoriteClick: (name: string) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  data,
  favoritedPokemon,
  onClick,
  onFavoriteClick,
}: PokemonCardProps) => {
  const handleFavoriteClick = () => {
    onFavoriteClick(data.name);
  };

  const handleCardClick = () => {
    onClick(data.name);
  };

  return (
    <div key={data.id} className="relative bg-white rounded-md">
      <FavoriteButton
        name={data.name}
        favoritedPokemon={favoritedPokemon}
        onFavoriteClick={handleFavoriteClick}
        className="p-5 sm:p-2"
      />
      <div
        className="flex flex-col items-center py-3"
        onClick={handleCardClick}
      >
        <Image
          src={data.sprites.other["official-artwork"].front_default}
          width={300}
          height={300}
          alt={data.name}
        />
        <p className="font-bold capitalize">{data.name}</p>
        <p>{padNumberToFourDigits(data.id)}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
