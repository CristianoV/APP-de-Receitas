import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import FavIcon from '../images/whiteHeartIcon.svg';
import { handleShare, handleFavorite }
from '../utils/useFunctions';

function InProgressFood({ ingredients, instructions }) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favorito = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorite, setFavorite] = useState(favorito || []);
  const { id } = useParams();
  const history = useHistory();
  const [inputs, setInputs] = useState(storage?.meals?.[id] || []);
  const [useUrlPage, setUrlPage] = useState(false);
  const { pathname } = useLocation();
  const urlPage = `${global.location.origin}${pathname}`;
  const urlPageFormatado = urlPage.replace(urlPage,
    `${global.location.origin}/foods/${id}`);
  const ValidationFaforite = favorite.some((item) => item.id === id);
  const AddFavorite = [
    ...favorite,
    {
      id,
      type: 'food',
      nationality: instructions.strArea,
      category: instructions.strCategory,
      alcoholicOrNot: '',
      name: instructions.strMeal,
      image: instructions.strMealThumb,
    }];

  const RemoveFavorite = favorite.filter((item) => item.id !== id);

  const validation = () => {
    if (ValidationFaforite) {
      setFavorite(RemoveFavorite);
      return RemoveFavorite;
    }
    setFavorite(AddFavorite);
    return AddFavorite;
  };

  useEffect(() => {
    const setLocalStorage = () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        {
          cocktails: {
            ...storage?.cocktails,
          },
          meals: {
            ...storage?.meals,
            [id]: inputs,
          },
        },
      ));
    };
    setLocalStorage();
  }, [inputs, id, storage]);

  const handleChange = ({ target }) => {
    const { name } = target;
    const newInputs = [...inputs];
    const abc = inputs.some((input) => input === name);
    if (abc) {
      setInputs(newInputs.filter((input) => input !== name));
    } else {
      setInputs([...newInputs, name]);
    }
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ instructions.strMealThumb }
        alt={ instructions.strMeal }
      />
      <h1 data-testid="recipe-title">{instructions.strMeal}</h1>
      <button
        type="button"
        onClick={ () => handleShare(urlPageFormatado, setUrlPage) }
      >
        <img
          src={ ShareIcon }
          alt="Share Button"
          data-testid="share-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => handleFavorite(validation()) }
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
      <p data-testid="recipe-category">{instructions.strCategory}</p>
      <div>
        {inputs && ingredients.map(({ theIngredients, theMeasures }, index) => (
          <div key={ index }>
            <label htmlFor={ theIngredients } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                name={ theIngredients }
                value={ theIngredients }
                checked={ inputs.some((input) => input === theIngredients) }
                id={ theIngredients }
                onChange={ (e) => {
                  handleChange(e);
                } }
              />
              {inputs && inputs.some((input) => input === theIngredients) ? (
                <s>
                  {`${theIngredients} ${theMeasures === null ? '' : theMeasures}`}
                </s>
              )
                : `${theIngredients}
                ${theMeasures === null ? '' : theMeasures}`}
            </label>
          </div>
        ))}
      </div>
      <p data-testid="instructions">{instructions.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ inputs.length !== ingredients.length }
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Finalizar Receita

      </button>
    </div>);
}

InProgressFood.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.string).isRequired,
}.isRequired;

export default InProgressFood;
