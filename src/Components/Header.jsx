import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { setInputSearch,
  setReceitas, setSearchHeader,
  setNome, setLetra } from '../redux/action/headerAction';

function Header() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState(false);
  const [inputFilter, setInputFilter] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const redux = useSelector((state) => state.reducerHeader);
  console.log(redux);
  console.log(location);

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
    dispatch(setInputSearch(inputFilter));
    dispatch(setSearchHeader(filter));
    switch (inputFilter) {
    case 'Ingredientes':
      return dispatch(setReceitas(filter));
    case 'Letra':
      return dispatch(setLetra(filter));
    case 'Nome':
      return dispatch(setNome(filter));
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
        {search && (
          <>
            <input
              type="text"
              name=""
              id=""
              value={ filter }
              onChange={ handleFilter }
            />
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
          </>)}
      </div>
    </>
  );
}

export default Header;
