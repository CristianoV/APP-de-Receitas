import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import InputsProgress from './InputsProgress';
import ButtonShare from './ButtonsShare';

function InProgressDrink({ ingredients, instructions }) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favorito = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorite, setFavorite] = useState(favorito || []);
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  const doneRecipesLocal = done || [];
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

  const doneRecipes = [
    ...doneRecipesLocal, {
      id,
      type: 'drink',
      nationality: '',
      category: instructions.strCategory,
      alcoholicOrNot: instructions.strAlcoholic,
      name: instructions.strDrink,
      image: instructions.strDrinkThumb,
      doneDate: Date(),
      tags: instructions.strTags?.split(',') || '',
    }];

  const RemoveFavorite = favorite.filter((item) => item.id !== id);

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
      <ButtonShare
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
          localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
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
