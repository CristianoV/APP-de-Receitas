import React from 'react';
import propTypes from 'prop-types';

function InProgressDrink({ inputs, theIngredients, theMeasures }) {
  return (
    <div>
      {inputs && inputs.some((input) => input === theIngredients) ? (
        <s>
          {`${theIngredients} ${theMeasures === null ? '' : theMeasures}`}
        </s>
      )
        : `${theIngredients}${theMeasures === null ? '' : theMeasures}`}
    </div>
  );
}

InProgressDrink.propTypes = {
  inputs: propTypes.arrayOf(propTypes.string).isRequired,
  theIngredients: propTypes.string.isRequired,
  theMeasures: propTypes.string.isRequired,
};

export default InProgressDrink;
