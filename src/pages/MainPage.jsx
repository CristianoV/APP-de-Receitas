import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Card from '../Components/Card';
import { setDrinksMainPage, setFoodsMainPage } from '../redux/action/mainPageAction';

function Mainpage() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log('teste');
    if (location.pathname === '/foods') {
      dispatch(setFoodsMainPage());
    } else {
      dispatch(setDrinksMainPage());
    }
  }, [dispatch, location.pathname]);
  return (
    <Card />
  );
}

export default Mainpage;
