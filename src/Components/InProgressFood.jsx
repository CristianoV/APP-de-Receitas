import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

function InProgressFood({ ingredients, instructions }) {
  const [inputs, setInputs] = useState([]);
  const recipe = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    if (ingredients) {
      const input = ingredients.map(() => false);
      setInputs(input);
    }
  },
  [ingredients]);

  // useEffect(() => {
  //   if (recipe > 0) {
  //     localStorage.setItem('inProgressRecipes', JSON.stringify(
  //       { ...recipe, meals: recipe.meals, [instructions.idMeal]: inputs },
  //     ));
  //   } else {
  //     localStorage.setItem('inProgressRecipes', JSON.stringify({
  //       meals: {
  //         [instructions.idMeal]: inputs,
  //       },
  //     }));
  //   }
  // },
  // [inputs, instructions, recipe]);

  useEffect(() => {
    console.log(recipe.meals);
    if (recipe.meals.length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        // [{ meals: { ...recipe.meals }, [instructions.idMeal]: inputs }],
        [...recipe, { meals: [recipe.meals], [instructions.idMeal]: inputs }],
      ));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        {
          cocktails: {
          },
          meals: {
            [instructions.idMeal]: inputs,
          },
        },
      ));
    }
  },
  [inputs, instructions, recipe]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ instructions.strMealThumb }
        alt={ instructions.strMeal }
      />
      <h1 data-testid="recipe-title">{instructions.strMeal}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{instructions.strCategory}</p>
      <div>
        {ingredients.map(({ theIngredients, theMeasures }, index) => (
          <div key={ index }>
            <label htmlFor={ theIngredients } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                name="teste"
                value={ theIngredients }
                id={ theIngredients }
                onChange={ () => {
                  setInputs(inputs.map((item, i) => (i === index ? !item : item)));
                } }
              />
              {inputs[index] === false ? `${theIngredients} 
              ${theMeasures === null ? '' : theMeasures}`
                : (
                  <s>
                    {`${theIngredients} ${theMeasures === null ? '' : theMeasures}`}
                  </s>
                )}
            </label>
          </div>
        ))}
      </div>
      <p data-testid="instructions">{instructions.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>);
}

InProgressFood.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.string).isRequired,
}.isRequired;

export default InProgressFood;
