import { Pokemon } from "@/app/utils/types";
import Image from "next/image";
import { padNumberToFourDigits } from "../../utils/utils";
import PokemonCard from "../PokemonCard";
import { useEffect, useState } from "react";
import Toast from "../Toast";
import { AxiosError } from "axios";

interface ErrorHandlerProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorHandler = ({ errorMessage, onClose }: ErrorHandlerProps) => {
  return (
    <Toast
      message={errorMessage}
      type={"error"}
      handleOnClosed={() => onClose()}
    />
  );
};

export default ErrorHandler;
