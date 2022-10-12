import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { actionCleanFilterCAtegory } from '../redux/action/mainPageAction';
import style from './CSS/Cards.module.css';

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
    <div className={ style.container }>
      { foodsCategory
      && foodsCategory.map((receitas, index) => (
        <div key={ index }>
          {index < MAX_INDEX_CARD && (
            <div data-testid={ `${index}-recipe-card` }>
              <Link
                to={ pathname === '/foods' ? `/foods/${receitas.idMeal}`
                  : `/drinks/${receitas.idDrink}` }
              >
                <img
                  src={ pathname === '/foods'
                    ? receitas.strMealThumb : receitas.strDrinkThumb }
                  alt=""
                  data-testid={ `${index}-card-img` }
                  loading="lazy"
                />
                <h1 data-testid={ `${index}-card-name` }>
                  { pathname === '/foods' ? receitas.strMeal : receitas.strDrink}
                </h1>
              </Link>
            </div>
          )}
        </div>
      ))}
      { Receitas && !foodsCategory.length
       && Receitas.map((receitas, index) => (
         <div key={ index }>
           {index < MAX_INDEX_CARD && (
             <div data-testid={ `${index}-recipe-card` }>
               <Link
                 to={ pathname === '/foods' ? `/foods/${receitas.idMeal}`
                   : `/drinks/${receitas.idDrink}` }
               >
                 <img
                   src={ pathname === '/foods'
                     ? receitas.strMealThumb : receitas.strDrinkThumb }
                   alt=""
                   data-testid={ `${index}-card-img` }
                 />
                 <h1 data-testid={ `${index}-card-name` }>
                   { pathname === '/foods' ? receitas.strMeal : receitas.strDrink}
                 </h1>
               </Link>
             </div>
           )}
         </div>
       ))}
    </div>
  );
}

export default Card;
