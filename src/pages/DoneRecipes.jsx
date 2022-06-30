import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { handleShare } from '../utils/useFunctions';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [recipes, setRecipes] = useState(doneRecipes || []);
  const [useUrlPage, setUrlPage] = useState(false);

  const setRecipesCategory = ({ target }) => {
    const { name } = target;
    if (name === 'All') {
      setRecipes(doneRecipes);
    }
    if (name === 'Food') {
      const filterRecipes = doneRecipes.filter((recipe) => recipe.type === 'food');
      setRecipes(filterRecipes);
    } if (name === 'Drink') {
      const filterRecipes = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setRecipes(filterRecipes);
    }
  };

  console.log(recipes);
  return (
    <div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          name="All"
          onClick={ (e) => setRecipesCategory(e) }
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          name="Food"
          type="button"
          onClick={ (e) => setRecipesCategory(e) }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          name="Drink"
          type="button"
          onClick={ (e) => setRecipesCategory(e) }
        >
          Drink
        </button>
      </div>
      <div>
        {recipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '100%' } }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {
                recipe.type === 'food' ? `${recipe.nationality} - ${recipe.category}`
                  : recipe.alcoholicOrNot
              }
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
              onClick={ () => {
                const urlPage = `${global.location.origin}/${recipe.type}s/${recipe.id}`;
                handleShare(urlPage, setUrlPage);
              } }
            >
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt={ `icon share ${recipe.name}` }
              />
            </button>
            {
              useUrlPage && (<p>Link copied!</p>)
            }
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
