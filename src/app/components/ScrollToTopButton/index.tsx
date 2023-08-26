import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./scroll-to-top-button.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
      className="scroll-to-top-button bg-amber-400 py-2 px-4 ml-2 rounded-full"
    >
      <Image
        src={"/images/arrow-up-solid.svg"}
        width={20}
        height={20}
        alt="scrollToTop"
      />
    </button>
  );
};

export default ScrollToTopButton;
