import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function Card() {
  const drinks = useSelector((state) => state.reducerHeader.drinks);
  const foods = useSelector((state) => state.reducerHeader.meals);
  const foodsCategory = useSelector((state) => state.reducerMainPage.Receitas);
  const location = useLocation();
  const MAX_INDEX_CARD = 12;
  return (
    <div>
      { foodsCategory && location.pathname === '/drinks'
      && foodsCategory.map((receitas, index) => (
        <div key={ receitas.idDrink }>
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
      { drinks && location.pathname === '/drinks' && !foodsCategory.length
       && drinks.map((receitas, index) => (
         <div key={ receitas.idDrink }>
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
      { foodsCategory && location.pathname === '/foods'
      && foodsCategory.map((receitas, index) => (
        <div key={ receitas.idDrink }>
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
      { foods && location.pathname === '/foods' && !foodsCategory.length
       && foods.map((receitas, index) => (
         <div key={ receitas.idDrink }>
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
