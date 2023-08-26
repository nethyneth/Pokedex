import React, { useEffect } from "react";
import { ToastContainer, ToastOptions, toast } from "react-toastify";

interface ToastProps {
  message: string;
  type: ToastOptions["type"];
  handleOnClosed: () => void;
}

const Toast = ({ message, type, handleOnClosed }: ToastProps) => {
  useEffect(() => {
    toast(message, {
      position: "top-left",
      autoClose: 500,
      hideProgressBar: true,
      theme: "light",
      type: type,
      onClose: () => {
        handleOnClosed();
      },
    });
  }, [message]);
  return <ToastContainer />;
};

export default Toast;
