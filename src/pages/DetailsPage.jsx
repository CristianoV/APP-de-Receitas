import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import CardsDetails from '../Components/CardsDetails';
import DrinkCardsDetails from '../Components/DrinkDetailsCard';
import { handleIngredients } from '../utils/useFunctions';
import { setDrinksDetails, setFoodsDetails } from '../redux/action/detailsPageActions';

export default function DetailsPage() {
  const dispatch = useDispatch();
  const [useRecipe, setRecipe] = useState('');
  const [useIngredients, setIngredients] = useState({});
  // const useRecipe = useSelector((state) => state.reducerDetails.details);

  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    async function getRecipe() {
      if (pathname.includes('foods')) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { meals } = await (await fetch(url)).json();

        const mealRecipe = meals[0];
        setRecipe(mealRecipe);
      }
      if (pathname.includes('drinks')) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { drinks } = await (await fetch(url)).json();
        const drinkRecipe = drinks[0];
        setRecipe(drinkRecipe);
      }
    }
    getRecipe();
  }, [id, pathname]);

  useEffect(() => {
    if (pathname.includes('foods')) {
      dispatch(setFoodsDetails(id));
    }
    if (pathname.includes('drinks')) {
      dispatch(setDrinksDetails(id));
    }
  }, [pathname, id, dispatch]);

  useEffect(() => {
    setIngredients(handleIngredients(useRecipe));
    console.log(useRecipe);

    // if (useRecipe !== undefined) {
    //   setIngredients(handleIngredients(useRecipe));
    // }
    // if (useRecipe !== undefined) console.log('deu', useRecipe);
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
