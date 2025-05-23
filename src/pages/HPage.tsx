import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { getRandomNumber } from "../utils/getRandomNumber";
import ScrollDownIndicator from "../components/ScrollDownIndicator";
import FoodMenu from "../components/FoodMenu";
import { BackgroundImageLoader } from "../utils/BackgroundImageLoader";

const HPage: React.FC<{ src: string }> = ({ src }) => {
  const [hasReachedTop, setHasReachedTop] = useState(false);
  const [randomRotation, setRandomRotation] = useState(0);
  const secondSectionRef = useRef<HTMLDivElement | null>(null);

  BackgroundImageLoader(src);

  useEffect(() => {
    const handleScroll = () => {
      if (secondSectionRef.current) {
        const topPosition =
          secondSectionRef.current.getBoundingClientRect().top;
        setHasReachedTop(topPosition <= 460);
      }
    };

    window.addEventListener("scroll", handleScroll);

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
        <div
          className="bg-cover bg-center h-svh"
          style={{ backgroundImage: `url(${src})` }}
        >
          <Header />
          <div className="relative font-jeju text-brand h-full w-full flex justify-center items-center pb-36">
            <motion.div
              onHoverStart={handleHover}
              whileHover={{ scale: 1.2, rotate: randomRotation }}
              className="bg-dark-light w-fit py-2 lg:py-4 px-12 border-2 border-brand rounded-full text-7xl relative"
            >
              Eatsy
              <span className="absolute -top-8 -right-8 font-harlows text-dark text-4xl w-full ">
                Welcome to
              </span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Second section */}
      <motion.section
        ref={secondSectionRef}
        className="relative mt-[100vh] z-10 bg-brand h-screen p-8 text-center"
      >
        <motion.div
          className={
            `font-jeju text-2xl absolute top-[-96px] translate-x-[50%] right-[50%] z-10 w-full bg-brand p-8 ` +
            (hasReachedTop ? "border" : "")
          }
          initial={{
            borderTopWidth: 4,
            borderTopLeftRadius: hasReachedTop ? "0px" : "85px",
            borderTopRightRadius: hasReachedTop ? "0px" : "85px",
          }}
          animate={{
            borderTopWidth: hasReachedTop ? 0 : 4,
            borderTopLeftRadius: hasReachedTop ? "0px" : "85px",
            borderTopRightRadius: hasReachedTop ? "0px" : "85px",
            top: hasReachedTop ? "0px" : "-95px",
          }}
        >
          Our Delicious Menu
        </motion.div>
        <FoodMenu />
      </motion.section>
      <ScrollDownIndicator hidden={!hasReachedTop} />
    </>
  );
};

export default HPage;
