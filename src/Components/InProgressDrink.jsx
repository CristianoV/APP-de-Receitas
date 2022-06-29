import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import FavIcon from '../images/whiteHeartIcon.svg';
import { handleShare, handleFavorite }
from '../utils/useFunctions';

function InProgressDrink({ ingredients, instructions }) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { id } = useParams();
  const [inputs, setInputs] = useState(storage?.cocktails?.[id] || []);
  const [useUrlPage, setUrlPage] = useState(false);
  const { pathname } = useLocation();
  const urlPage = `${global.location.origin}${pathname}`;
  const urlPageFormatado = urlPage.replace(urlPage,
    `${global.location.origin}/drinks/${id}`);

  // const setLocalStorage = () => {
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(
  //     {
  //       cocktails: {
  //         ...storage?.cocktails,
  //         [id]: inputs,
  //       },
  //       meals: {
  //         ...storage?.meals,
  //       },
  //     },
  //   ));
  // };

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
      setInputs(newInputs.filter((input) => input !== name));
    } else {
      setInputs([...newInputs, name]);
    }
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
      <p data-testid="recipe-category">{instructions.strAlcoholic}</p>
      <div>
        {ingredients.map(({ theIngredients, theMeasures }, index) => (
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
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>);
}

InProgressDrink.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.string).isRequired,
}.isRequired;

export default InProgressDrink;
