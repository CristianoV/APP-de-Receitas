import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { setInputSearch, setSearchHeader } from '../redux/action/index';

function Header(props) {
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

  const setInputRedux = () => {
    const { inputSearchDispatch, SearchDispatch } = props;
    inputSearchDispatch(inputFilter);
    SearchDispatch(filter);
  };

  useEffect(() => {

  }, [filter]);

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
          onClick={ () => setInputRedux() }
        >
          Busca
        </button>
      </form>

    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  inputSearchDispatch: (input) => dispatch(setInputSearch(input)),
  SearchDispatch: (search) => dispatch(setSearchHeader(search)),

});

Header.propTypes = {
  location: PropTypes.shape(
    { pathname: PropTypes.string },
  ).isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
