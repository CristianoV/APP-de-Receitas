import React, { useState } from 'react';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [recipes, setRecipes] = useState(doneRecipes || []);
  console.log(recipes);
  return (
    <div>
      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </div>
      <div>
        {recipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
            >
              Share
            </button>
            { recipe.tags.map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>);
}

export default DoneRecipes;
