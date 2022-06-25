// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import { actionCleanFilterCAtegory } from '../redux/action/mainPageAction';
import React from 'react';
import { useSelector } from 'react-redux';

export default function CardsDetails() {
  const Receitas = useSelector((state) => state.reducerHeader.Receitas);
  console.log('receitas', Receitas);
  const foodsCategory = useSelector((state) => state.reducerMainPage.ReceitasFiltradas);
  console.log('foodsCategory', foodsCategory);

  // const { pathname } = useLocation();
  // const MAX_INDEX_CARD = 12;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(actionCleanFilterCAtegory());
  // }, [pathname, dispatch]);

  return (
    <div>
      meh
    </div>
  );
}
