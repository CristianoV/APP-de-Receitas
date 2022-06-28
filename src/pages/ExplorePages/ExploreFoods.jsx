import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer';
import { handleSupriseBtn } from '../../utils/useFunctions';

export default function ExploreFoods() {
  const history = useHistory();

  return (
    <section>
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleSupriseBtn(history) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </section>
  );
}
