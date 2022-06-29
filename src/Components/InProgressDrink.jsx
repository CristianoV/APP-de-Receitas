import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import FavIcon from '../images/whiteHeartIcon.svg';
import { handleShare, handleFavorite }
from '../utils/useFunctions';
import InputsProgress from './InputsProgress';

function InProgressDrink({ ingredients, instructions }) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favorito = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorite, setFavorite] = useState(favorito || []);
  const { id } = useParams();
  const [inputs, setInputs] = useState(storage?.cocktails?.[id] || []);
  const history = useHistory();
  const [useUrlPage, setUrlPage] = useState(false);
  const { pathname } = useLocation();
  const urlPage = `${global.location.origin}${pathname}`;
  const urlPageFormatado = urlPage.replace(urlPage,
    `${global.location.origin}/drinks/${id}`);
  const ValidationFaforite = favorite.some((item) => item.id === id);
  const AddFavorite = [
    ...favorite,
    {
      id,
      type: 'drink',
      nationality: '',
      category: instructions.strCategory,
      alcoholicOrNot: instructions.strAlcoholic,
      name: instructions.strDrink,
      image: instructions.strDrinkThumb,
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
            [id]: inputs,
          },
          meals: {
            ...storage?.meals,
          },
        },
      ));
    };
    setLocalStorage();
  }, [id, inputs, storage]);

  const handleChange = ({ target }) => {
    const { name } = target;
    const newInputs = [...inputs];
    const abc = inputs.some((input) => input === name);
    if (abc) {
      return setInputs(newInputs.filter((input) => input !== name));
    }
    return setInputs([...newInputs, name]);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ instructions.strDrinkThumb }
        alt={ instructions.strDrink }
      />
      <h1 data-testid="recipe-title">{instructions.strDrink}</h1>
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
          src={ ValidationFaforite ? blackHeartIcon : FavIcon }
          alt="Share Button"
          data-testid="favorite-btn"
        />
      </button>
      {
        useUrlPage && (<p>Link copied!</p>)
      }
      <p data-testid="recipe-category">{instructions.strAlcoholic}</p>
      <div>
        {ingredients && ingredients.map(({ theIngredients, theMeasures }, index) => (
          <div key={ index }>
            <label htmlFor={ theIngredients } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                name={ theIngredients }
                checked={ inputs.some((input) => input === theIngredients) }
                value={ theIngredients }
                id={ theIngredients }
                onChange={ (e) => {
                  handleChange(e);
                } }
              />
              {/* {inputs && inputs.some((input) => input === theIngredients) ? (
                <s>
                  {`${theIngredients} ${theMeasures === null ? '' : theMeasures}`}
                </s>
              )
                : `${theIngredients}
                ${theMeasures === null ? '' : theMeasures}`} */}
              <InputsProgress
                theMeasures={ theMeasures }
                inputs={ inputs }
                theIngredients={ theIngredients }
              />
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

InProgressDrink.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.string).isRequired,
}.isRequired;

export default InProgressDrink;
