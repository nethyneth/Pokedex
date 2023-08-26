import Image from "next/image";
import "./favorite-button.css";
import { useEffect, useState } from "react";

interface FavoriteButtonProps {
  name: string;
  height?: number;
  width?: number;
  className?: string;
  favoritedPokemon: string[];
  onFavoriteClick: (name: string) => void;
}

const FavoriteButton = ({
  name,
  height,
  width,
  className,
  favoritedPokemon,
  onFavoriteClick,
}: FavoriteButtonProps) => {
  return (
    <div
      className={`favorite-button ${className ?? ""}`}
      onClick={() => onFavoriteClick(name)}
    >
      <Image
        src={
          favoritedPokemon.includes(name)
            ? "/images/heart-filled.svg"
            : "/images/heart-empty.svg"
        }
        width={width ?? 30}
        height={height ?? 30}
        alt={"favorite"}
      />
    </div>
  );
};

export default FavoriteButton;
