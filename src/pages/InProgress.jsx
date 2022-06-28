import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import InProgressDrink from '../Components/InProgressDrink';
import InProgressFood from '../Components/InProgressFood';
import { handleIngredients } from '../utils/useFunctions';

function InProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    async function getRecipe() {
      if (pathname.includes('foods')) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { meals } = await (await fetch(url)).json();

        const mealRecipe = meals[0];
        setIngredients(handleIngredients(mealRecipe));
        setInstructions(mealRecipe);
      }
      if (pathname.includes('drinks')) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { drinks } = await (await fetch(url)).json();
        const drinkRecipe = drinks[0];
        setIngredients(handleIngredients(drinkRecipe));
        setInstructions(drinkRecipe);
      }
    }
    getRecipe();
  }, [id, pathname]);

  return (
    <div>
      {pathname.includes('foods')
      && <InProgressFood ingredients={ ingredients } instructions={ instructions } />}
      {pathname.includes('drinks')
      && <InProgressDrink ingredients={ ingredients } instructions={ instructions } />}
    </div>
  );
}

export default InProgress;
