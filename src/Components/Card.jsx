import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function Card() {
  const drinks = useSelector((state) => state.reducerHeader.drinks);
  const foods = useSelector((state) => state.reducerHeader.meals);
  const foodsCategory = useSelector((state) => state.reducerMainPage.Receitas);
  console.log(foodsCategory.length);
  const location = useLocation();
  const MAX_INDEX_CARD = 12;
  return (
    <div>
      { foodsCategory.drinks && location.pathname === '/drinks'
      && foodsCategory.drinks.map((receitas, index) => (
        <div key={ index }>
          {index < MAX_INDEX_CARD && (
            <div data-testid={ `${index}-recipe-card` }>
              <h1 data-testid={ `${index}-card-name` }>{receitas.strDrink}</h1>
              <img
                src={ receitas.strDrinkThumb }
                alt=""
                data-testid={ `${index}-card-img` }
              />
            </div>
          )}
        </div>
      ))}
      { drinks && location.pathname === '/drinks' && foodsCategory.length === 0
       && drinks.map((receitas, index) => (
         <div key={ index }>
           {index < MAX_INDEX_CARD && (
             <div data-testid={ `${index}-recipe-card` }>
               <h1 data-testid={ `${index}-card-name` }>{receitas.strDrink}</h1>
               <img
                 src={ receitas.strDrinkThumb }
                 alt=""
                 data-testid={ `${index}-card-img` }
               />
             </div>
           )}
         </div>
       ))}
      { foodsCategory.meals && location.pathname === '/foods'
      && foodsCategory.meals.map((receitas, index) => (
        <div key={ index }>
          {index < MAX_INDEX_CARD && (
            <div data-testid={ `${index}-recipe-card` }>
              <h1 data-testid={ `${index}-card-name` }>{receitas.strMeal}</h1>
              <img
                src={ receitas.strMealThumb }
                alt=""
                data-testid={ `${index}-card-img` }
              />
            </div>
          )}
        </div>
      ))}
      { foods && location.pathname === '/foods' && foodsCategory.length === 0
       && foods.map((receitas, index) => (
         <div key={ index }>
           {index < MAX_INDEX_CARD && (
             <div data-testid={ `${index}-recipe-card` }>
               <h1 data-testid={ `${index}-card-name` }>{receitas.strMeal}</h1>
               <img
                 src={ receitas.strMealThumb }
                 alt=""
                 data-testid={ `${index}-card-img` }
               />
             </div>
           )}
         </div>
       ))}
    </div>
  );
}

export default Card;
