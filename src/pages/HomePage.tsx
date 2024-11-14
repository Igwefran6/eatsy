import { Suspense } from "react";
import { motion } from "framer-motion";
import HPage from "./HPage";
import Loading from "./Loading";

const HomePage = () => {
  const backgroundImageSrc = "/images/eatsy-food.png";
  return (
    <Suspense fallback={<Loading />}>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 0.5, ease: "anticipate" }}
      >
        <div className="bg-brand max-h-screen">
          <HPage src={backgroundImageSrc} />
        </div>
      </motion.div>
    </Suspense>
  );
};

export default HomePage;
