import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Card from '../Components/Card';
import { setDrinksMainPage,
  setFoodsMainPage, setFoodsCategory,
  setDrinksCategory } from '../redux/action/mainPageAction';

function Mainpage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const catgApi = async () => {
      if (location.pathname === '/foods') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const result = await response.json();
        const rule = 5;
        const filterresult = result.meals.filter((meal, index) => index < rule)
          .map((meal) => meal.strCategory);
        setCategory(filterresult);
      } else if (location.pathname === '/drinks') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const result = await response.json();
        const rule = 5;
        const filterresult = result.drinks.filter((meal, index) => index < rule)
          .map((drink) => drink.strCategory);
        setCategory(filterresult);
      }
    };
    catgApi();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/foods') {
      dispatch(setFoodsMainPage());
    } else {
      dispatch(setDrinksMainPage());
    }
  }, [dispatch, location.pathname]);

  const setRecipesCategory = ({ target }) => {
    const { name } = target;
    console.log(name);
    if (location.pathname === '/foods') {
      return dispatch(setFoodsCategory(name));
    } if (location.pathname === '/drinks') {
      return dispatch(setDrinksCategory(name));
    }
  };

  return (
    <div>
      {
        category && category.map((cat) => (
          <button
            type="button"
            key={ cat }
            data-testid={ `${cat}-category-filter` }
            name={ cat }
            onClick={ (e) => setRecipesCategory(e) }
          >
            {cat}
          </button>
        ))
      }
      <Card />
    </div>
  );
}

export default Mainpage;
