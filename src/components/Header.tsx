import { motion } from "framer-motion";
import { useState } from "react";
import { getRandomNumber } from "../utils/getRandomNumber";
import { MenuIcon, X } from "lucide-react";

const Header: React.FC = () => {
  const [randomRotation, setRandomRotation] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const liHover = {
    y: 4,
    scale: 1.1,
    cursor: "pointer",
    rotate: randomRotation,
  };
  const liTap = { y: 0, scale: 1, rotate: 0 };

  const handleHover = () => {
    setRandomRotation(getRandomNumber());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-row w-svw px-16 py-8 font-jeju text-xl text-brand justify-between no-copy relative">
      <motion.div
        whileHover={{ scale: 1.2, cursor: "pointer" }}
        whileTap={{ scale: 1 }}
      >
        Eatsy
      </motion.div>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden" onClick={toggleMenu}>
        <MenuIcon color="#f4c430" size={28} />
      </div>

      {/* PC Navigation */}
      <ul className="lg:flex flex-row gap-8 hidden">
        <motion.li
          onHoverStart={handleHover}
          whileHover={liHover}
          whileTap={liTap}
        >
          Socials
        </motion.li>
        <motion.li
          onHoverStart={handleHover}
          whileHover={liHover}
          whileTap={liTap}
        >
          Contact
        </motion.li>
        <motion.li
          onHoverStart={handleHover}
          whileHover={liHover}
          whileTap={liTap}
        >
          About
        </motion.li>
      </ul>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed bottom-0 left-0 w-full h-3/4 bg-brand z-20 flex flex-col p-8"
          initial={{ y: "100%" }} // Start from below the screen
          animate={{ y: 0 }} // Slide up into place
          exit={{ y: "100%" }} // Slide out to the bottom (closing animation)
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex justify-end">
            <X size={28} color="#333" onClick={toggleMenu} />
          </div>
          <nav className="mt-8 space-y-6 font-bold text-lg text-dark">
            <motion.li whileTap={liTap}>Socials</motion.li>
            <motion.li whileTap={liTap}>Contact</motion.li>
            <motion.li whileTap={liTap}>About</motion.li>
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
