import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fuzzySearch } from "@/app/utils/utils";

interface InputFieldProps {
  onSubmit: (input: string[]) => void;
  onError: (errorMessage: string) => void;
  allPokemonData: never[];
}

const InputField = ({ onSubmit, onError, allPokemonData }: InputFieldProps) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput) {
      const fuzzyRes = fuzzySearch(allPokemonData, userInput);
      const fuzzyList = fuzzyRes.map(item => item.name);
      if (fuzzyList.length === 0) {
        onError("Pokémon not found");
      } else {
        onSubmit(fuzzyList);
      }
    }
  };

  return (
    <div className="flex flex-row bg-white rounded max-w-md py-2 px-4 my-4">
      <form className="w-full flex items-center" onSubmit={handleSubmit}>
        <input
          className="w-full outline-none"
          type="text"
          placeholder="Name or id number"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        />
      </form>
      <Image
        src="/images/magnifying-glass-solid.svg"
        alt="search"
        width={20}
        height={20}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default InputField;
