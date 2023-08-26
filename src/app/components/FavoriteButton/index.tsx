import React from "react";
import Image from "next/image";
import "./favorite-button.css";

interface FavoriteButtonProps {
  name: string;
  height?: number;
  width?: number;
  className?: string;
  favoritedPokemon: string[];
  onFavoriteClick: (name: string) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  name,
  height = 30,
  width = 30,
  className = "",
  favoritedPokemon,
  onFavoriteClick,
}: FavoriteButtonProps) => {
  const isFavorited = favoritedPokemon.includes(name);
  const heartIconSrc = isFavorited
    ? "/images/heart-filled.svg"
    : "/images/heart-empty.svg";

  const handleClick = () => {
    onFavoriteClick(name);
  };

  return (
    <div className={`favorite-button ${className}`} onClick={handleClick}>
      <Image src={heartIconSrc} width={width} height={height} alt="favorite" />
    </div>
  );
};

export default FavoriteButton;
