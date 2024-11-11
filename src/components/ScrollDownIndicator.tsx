import React from "react";
import { motion } from "framer-motion";

const ScrollDownIndicator: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  return (
    <>
      {hidden && (
        <div className="flex flex-col items-center space-y-2 fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 10 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 #1E1E1E"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ScrollDownIndicator;
