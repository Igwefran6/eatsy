import { motion } from "framer-motion";
import { useState } from "react";
import { getRandomNumber } from "../utils/getRandomNumber";
import { MenuIcon, X } from "lucide-react";
import { Link } from "react-router-dom";

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

  const liStyle =
    "flex justify-center items-center bg-dark-light py-1 px-4 rounded-full border-2 text-brand text-lg";

  return (
    <div className="flex flex-row w-svw px-16 py-8 font-jeju text-xl justify-between no-copy relative overflow-hidden">
      <Link to={"/"}>
        {" "}
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="bg-dark-light py-1 px-4 rounded-full border-2 text-brand"
        >
          Eatsy
        </motion.div>
      </Link>
      {/* Mobile Menu Icon */}
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="lg:hidden p-1 bg-dark-light border-2 border-brand rounded-full "
        onClick={toggleMenu}
      >
        <MenuIcon color="#f4c430" size={28} />
      </motion.div>

      {/* PC Navigation */}
      <ul className="lg:flex items-center flex-row gap-4 hidden text-dark">
        <Link to={"/contact"}>
          <motion.li
            className={liStyle}
            onHoverStart={handleHover}
            whileHover={liHover}
            whileTap={liTap}
          >
            Contacts
          </motion.li>
        </Link>
        <Link to={"/about"}>
          <motion.li
            className={liStyle}
            onHoverStart={handleHover}
            whileHover={liHover}
            whileTap={liTap}
          >
            About
          </motion.li>
        </Link>
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
            <motion.li whileTap={liTap}>
              <Link to={"/contact"}>Contacts</Link>
            </motion.li>
            <motion.li whileTap={liTap}>
              <Link to={"/about"}>About</Link>
            </motion.li>
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
