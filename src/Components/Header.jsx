import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <img src={ profileIcon } alt="profile icon" />
      <h1>
        TrybeTeste
      </h1>
      <img src={ searchIcon } alt="profile icon" />
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.shape(
    { pathname: PropTypes.string },
  ).isRequired,
};

export default Header;
