import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

function InProgressDrink({ ingredients, instructions }) {
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    if (ingredients) {
      const input = ingredients.map(() => false);
      setInputs(input);
    }
  },
  [ingredients]);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ instructions.strDrinkThumb }
        alt={ instructions.strDrink }
      />
      <h1 data-testid="recipe-title">{instructions.strDrink}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{instructions.strAlcoholic}</p>
      <div>
        {ingredients.map(({ theIngredients, theMeasures }, index) => (
          <div key={ index }>
            <label htmlFor={ theIngredients } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                name="teste"
                value={ theIngredients }
                id={ theIngredients }
                onChange={ () => {
                  setInputs(inputs.map((item, i) => (i === index ? !item : item)));
                } }
              />
              {inputs[index] === false ? `${theIngredients} 
              ${theMeasures === null ? '' : theMeasures}`
                : (
                  <s>
                    {console.log(theMeasures)}
                    {`${theIngredients} ${theMeasures === null ? '' : theMeasures}`}
                  </s>
                )}
            </label>
          </div>
        ))}
      </div>
      <p data-testid="instructions">{instructions.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>);
}

InProgressDrink.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.string).isRequired,
}.isRequired;

export default InProgressDrink;
