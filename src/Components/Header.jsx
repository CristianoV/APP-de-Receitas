import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState(false);
  const [inputFilter, setInputFilter] = useState('');

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
  console.log(inputFilter);
  return (
    <>
      <header>
        <Link to="/profile">
          <img src={ profileIcon } alt="profile icon" />
        </Link>
        <h1>
          TrybeTeste
        </h1>
        <div>
          <button
            type="button"
            data-testid="search-input"
            onClick={ () => buttonSearch() }
          >
            <img src={ searchIcon } alt="profile icon" />
          </button>
        </div>
      </header>
      <div>
        {search && (<input
          type="text"
          name=""
          id=""
          value={ filter }
          onChange={ handleFilter }
        />)}
      </div>
      <form action="">
        <label htmlFor="Ingredientes">
          <input
            type="radio"
            name="searchInput"
            id="Ingredientes"
            onClick={ () => setInputFilter('Ingredientes') }
            data-testid="ingredient-search-radio"
          />
          Ingredientes
        </label>
        <label htmlFor="Nome">
          <input
            type="radio"
            name="searchInput"
            id="Nome"
            onClick={ () => setInputFilter('Nome') }
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="Letra">
          <input
            type="radio"
            name="searchInput"
            id="Letra"
            onClick={ () => setInputFilter('Letra') }
            data-testid="first-letter-search-radio"
          />
          Primeira Letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => console.log('teste') }
        >
          Busca
        </button>
      </form>

    </>
  );
}

Header.propTypes = {
  location: PropTypes.shape(
    { pathname: PropTypes.string },
  ).isRequired,
};

export default Header;
