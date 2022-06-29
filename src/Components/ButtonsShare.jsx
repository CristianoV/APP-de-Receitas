import React from 'react';
import propTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import FavIcon from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import { handleFavorite, handleShare } from '../utils/useFunctions';

function ButtonFavorite({ setFavorite, ValidationFaforite,
  AddFavorite, urlPageFormatado, setUrlPage, RemoveFavorite }) {
  const validation = () => {
    if (ValidationFaforite) {
      setFavorite(RemoveFavorite);
      return RemoveFavorite;
    }
    setFavorite(AddFavorite);
    return AddFavorite;
  };
  return (
    <div>
      <button
        type="button"
        onClick={ () => handleShare(urlPageFormatado, setUrlPage) }
      >
        <img
          src={ ShareIcon }
          alt="Share Button"
          data-testid="share-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => handleFavorite(validation()) }
      >
        <img
          src={ ValidationFaforite ? blackHeartIcon : FavIcon }
          alt="Share Button"
          data-testid="favorite-btn"
        />
      </button>
    </div>);
}

ButtonFavorite.propTypes = {
  setFavorite: propTypes.func.isRequired,
  ValidationFaforite: propTypes.bool.isRequired,
  AddFavorite: propTypes.string.isRequired,
  urlPageFormatado: propTypes.string.isRequired,
  setUrlPage: propTypes.func.isRequired,
  RemoveFavorite: propTypes.string.isRequired,
};

export default ButtonFavorite;
