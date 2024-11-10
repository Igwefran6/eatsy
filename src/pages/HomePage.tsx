import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { getRandomNumber } from "../utils/getRandomNumber";
import ScrollDownIndicator from "../components/ScrollDownIndicator";

const HomePage: React.FC = () => {
  const [hasReachedTop, setHasReachedTop] = useState(false);
  const [randomRotation, setRandomRotation] = useState(0);
  const secondSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (secondSectionRef.current) {
        const topPosition =
          secondSectionRef.current.getBoundingClientRect().top;
        // Check if the second section has reached the top of the viewport
        setHasReachedTop(topPosition <= 4);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHover = () => {
    setRandomRotation(getRandomNumber());
  };

  return (
    <>
      {/* First section */}
      <motion.section className="fixed top-0 left-0 w-screen h-screen z-[-1] no-copy">
        <motion.div className="bg-[url('/images/rice-chicken.png')] bg-cover bg-center h-svh">
          <Header />
          <div className="relative font-jeju text-brand h-full w-full flex justify-center items-center pb-36">
            <motion.div
              onHoverStart={handleHover}
              whileHover={{ scale: 1.2, rotate: randomRotation }}
              className="bg-dark-light w-fit py-2 lg:py-4 px-12 border-2 border-brand rounded-full text-8xl relative"
            >
              Eatsy
              <span className="absolute -top-8 -right-8 font-harlows text-dark text-4xl w-full ">
                Welcome to
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Second section */}
      <motion.section
        ref={secondSectionRef}
        className="relative mt-[85vh] z-10 bg-brand h-screen p-8 text-center"
        initial={{
          borderTopWidth: 4,
          borderTopLeftRadius: hasReachedTop ? "0px" : "85px",
          borderTopRightRadius: hasReachedTop ? "0px" : "85px",
        }}
        animate={{
          borderTopWidth: hasReachedTop ? 0 : 4,
          borderTopLeftRadius: hasReachedTop ? "0px" : "85px",
          borderTopRightRadius: hasReachedTop ? "0px" : "85px",
        }}
      >
        <p className="font-jeju text-2xl">Our Delicious Menu</p>
      </motion.section>
      <ScrollDownIndicator />
    </>
  );
};

export default HomePage;
