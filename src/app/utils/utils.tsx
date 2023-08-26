import Fuse from "fuse.js";
import { PokemonFullListResult } from "./types";

export const fuzzySearch = (data: PokemonFullListResult[], query: string) => {
  const options = {
    keys: ["name", "id"],
    includeScore: true,
    threshold: 0.2,
  };

  const fuse = new Fuse(data, options);
  const results = fuse.search(query);
  return results.map(result => result.item);
};

export const padNumberToFourDigits = (number: number) => {
  const numberString = number.toString().padStart(4, "0");
  return numberString;
};
