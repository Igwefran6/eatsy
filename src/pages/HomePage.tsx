// HomePage.tsx

import React, { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Pizza, Coffee } from "lucide-react";

// Lazy-load the Page component
const Page = React.lazy(() => import("../components/HPage"));

const Loading: React.FC = () => {
  return (
    <motion.div
      className="flex justify-center items-center h-screen w-screen bg-brand no-copy"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5, background: "#FDFD96" }} // Fade out effect
      transition={{ duration: 0.5 }} // Duration of fade out
    >
      <motion.div className="flex justify-center items-center text-dark text-3xl gap-8">
        {[Utensils, Pizza, Coffee].map((Icon, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0], // Bounce animation
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.2, // Slight delay for staggered bouncing
            }}
          >
            <Icon />
          </motion.div>
        ))}
        <p className="fixed bottom-4 right-8">Loading...</p>
      </motion.div>
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Wait for the Page component to load, then hide loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the delay if needed for longer loading times

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <Loading key="loading" />
      ) : (
        <motion.div
          key="page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.5 }} // Duration of fade in
        >
          <Suspense fallback={<Loading />}>
            <Page />
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePage;
