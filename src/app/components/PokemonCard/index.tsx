import { Pokemon } from "@/app/utils/types";
import Image from "next/image";
import { padNumberToFourDigits } from "../../utils/utils";
import FavoriteButton from "../FavoriteButton";

interface PokemonCardProps {
  data: Pokemon;
  favoritedPokemon: string[];
  onClick: (pokemonName: string) => void;
  onFavoriteClick: (name: string) => void;
}

const PokemonCard = ({
  data,
  favoritedPokemon,
  onClick,
  onFavoriteClick,
}: PokemonCardProps) => {
  return (
    <div key={data.id} className="relative bg-white rounded-md">
      <FavoriteButton
        name={data.name}
        favoritedPokemon={favoritedPokemon}
        onFavoriteClick={name => {
          onFavoriteClick(name);
        }}
      />
      <div
        className="flex flex-col items-center py-3"
        onClick={() => {
          onClick(data.name);
        }}
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
