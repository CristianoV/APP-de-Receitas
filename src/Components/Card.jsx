import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { actionCleanFilterCAtegory } from '../redux/action/mainPageAction';

function Card() {
  const Receitas = useSelector((state) => state.reducerHeader.Receitas);
  const foodsCategory = useSelector((state) => state.reducerMainPage.ReceitasFiltradas);
  const { pathname } = useLocation();
  const MAX_INDEX_CARD = 12;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCleanFilterCAtegory());
  }, [pathname, dispatch]);
  return (
    <div>
      { foodsCategory
      && foodsCategory.map((receitas, index) => (
        <div key={ index }>
          {index < MAX_INDEX_CARD && (
            <div data-testid={ `${index}-recipe-card` }>
              <Link
                to={ pathname === '/foods' ? `/foods/${receitas.idMeal}`
                  : `/drinks/${receitas.idDrink}` }
              >
                <h1 data-testid={ `${index}-card-name` }>
                  { pathname === '/foods' ? receitas.strMeal : receitas.strDrink}
                </h1>
                <img
                  src={ pathname === '/foods'
                    ? receitas.strMealThumb : receitas.strDrinkThumb }
                  alt=""
                  data-testid={ `${index}-card-img` }
                />
              </Link>
            </div>
          )}
        </div>
      ))}
      { Receitas && !foodsCategory.length
       && Receitas.map((receitas, index) => (
         <div key={ index }>
           {index < MAX_INDEX_CARD && (
             <Link
               to={ pathname === '/foods' ? `/foods/${receitas.idMeal}`
                 : `/drinks/${receitas.idDrink}` }
             >
               <div data-testid={ `${index}-recipe-card` }>
                 <h1 data-testid={ `${index}-card-name` }>
                   { pathname === '/foods' ? receitas.strMeal : receitas.strDrink}
                 </h1>
                 <img
                   src={ pathname === '/foods'
                     ? receitas.strMealThumb : receitas.strDrinkThumb }
                   alt=""
                   data-testid={ `${index}-card-img` }
                 />
               </div>
             </Link>
           )}
         </div>
       ))}
    </div>
  );
}

export default Card;
