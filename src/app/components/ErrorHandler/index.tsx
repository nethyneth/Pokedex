import React from "react";
import Toast from "../Toast";

interface ErrorHandlerProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  errorMessage,
  onClose,
}) => {
  const handleOnClosed = () => {
    onClose();
  };

  return (
    <Toast
      message={errorMessage}
      type="error"
      handleOnClosed={handleOnClosed}
    />
  );
};

export default ErrorHandler;
