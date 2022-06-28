import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import FavIcon from '../images/whiteHeartIcon.svg';
import { handleShare, handleFavorite, handleStarRecipe, handleStrYouTube }
from '../utils/useFunctions';
import CarouselCard from './CarouselCard';

export default function CardsDetails({ useRecipe, useIngredients }) {
  const [useUrlPage, setUrlPage] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const urlPage = `${global.location.origin}${pathname}`;

  return (
    <div>

      <div>
        <img
          src={ useRecipe.strMealThumb }
          alt="Food"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{ useRecipe.strMeal }</h1>
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
        <p data-testid="recipe-category">{useRecipe.strCategory}</p>
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

      <div>
        <iframe
          title={ useRecipe.strMeal }
          width="420"
          height="315"
          src={ handleStrYouTube(useRecipe.strYoutube) }
          data-testid="video"
        />
      </div>

      <CarouselCard />

      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => handleStarRecipe(history, useRecipe.idMeal) }
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
