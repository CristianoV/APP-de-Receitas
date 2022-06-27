import React from 'react';
import propTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import FavIcon from '../images/whiteHeartIcon.svg';

export default function CardsDetails({ useRecipe, useIngredients }) {
  return (
    <div>

      <div>
        <img
          src={ useRecipe.strMealThumb }
          alt="Drink"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{ useRecipe.strMeal }</h1>
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

      <div>
        <iframe
          title={ useRecipe.strMeal }
          width="420"
          height="315"
          src={ useRecipe.strYoutube }
          data-testid="video"
        />
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

CardsDetails.propTypes = {
  recipeThumb: propTypes.string,
  recipeName: propTypes.string,
  index: propTypes.number,
}.isRequired;
