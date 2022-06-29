import React, { useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import { handleStarRecipe } from '../utils/useFunctions';
import CarouselCard from './CarouselCard';
import ButtonShare from './ButtonsShare';

export default function DrinkCardsDetails({ useRecipe, useIngredients }) {
  const favorito = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorite, setFavorite] = useState(favorito || []);
  const { id } = useParams();
  const [useUrlPage, setUrlPage] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const urlPage = `${global.location.origin}${pathname}`;
  const ValidationFaforite = favorite.some((item) => item.id === id);
  const AddFavorite = [
    ...favorite,
    {
      id,
      type: 'food',
      nationality: useRecipe.strArea,
      category: useRecipe.strCategory,
      alcoholicOrNot: '',
      name: useRecipe.strMeal,
      image: useRecipe.strMealThumb,
    }];

  const RemoveFavorite = favorite.filter((item) => item.id !== id);

  return (
    <div>
      <div>
        <img
          src={ useRecipe.strDrinkThumb }
          alt="Drink"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{useRecipe.strDrink}</h1>
        <ButtonShare
          urlPageFormatado={ urlPage }
          setUrlPage={ setUrlPage }
          setFavorite={ setFavorite }
          ValidationFaforite={ ValidationFaforite }
          AddFavorite={ AddFavorite }
          RemoveFavorite={ RemoveFavorite }
        />
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
