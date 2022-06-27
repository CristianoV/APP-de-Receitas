import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import CardsDetails from '../Components/CardsDetails';
import DrinkCardsDetails from '../Components/DrinkDetailsCard';
import { handleIngredients } from '../utils/useFunctions';

export default function DetailsPage() {
  const [useRecipe, setRecipe] = useState('');
  const [useIngredients, setIngredients] = useState({});

  const Receitas = useSelector((state) => state.reducerHeader.Receitas);
  console.log(Receitas);

  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    async function getRecipe() {
      if (pathname.includes('foods')) {
        console.log('deu foods');
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { meals } = await (await fetch(url)).json();

        const mealRecipe = meals[0];
        setRecipe(mealRecipe);
      }
      if (pathname.includes('drinks')) {
        console.log('deu driks');
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { drinks } = await (await fetch(url)).json();
        const drinkRecipe = drinks[0];
        setRecipe(drinkRecipe);
      }
    }
    getRecipe();
  }, [id, pathname]);

  useEffect(() => {
    setIngredients(handleIngredients(useRecipe));
  }, [useRecipe]);

  return (
    <section>
      {
        useRecipe.length === 0 && (
          <p>loading...</p>
        )
      }
      {
        useRecipe && (
          <div>
            {
              pathname.includes('foods') ? (
                <CardsDetails
                  useRecipe={ useRecipe }
                  useIngredients={ useIngredients }
                />
              ) : (
                <DrinkCardsDetails
                  useRecipe={ useRecipe }
                  useIngredients={ useIngredients }
                />
              )
            }
          </div>
        )
      }
    </section>
  );
}
