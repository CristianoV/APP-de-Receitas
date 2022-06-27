import React from 'react';
import propTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import FavIcon from '../images/whiteHeartIcon.svg';

export default function DrinkCardsDetails({ useRecipe, useIngredients }) {
  console.log(useRecipe);
  return (
    <div>
      <div>
        <img
          src={ useRecipe.strDrinkThumb }
          alt="Drink"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{useRecipe.strDrink}</h1>
        <p>{useRecipe.strAlcoholic}</p>
        <img
          src={ ShareIcon }
          alt="Share Button"
          data-testid="share-btn"
        />
        <img
          src={ FavIcon }
          alt="Share Button"
          data-testid="favorite-btn"
        />
        <p data-testid="recipe-category">{useRecipe.strCategory}</p>
      </div>

      <div>
        {useIngredients.map(({ theIngredients, theMeasures }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <p>
              -
              { theIngredients }
              {' '}
              -
              {' '}
              { theMeasures }
            </p>
          </div>
        ))}
      </div>

      <div>
        <p data-testid="instructions">{useRecipe.strInstructions}</p>
      </div>

      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => console.log('começar receita') }
      >
        Start Recipe
      </button>
    </div>
  );
}

DrinkCardsDetails.propTypes = {
  recipeThumb: propTypes.string,
  recipeName: propTypes.string,
  index: propTypes.number,
}.isRequired;
