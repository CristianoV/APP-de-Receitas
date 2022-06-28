import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import FavIcon from '../images/whiteHeartIcon.svg';
import { handleShare, handleFavorite, handleStarRecipe } from '../utils/useFunctions';
import CarouselCard from './CarouselCard';

export default function DrinkCardsDetails({ useRecipe, useIngredients }) {
  const [useUrlPage, setUrlPage] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const urlPage = `${global.location.origin}${pathname}`;

  return (
    <div>
      <div>
        <img
          src={ useRecipe.strDrinkThumb }
          alt="Drink"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{useRecipe.strDrink}</h1>
        <button
          type="button"
          onClick={ () => handleShare(urlPage, setUrlPage) }
        >
          <img
            src={ ShareIcon }
            alt="Share Button"
            data-testid="share-btn"
          />
        </button>
        <button
          type="button"
          onClick={ handleFavorite }
        >
          <img
            src={ FavIcon }
            alt="Share Button"
            data-testid="favorite-btn"
          />
        </button>
        {
          useUrlPage && (<p>Link copied!</p>)
        }
        <p>{useRecipe.strCategory}</p>
        <p data-testid="recipe-category">{useRecipe.strAlcoholic}</p>
      </div>

      <div>
        {useIngredients.map(({ theIngredients, theMeasures }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <p>
              --
              {' '}
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
      <CarouselCard />
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => handleStarRecipe(history, useRecipe.idDrink) }
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