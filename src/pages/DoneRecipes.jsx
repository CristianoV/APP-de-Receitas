import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [recipes, setRecipes] = useState(doneRecipes || []);
  //   const { pathname } = useLocation();

  console.log(recipes);
  return (
    <div>
      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setRecipes('teste') }
          type="button"
        >
          Drinks

        </button>
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
            <p data-testid={ `${index}-horizontal-top-text` }>
              {
                recipe.type === 'food' ? `${recipe.nationality} - ${recipe.category}`
                  : recipe.alcoholicOrNot
              }
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
            >
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt={ `icon share ${recipe.name}` }
              />
            </button>
            { recipe.tags && recipe.tags.map((tag) => (
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
