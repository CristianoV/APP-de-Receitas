import React from 'react';
import { useSelector } from 'react-redux';

function Card() {
  const redux = useSelector((state) => state.reducerHeader.drinks);
  console.log(redux);
  const MAX_INDEX_CARD = 12;
  return (
    <div>
      { redux && redux.map((teste, index) => (
        <div key={ teste.idDrink }>
          {index < MAX_INDEX_CARD && (
            <div data-testid={ `${index}-recipe-card` }>
              <h1 data-testid={ `${index}-card-name` }>{teste.strDrink}</h1>
              <img
                src={ teste.strDrinkThumb }
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
