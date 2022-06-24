import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actionCleanFilterCAtegory } from '../redux/action/mainPageAction';

function Card() {
  const Receitas = useSelector((state) => state.reducerHeader.Receitas);
  const foodsCategory = useSelector((state) => state.reducerMainPage.ReceitasFiltradas);
  const location = useLocation();
  const MAX_INDEX_CARD = 12;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCleanFilterCAtegory());
  }, [location.pathname, dispatch]);
  return (
    <div>
      { foodsCategory && location.pathname === '/drinks'
      && foodsCategory.map((receitas, index) => (
        <div key={ index }>
          {index < MAX_INDEX_CARD && (
            <div data-testid={ `${index}-recipe-card` }>
              <h1 data-testid={ `${index}-card-name` }>{receitas.strDrink}</h1>
              <img
                src={ receitas.strDrinkThumb }
                alt=""
                data-testid={ `${index}-card-img` }
              />
            </div>
          )}
        </div>
      ))}
      { Receitas && location.pathname === '/drinks' && foodsCategory
       && Receitas.map((receitas, index) => (
         <div key={ index }>
           {index < MAX_INDEX_CARD && (
             <div data-testid={ `${index}-recipe-card` }>
               <h1 data-testid={ `${index}-card-name` }>{receitas.strDrink}</h1>
               <img
                 src={ receitas.strDrinkThumb }
                 alt=""
                 data-testid={ `${index}-card-img` }
               />
             </div>
           )}
         </div>
       ))}
      { foodsCategory && location.pathname === '/foods'
      && foodsCategory.map((receitas, index) => (
        <div key={ index }>
          {index < MAX_INDEX_CARD && (
            <div data-testid={ `${index}-recipe-card` }>
              <h1 data-testid={ `${index}-card-name` }>{receitas.strMeal}</h1>
              <img
                src={ receitas.strMealThumb }
                alt=""
                data-testid={ `${index}-card-img` }
              />
            </div>
          )}
        </div>
      ))}
      { Receitas && location.pathname === '/foods' && foodsCategory
       && Receitas.map((receitas, index) => (
         <div key={ index }>
           {index < MAX_INDEX_CARD && (
             <div data-testid={ `${index}-recipe-card` }>
               <h1 data-testid={ `${index}-card-name` }>{receitas.strMeal}</h1>
               <img
                 src={ receitas.strMealThumb }
                 alt=""
                 data-testid={ `${index}-card-img` }
               />
             </div>
           )}
         </div>
       ))}
    </div>
  );
}

export default Card;
