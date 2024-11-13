import { motion } from "framer-motion";
import Header from "../components/Header";
import { getRandomNumber } from "../utils/getRandomNumber";
import { Suspense, useState } from "react";
import Loading from "./Loading";
import { BackgroundImageLoader } from "../utils/BackgroundImageLoader";

const AboutPage = () => {
  const [randomRotation, setRandomRotation] = useState(0);
  const handleHover = () => {
    setRandomRotation(getRandomNumber());
  };
  const backgroundImageSrc = "/images/eatsy-food.png";
  BackgroundImageLoader(backgroundImageSrc);
  return (
    <Suspense fallback={<Loading />}>
      <div
        className="bg-cover bg-bottom min-h-screen min-w-screen"
        style={{
          backgroundImage: `url(${backgroundImageSrc})`,
          overflow: "hidden",
        }}
      >
        <Header />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: "anticipate" }}
          className="p-8 text-center text-xl flex flex-col items-center max-h-full max-w-full"
        >
          <motion.h1
            onHoverStart={handleHover}
            whileHover={{ rotate: randomRotation }}
            className="text-3xl font-bold mb-4 font-jeju text-light w-fit"
          >
            About Us
          </motion.h1>
          <div className="w[90%] lg:w-[60%] text-light flex flex-col gap-8 bg-dark-light p-4 rounded-lg border-4 border-brand">
            {" "}
            <p>
              Welcome to Eatsy, where fresh flavors and a cozy atmosphere come
              together to create an unforgettable dining experience. nutrition.
            </p>
            <p>
              At Eatsy, we believe that food should be both delicious and
              nourishing, which is why we source the finest local ingredients to
              bring you seasonal dishes that celebrate bold tastes and wholesome
            </p>
            <p>
              Come join us for a meal, and experience the warmth and flavors
              that set Eatsy apart.
            </p>
          </div>
        </motion.div>
      </div>
    </Suspense>
  );
};

export default AboutPage;
