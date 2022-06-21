import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState(false);

  const handleFilter = ({ target }) => {
    const { value } = target;
    setFilter(value);
  };
  const buttonSearch = () => {
    if (search) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  return (
    <header>
      <Link to="/profile">
        <img src={ profileIcon } alt="profile icon" />
      </Link>
      <h1>
        TrybeTeste
      </h1>
      <div>
        <button type="button" onClick={ () => buttonSearch() }>
          <img src={ searchIcon } alt="profile icon" />
        </button>
        {search && (<input
          type="text"
          name=""
          id=""
          value={ filter }
          onChange={ handleFilter }
        />)}
      </div>
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.shape(
    { pathname: PropTypes.string },
  ).isRequired,
};

export default Header;
