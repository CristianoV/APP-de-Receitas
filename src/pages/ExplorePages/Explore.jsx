import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer';

export default function Explore() {
  // TODO: header nas telas de explore com os ícones certos
  const history = useHistory();

  return (
    <section>
      <div>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>

        <button
          type="button"
          to="/explore-drinks"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </section>
  );
}
