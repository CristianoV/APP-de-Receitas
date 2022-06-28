import React from 'react';
import propTypes from 'prop-types';

function InProgressFood({ ingredients, instructions }) {
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ instructions.strMealThumb }
        alt={ instructions.strMeal }
      />
      <h1 data-testid="recipe-title">{instructions.strMeal}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{instructions.strCategory}</p>
      <div>
        {ingredients.map(({ theIngredients }, index) => (
          <div key={ index }>
            <label htmlFor={ theIngredients } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                name="teste"
                value={ theIngredients }
                id={ theIngredients }
              />
              { theIngredients }
            </label>
          </div>
        ))}
      </div>
      <p data-testid="instructions">{instructions.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>);
}

InProgressFood.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.string).isRequired,
}.isRequired;

export default InProgressFood;
