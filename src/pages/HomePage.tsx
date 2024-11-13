import { Suspense } from "react";
import { motion } from "framer-motion";
import HPage from "./HPage";
import Loading from "./Loading";

const HomePage = () => {
  const backgroundImageSrc = "/images/rice-chicken.png";

  return (
    <Suspense fallback={<Loading />}>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <HPage src={backgroundImageSrc} />
      </motion.div>
    </Suspense>
  );
};

export default HomePage;
