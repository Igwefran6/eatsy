import { motion } from "framer-motion";
import React, { useState } from "react";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";
import sortFoodInCategories from "../utils/sortFoodInCategories";
const data = {
  Appetizers: [
    { food: "Spring Rolls", description: "Crispy and fresh.", price: 4000 },
    {
      food: "Garlic Bread",
      description: "Toasted with garlic butter.",
      price: 5600,
    },
    {
      food: "Stuffed Mushrooms",
      description: "Filled with cheese and herbs.",
      price: 7200,
    },
  ],
  Mains: [
    {
      food: "Spaghetti Bolognese",
      description: "Classic Italian pasta.",
      price: 5500,
    },
    {
      food: "Grilled Salmon",
      description: "Served with lemon butter.",
      price: 13500,
    },
    {
      food: "Chicken Parmesan",
      description: "Breaded chicken with marinara.",
      price: 16000,
    },
    { food: "Beef Steak", description: "Cooked to your liking.", price: 12000 },
    {
      food: "Veggie Stir-Fry",
      description: "Fresh vegetables with tofu.",
      price: 6000,
    },
  ],
  Sandwiches: [
    {
      food: "BLT Sandwich",
      description: "Bacon, lettuce, and tomato.",
      price: 2400,
    },
    {
      food: "Chicken Club",
      description: "Triple layer with grilled chicken.",
      price: 3500,
    },
    {
      food: "Veggie Wrap",
      description: "Loaded with fresh veggies.",
      price: 6200,
    },
    {
      food: "Turkey Avocado",
      description: "With creamy avocado spread.",
      price: 9800,
    },
  ],
  Desserts: [
    { food: "Chocolate Cake", description: "Rich and moist.", price: 6700 },
    {
      food: "Ice Cream Sundae",
      description: "Topped with chocolate sauce.",
      price: 4500,
    },
    { food: "Fruit Tart", description: "Fresh seasonal fruits.", price: 4400 },
    { food: "Cheesecake", description: "Classic New York style.", price: 5200 },
  ],
  Breakfast: [
    { food: "Pancakes", description: "Served with syrup.", price: 3900 },
    {
      food: "Omelette",
      description: "Choice of vegetables and cheese.",
      price: 3300,
    },
    {
      food: "Avocado Toast",
      description: "Topped with poached eggs.",
      price: 2100,
    },
    {
      food: "French Toast",
      description: "With powdered sugar and berries.",
      price: 3400,
    },
  ],
  Kids: [
    { food: "Mini Pizza", description: "Cheese or pepperoni.", price: 2400 },
    {
      food: "Chicken Nuggets",
      description: "Served with ketchup.",
      price: 2500,
    },
    {
      food: "Grilled Cheese",
      description: "Melted cheese on toast.",
      price: 3500,
    },
    { food: "Mac and Cheese", description: "Creamy and cheesy.", price: 4000 },
  ],
};
const foodData = sortFoodInCategories(data);
const categories = Object.keys(foodData);

const FoodMenu: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Limit to three items per page

  // Safely get items for the current category, if it exists
  const currentCategoryItems = foodData[categories[currentCategory]] || [];
  const maxPage = Math.ceil(currentCategoryItems.length / itemsPerPage) - 1;

  const handleNextCategory = () => {
    setCurrentCategory((prev) => (prev + 1) % categories.length);
    setCurrentPage(0); // Reset to first page of new category
  };

  const handlePrevCategory = () => {
    setCurrentCategory(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
    setCurrentPage(0); // Reset to first page of new category
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < maxPage ? prev + 1 : prev));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Calculate the items for the current page
  const startIdx = currentPage * itemsPerPage;
  const paginatedItems = currentCategoryItems.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  return (
    <div className="relative space-y-10 p-4 w-full pt-[96px] min-h-full">
      <h2 className="text-3xl font-bold mb-4 text-center font-jeju">
        {categories[currentCategory]}
      </h2>

      {/* Table container */}
      <motion.div className="w-full flex items-center justify-center relative">
        <motion.table
          key={categories[currentCategory]} // Key based on category
          className="w-full max-w-4xl text-left border-collapse"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr>
              <th className="p-2 border-b">Food</th>
              <th className="p-2 border-b">Description</th>
              <th className="p-2 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, idx) => (
              <tr key={idx}>
                <td className="p-2 border-b">{item.food}</td>
                <td className="p-2 border-b">{item.description}</td>
                <td className="p-2 border-b">
                  {"₦" + item.price.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </motion.div>

      {/* Category Navigation */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1 }}
        className="absolute bottom-4 transform left-4"
      >
        <button
          onClick={handlePrevCategory}
          className="p-2 rounded-full text-white"
        >
          <ArrowBigLeftDash size={42} />
        </button>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1 }}
        className="absolute bottom-4 transform right-4"
      >
        <button
          onClick={handleNextCategory}
          className="p-2 rounded-full text-white"
        >
          <ArrowBigRightDash size={42} />
        </button>
      </motion.div>

      {/* Page Navigation within Category */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="p-2 disabled:text-dark-light"
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= maxPage}
          className="p-2 disabled:text-dark-light"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default FoodMenu;
