import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { handleIngredients } from '../utils/useFunctions';

function InProgress() {
  const xablau = useSelector((state) => state.reducerDetails.details);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const teste = handleIngredients(xablau);
    setIngredients(teste);
  },
  [xablau]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ xablau.strMealThumb }
        alt={ xablau.strMeal }
      />
      <h1 data-testid="recipe-title">{xablau.strMeal}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{xablau.strCategory}</p>
      <div>
        {ingredients.map(({ theIngredients, theMeasures }, index) => (
          <div key={ index }>
            <label htmlFor={ theIngredients } data-testid={ `${index}-ingredient-step` }>
              <input
                type="radio"
                name="teste"
                value={ theIngredients }
                id={ theIngredients }
              />
              { theIngredients }
              {theMeasures}
            </label>
          </div>
        ))}
      </div>
      <p data-testid="instructions">Instrução</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default InProgress;
