import axios from "axios";
import { useState } from "react";

const Meals = () => {
  const APP_ID = "0dd4ae33";
  const APP_KEY = "c4abf90ac9fcf7f611cd304a6378c6fc";

  const [breakfast, setBreakfast] = useState(["chicken", "eggs"]);

  const searchFood = async (food) => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${food}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getFoodInfo = async (food) => {
    const data = await searchFood(food);
    const calories = data.hits[0].recipe.calories;
    const fat = data.hits[0].recipe.totalNutrients.FAT;
    const protein = data.hits[0].recipe.totalNutrients.PROCNT;
    const carb = data.hits[0].recipe.totalNutrients.CHOCDF;
    console.log(data.hits[0].recipe);
    console.log(calories, fat, protein, carb);

    return {
      calories,
      fat,
      protein,
      carb,
    };
  };

  return (
    <div>
      <h1>Meals</h1>

      <div>
        <h2>Breakfast</h2>
        <div>
          {breakfast.map((food, index) => (
            <div key={index}>{food}</div>
          ))}
        </div>
        <div>
          <button>ADD FOOD</button>
          <button>Quick Add</button>
        </div>
      </div>

      <button onClick={() => getFoodInfo("2 cups of chicken biryani")}>
        Chicken
      </button>
    </div>
  );
};
export default Meals;
