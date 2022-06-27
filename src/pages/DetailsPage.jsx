import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import CardsDetails from '../Components/CardsDetails';
import DrinkCardsDetails from '../Components/DrinkDetailsCard';

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
    const MAX = 20;
    const ingredientsList = [];
    // const ingredientsList = {
    //   ingredients: [],
    //   measures: [],
    // };
    // const mesureList = [];

    for (let i = 1; i <= MAX; i += 1) {
      const ingredient = useRecipe[`strIngredient${i}`];
      const measure = useRecipe[`strMeasure${i}`];

      if (ingredient && ingredient.length !== 0) {
        ingredientsList.push({
          theIngredients: ingredient,
          theMeasures: measure,
        });
      }
    }
    setIngredients(ingredientsList);
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
              pathname === '/foods' ? (
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

            <div>
              <p>Recomendações</p>
            </div>
          </div>
        )
      }
    </section>
  );
}
