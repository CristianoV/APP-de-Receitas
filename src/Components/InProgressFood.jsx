import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory, useLocation, useParams } from 'react-router-dom';
// import ShareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import FavIcon from '../images/whiteHeartIcon.svg';
// import { handleShare }
// from '../utils/useFunctions';
import InputsProgress from './InputsProgress';
import ButtonFavorite from './ButtonsShare';

function InProgressFood({ ingredients, instructions }) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favorito = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  const doneRecipesLocal = done || [];
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

  const doneRecipes = [
    ...doneRecipesLocal, {
      id,
      type: 'food',
      nationality: instructions.strArea,
      category: instructions.strCategory,
      alcoholicOrNot: '',
      name: instructions.strMeal,
      image: instructions.strMealThumb,
      doneDate: Date(),
      tags: instructions.strTags,
    }];

  const RemoveFavorite = favorite.filter((item) => item.id !== id);

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
      <ButtonFavorite
        urlPageFormatado={ urlPageFormatado }
        setUrlPage={ setUrlPage }
        setFavorite={ setFavorite }
        ValidationFaforite={ ValidationFaforite }
        AddFavorite={ AddFavorite }
        RemoveFavorite={ RemoveFavorite }
      />
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
          localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
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
