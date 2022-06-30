import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import { handleStarRecipe } from '../utils/useFunctions';
import CarouselCard from './CarouselCard';
import ButtonShare from './ButtonsShare';
import style from './CSS/PagDetails.module.css';

export default function DrinkCardsDetails({ useRecipe, useIngredients }) {
  const favorito = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorite, setFavorite] = useState(favorito || []);
  const { id } = useParams();
  const [useInProgress, setInProgress] = useState(false);
  const [useDone, setDone] = useState(false);
  const [useUrlPage, setUrlPage] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const urlPage = `${global.location.origin}${pathname}`;
  const ValidationFaforite = favorite.some((item) => item.id === id);
  const AddFavorite = [
    ...favorite,
    {
      id,
      type: 'drink',
      nationality: '',
      category: useRecipe.strCategory,
      alcoholicOrNot: useRecipe.strAlcoholic,
      name: useRecipe.strDrink,
      image: useRecipe.strDrinkThumb,
    }];

  const RemoveFavorite = favorite.filter((item) => item.id !== id);

  useEffect(() => {
    function inProgress() {
      const localProgress = localStorage.getItem('inProgressRecipes');
      const localDone = localStorage.getItem('doneRecipes');

      if (localProgress !== null) {
        const recipesInProgress = JSON.parse(localProgress);
        const keysInProgress = Object.keys(recipesInProgress.cocktails);
        const verifyProgress = keysInProgress.some((ele) => ele === useRecipe.idDrink);

        setInProgress(verifyProgress);
      }
      if (localDone !== null) {
        const recipes = JSON.parse(localDone);
        const verifyDone = recipes.some((recipe) => recipe.id === useRecipe.idDrink);
        setDone(verifyDone);
      }
    }
    inProgress();
  }, [useInProgress, useRecipe]);

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
      {
        !useDone && !useInProgress && (
          <button
            type="button"
            className={ style.containerButton }
            data-testid="start-recipe-btn"
            onClick={ () => handleStarRecipe(history, useRecipe.idDrink) }
          >
            Start Recipe
          </button>
        )
      }
      {
        useInProgress && (
          <button
            type="button"
            className={ style.containerButton }
            data-testid="start-recipe-btn"
            onClick={ () => handleStarRecipe(history, useRecipe.idDrink) }
          >
            Continue Recipe
          </button>
        )
      }
    </div>
  );
}

DrinkCardsDetails.propTypes = {
  recipeThumb: propTypes.string,
  recipeName: propTypes.string,
  index: propTypes.number,
}.isRequired;
