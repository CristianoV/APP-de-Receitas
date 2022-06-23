import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Card from '../Components/Card';
import { setDrinksMainPage,
  setFoodsMainPage,
  actionFilterCAtegory } from '../redux/action/mainPageAction';

function Mainpage() {
  const drinks = useSelector((state) => state.reducerHeader.drinks);
  const foods = useSelector((state) => state.reducerHeader.meals);
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
  }, []);

  useEffect(() => {
    if (location.pathname === '/foods') {
      dispatch(setFoodsMainPage());
    } else {
      dispatch(setDrinksMainPage());
    }
  }, [dispatch, location.pathname]);

  const filterClick = (cat) => {
    if (location.pathname === '/foods') {
      const filted = foods.filter((food) => (
        food.strCategory === cat
      ));
      dispatch(actionFilterCAtegory(filted));
    } else {
      const filted = drinks.filter((drink) => (drink.strCategory === cat));
      dispatch(actionFilterCAtegory(filted));
    }
  };

  return (
    <div>
      {
        category && category.map((cat, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${cat}-category-filter` }
            name={ cat }
            onClick={ () => filterClick(cat) }
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
