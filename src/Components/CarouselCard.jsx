import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Carousel.css';

export default function CarouselCard() {
  const [useRecomend, setRecomend] = useState('');
  const { pathname } = useLocation();
  useEffect(() => {
    async function getRecomendation() {
      if (pathname.includes('drinks')) {
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const { meals } = await (await fetch(url)).json();
        setRecomend(meals);
      }
      if (pathname.includes('foods')) {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const { drinks } = await (await fetch(url)).json();
        setRecomend(drinks);
      }
    }
    getRecomendation();
  }, [pathname]);
  console.log(useRecomend);
  const num = 6;

  return (
    <div className="holster">
      <h1>Recomendation</h1>
      <div className="container x mandatory-scroll-snapping" dir="ltr">
        {useRecomend.length !== 0 && (
          useRecomend.slice(0, num).map((recipe, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <p data-testid={ `${index}-recomendation-title` }>
                { pathname.includes('drinks') ? recipe.strMeal : recipe.strDrink}
              </p>
              <img src={ recipe.strDrinkThumb } alt="" id="img" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
