type FoodItem = {
  food: string;
  description: string;
  price: number;
};

type FoodCategory = {
  [category: string]: FoodItem[];
};

function sortFoodInCategories(foodData: FoodCategory): FoodCategory {
  const sortedFoodData: FoodCategory = {};

  for (const category in foodData) {
    sortedFoodData[category] = [...foodData[category]].sort((a, b) =>
      a.food.localeCompare(b.food)
    );
  }

  return sortedFoodData;
}

export default sortFoodInCategories;
