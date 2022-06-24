import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer';

export default function ExploreDrinks() {
  const history = useHistory();

  return (
    <section>
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => console.log('surprise!') }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </section>
  );
}
