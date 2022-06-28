import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { handleIngredients } from '../utils/useFunctions';

function InProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const recipesItens = localStorage.getItem('inProgressRecipes');
  const recipes = localStorage.getItem('doneRecipes');
  const { id } = useParams();
  const { pathname } = useLocation();
  const location = pathname.split('/');
  const page = location[1];

  useEffect(() => {
    if (recipesItens && recipes) {
      if (page === 'drinks') {
        const recipesSet = recipesItens.map((item) => item === 'cocktails');
        const recipesSet2 = recipesSet.filter((item) => item === id);
        setIngredients(recipesSet2);
        const instruction = recipes.filter((item) => item.id === id);
        setInstructions(instruction);
      } else if (page === 'foods') {
        const recipesSet = recipesItens.map((item) => item === 'meals');
        const recipesSet2 = recipesSet.filter((item) => item === id);
        setIngredients(recipesSet2);
        const instruction = recipes.filter((item) => item.id === id);
        setInstructions(instruction);
      }
    }
  }, []);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ instructions.image }
        alt={ instructions.name }
      />
      <h1 data-testid="recipe-title">{instructions.name}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{instructions.category}</p>
      <div>
        {ingredients.map((theIngredients, index) => (
          <div key={ index }>
            <label htmlFor={ theIngredients } data-testid={ `${index}-ingredient-step` }>
              <input
                type="radio"
                name="teste"
                value={ theIngredients }
                id={ theIngredients }
              />
              { theIngredients }
            </label>
          </div>
        ))}
      </div>
      <p data-testid="instructions">Instrução</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default InProgress;
