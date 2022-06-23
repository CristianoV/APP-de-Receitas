export const actionReceitsMainPage = (payload) => ({
  type: 'SET_INGREDIENTS',
  payload,
});

export const setDrinksMainPage = () => async (dispatch) => {
  const request = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  );
  const json = await request.json();
  dispatch(actionReceitsMainPage(json));
};

export const setFoodsMainPage = () => async (dispatch) => {
  const request = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  );
  const json = await request.json();
  dispatch(actionReceitsMainPage(json));
};

export const actionFilterCAtegory = (payload) => ({
  type: 'SET_FILTER_CATEGORY',
  payload,
});

export const actionCleanFilterCAtegory = () => ({
  type: 'SET_FILTER_CATEGORY',
  payload: [],
});
