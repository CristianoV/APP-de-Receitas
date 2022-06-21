import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { setInputSearch,
  setReceitas, setSearchHeader,
  setNome, setLetra } from '../redux/action/headerAction';

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
    const { inputSearchDispatch, SearchDispatch,
      SearchReceitas, SearchNome, SearchLetra } = props;
    inputSearchDispatch(inputFilter);
    SearchDispatch(filter);
    switch (inputFilter) {
    case 'Ingredientes':
      return SearchReceitas(filter);
    case 'Letra':
      return SearchLetra(filter);
    case 'Nome':
      return SearchNome(filter);
    default:
      return null;
    }
  };

  return (
    <>
      { filter.length > 1 && inputFilter === 'Letra'
      && global.alert('Your search must have only 1 (one) character')}
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
  SearchReceitas: (search) => dispatch(setReceitas(search)),
  SearchNome: (search) => dispatch(setNome(search)),
  SearchLetra: (search) => dispatch(setLetra(search)),
});

Header.propTypes = {
  location: PropTypes.shape(
    { pathname: PropTypes.string },
  ).isRequired,
  inputSearchDispatch: PropTypes.func.isRequired,
  SearchDispatch: PropTypes.func.isRequired,
  SearchReceitas: PropTypes.func.isRequired,
  SearchNome: PropTypes.func.isRequired,
  SearchLetra: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
