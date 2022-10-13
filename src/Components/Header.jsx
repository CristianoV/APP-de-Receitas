import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdPerson } from 'react-icons/io';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInputSearch,
  setReceitas, setSearchHeader,
  setNome, setLetra, setDrinks,
  setDrinksNome, setDrinksLetra } from '../redux/action/headerAction';
import { actionCleanFilterCAtegory,
  setDrinksMainPage,
  setFoodsMainPage } from '../redux/action/mainPageAction';
import style from './CSS/Header.module.css';

function Header() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState(false);
  const [inputFilter, setInputFilter] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const url = location.pathname.split('/')[1];
  const urls = location.pathname.split('/');
  const Receitas = useSelector((state) => state.reducerHeader.Receitas);
  const history = useHistory();

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

  const setInputReduxFoods = () => {
    dispatch(actionCleanFilterCAtegory());
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

  const setInputReduxDrinks = () => {
    dispatch(actionCleanFilterCAtegory());
    switch (inputFilter) {
    case 'Ingredientes':
      return dispatch(setDrinks(filter));
    case 'Letra':
      return dispatch(setDrinksLetra(filter));
    case 'Nome':
      return dispatch(setDrinksNome(filter));
    default:
      return null;
    }
  };

  const setInputRedux = () => {
    dispatch(setInputSearch(inputFilter));
    dispatch(setSearchHeader(filter));
    const { pathname } = location;
    if (pathname === '/foods') {
      setInputReduxFoods();
    } if (pathname === '/drinks') {
      setInputReduxDrinks();
    }
  };

  useEffect(() => {
    if (Receitas !== null) {
      if (Receitas.length === 1 && Receitas[0].idMeal) {
        history.push(`/foods/${Receitas[0].idMeal}`);
      }
      if (Receitas.length === 1 && Receitas[0].idDrink) {
        history.push(`/drinks/${Receitas[0].idDrink}`);
      }
    }
  },
  [Receitas, history, location.pathname]);

  useEffect(() => {
    if (Receitas === null) {
      if (location.pathname === '/foods') {
        dispatch(setFoodsMainPage());
      } else if (location.pathname === '/drinks') {
        dispatch(setDrinksMainPage());
      }
    }
  }, [dispatch, location.pathname, Receitas]);

  return (
    <div>
      { location.pathname !== '/'
      && (
        <div>
          { filter.length > 1 && inputFilter === 'Letra'
           && global.alert('Your search must have only 1 (one) character')}
          { Receitas === null
           && (global.alert('Sorry, we haven\'t found any recipes for these filters.')
           )}
          <header className={ style.container }>
            <Link to={ `/${url}` }>
              <h1 data-testid="page-title">
                {url[0].toUpperCase() + url.slice(1).toLowerCase()}
              </h1>
            </Link>
            <div>
              {location.pathname !== '/explore' && !urls[2] && (
                <button
                  type="button"
                  style={ { border: 'none', background: 'none' } }
                  onClick={ () => buttonSearch() }
                >
                  <BsSearch />
                </button>
              )}
              <Link to="/profile">
                <IoMdPerson />
              </Link>
            </div>
          </header>
          <div className={ style.containerInput }>
            {search && location.pathname !== '/explore'
             && (
               <>
                 <input
                   type="text"
                   name=""
                   data-testid="search-input"
                   className={ style.input }
                   placeholder="Search"
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
                 </form>
                 <button
                   type="button"
                   data-testid="exec-search-btn"
                   onClick={ () => setInputRedux() }
                 >
                   Busca
                 </button>
               </>)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
