import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function CarouselCard() {
  const [userRecomend, setRecomend] = useState('');
  const { pathname } = useLocation();
  useEffect(
    () => {
      async function getRecomendation() {
        if (pathname.includes('foods')) {
          const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
          const { meals } = await (await fetch(url)).json();
          setRecomend(meals);
        }
        if (pathname.includes('drinks')) {
          const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
          const { drinks } = await (await fetch(url)).json();
          setRecomend(drinks);
        }
      }
      getRecomendation();
    }, [pathname],
  );
  console.log(userRecomend);
  return (
    <div>CarouselCard</div>
  );
}
