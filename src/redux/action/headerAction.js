export const setInputSearch = (payload) => ({
  type: 'SET_INPUT_SEARCH',
  payload,
});

export const setSearchHeader = (payload) => ({
  type: 'SET_SEARCH',
  payload,
});

export const actionReceits = (payload) => ({
  type: 'SET_INGREDIENTS',
  payload,
});

export const setReceitas = (ingrediente) => async (dispatch) => {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  );
  const json = await request.json();
  dispatch(actionReceits(json));
};

export const setNome = (nome) => async (dispatch) => {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`,
  );
  const json = await request.json();
  dispatch(actionReceits(json));
};

export const setLetra = (letra) => async (dispatch) => {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letra}`,
  );
  const json = await request.json();
  dispatch(actionReceits(json));
};

export const setDrinks = (ingrediente) => async (dispatch) => {
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  );
  const json = await request.json();
  dispatch(actionReceits(json));
};

export const setDrinksNome = (nome) => async (dispatch) => {
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`,
  );
  const json = await request.json();
  dispatch(actionReceits(json));
};

export const setDrinksLetra = (letra) => async (dispatch) => {
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`,
  );
  const json = await request.json();
  dispatch(actionReceits(json));
};
