import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function Card() {
  const drinks = useSelector((state) => state.reducerHeader.drinks);
  const foods = useSelector((state) => state.reducerHeader.meals);
  const location = useLocation();
  console.log(drinks);
  const MAX_INDEX_CARD = 12;
  return (
    <div>
      { drinks && location.pathname === '/drinks' && drinks.map((receitas, index) => (
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
      { foods && location.pathname === '/foods' && foods.map((receitas, index) => (
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
