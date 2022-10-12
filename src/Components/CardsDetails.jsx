import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import { handleStarRecipe, handleStrYouTube } from '../utils/useFunctions';
// import CarouselCard from './CarouselCard';
import ButtonShare from './ButtonsShare';
import style from './CSS/PagDetails.module.css';

export default function CardsDetails({ useRecipe, useIngredients }) {
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
      type: 'food',
      nationality: useRecipe.strArea,
      category: useRecipe.strCategory,
      alcoholicOrNot: '',
      name: useRecipe.strMeal,
      image: useRecipe.strMealThumb,
    }];

  const RemoveFavorite = favorite.filter((item) => item.id !== id);

  useEffect(() => {
    function inProgress() {
      const localProgress = localStorage.getItem('inProgressRecipes');
      const localDone = localStorage.getItem('doneRecipes');

      if (localProgress !== null) {
        const recipes = JSON.parse(localProgress);
        const keysInProgress = Object.keys(recipes.meals);
        const verifyProgress = keysInProgress
          .some((recipeId) => recipeId === useRecipe.idMeal);

        setInProgress(verifyProgress);
      }
      if (localDone !== null) {
        const recipes = JSON.parse(localDone);
        const verifyDone = recipes.some((recipe) => recipe.id === useRecipe.idMeal);
        setDone(verifyDone);
      }
    }
    inProgress();
  }, [useInProgress, useRecipe]);

  return (
    <div className={ style.container }>

      <div className={ style.information }>
        <h1 data-testid="recipe-title">{ useRecipe.strMeal }</h1>
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

        <img
          src={ useRecipe.strMealThumb }
          alt="Food"
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-category">{useRecipe.strCategory}</p>
      </div>

      <div>
        <h2>Ingredients</h2>
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
        <h2>Instructions</h2>
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

      {/* <CarouselCard /> */}
      {
        !useDone && !useInProgress && (
          <button
            type="button"
            className={ style.containerButton }
            data-testid="start-recipe-btn"
            onClick={ () => handleStarRecipe(history, useRecipe.idMeal) }
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
            onClick={ () => handleStarRecipe(history, useRecipe.idMeal) }
          >
            Continue Recipe
          </button>
        )
      }
    </div>
  );
}

CardsDetails.propTypes = {
  recipeThumb: propTypes.string,
  recipeName: propTypes.string,
  index: propTypes.number,
}.isRequired;
