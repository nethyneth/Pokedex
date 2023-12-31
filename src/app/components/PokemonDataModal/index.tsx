import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./modal.css";
import FavoriteButton from "../FavoriteButton";
import DetailItem from "../DetailItem";
import { fetchPokemon } from "@/app/utils/api";
import { Pokemon } from "@/app/utils/types";
import { padNumberToFourDigits } from "@/app/utils/utils";

interface ModalProps {
  pokemon: string;
  favoritedPokemon: string[];
  onClose: () => void;
  onFavoriteClick: (name: string) => void;
}

const PokemonDataModal: React.FC<ModalProps> = ({
  pokemon,
  favoritedPokemon,
  onClose,
  onFavoriteClick,
}: ModalProps) => {
  const [pokemonData, setPokemonData] = useState<Pokemon>({} as Pokemon);
  const [loading, setLoading] = useState<boolean>(true);

  const handleCloseClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const fetchPokemonData = async () => {
    try {
      const data = await fetchPokemon(pokemon);
      setPokemonData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderData = () => {
    if (!pokemonData) return null;

    const basicInfo = [
      { label: "Height", value: pokemonData.height },
      { label: "Weight", value: pokemonData.weight },
    ];

    const stats =
      pokemonData.stats?.map(stat => ({
        label: stat.stat.name,
        value: stat.base_stat,
      })) || [];

    const combinedData = [...basicInfo, ...stats].map((item, index) => (
      <DetailItem item={item} index={index} key={index} />
    ));

    return <div>{combinedData}</div>;
  };

  useEffect(() => {
    if (pokemon) {
      fetchPokemonData();
    }
  }, [pokemon]);

  if (loading) {
    return null; // Return null while loading to prevent rendering the modal prematurely.
  }

  return (
    <div className="modal-overlay" onClick={handleCloseClick}>
      <div
        className="relative grid sm:grid-cols-12 bg-white rounded-md xl:max-w-6xl	lg:max-w-4xl md:max-w-2xl sm:max-w-xl w-full h-full sm:h-auto justify-center"
        onClick={handleModalClick}
      >
        <div className="modal-close bg-amber-400 hover:bg-amber-600 flex justify-center items-center rounded-full z-10">
          <Image
            src="/images/xmark-solid.svg"
            alt="search"
            width={25}
            height={25}
            onClick={handleCloseClick}
          />
          <div className="sm:hidden">
            <FavoriteButton
              name={pokemonData?.name || ""}
              favoritedPokemon={favoritedPokemon}
              onFavoriteClick={onFavoriteClick}
              className="mt-14"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="modal-body sm:col-span-4 sm:w-full">
          <div className="flex h-full items-center relative">
            <div className="hidden sm:block">
              <FavoriteButton
                name={pokemonData?.name || ""}
                favoritedPokemon={favoritedPokemon}
                onFavoriteClick={onFavoriteClick}
                className="sm:mr-5 p-0"
                width={50}
                height={50}
              />
            </div>

            <div className="flex flex-col items-center py-3">
              <Image
                src={
                  pokemonData?.sprites?.other["official-artwork"].front_default
                }
                width={500}
                height={500}
                alt={pokemonData?.name || ""}
              />
              <p className="text-xl font-bold capitalize mb-2">
                {pokemonData?.name || ""}
              </p>
              <p className="text-xl font-bold text-slate-400">
                {padNumberToFourDigits(pokemonData?.id || 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="sm:col-span-8 p-10 bg-slate-200 rounded-md">
          <h1>Stats</h1>
          {renderData()}
        </div>
      </div>
    </div>
  );
};

export default PokemonDataModal;
