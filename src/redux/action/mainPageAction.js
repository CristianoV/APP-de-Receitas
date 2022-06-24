export const actionReceitsMainPageFoods = (payload) => ({
  type: 'SET_INGREDIENTS_FOODS',
  payload,
});

export const actionReceitsMainPageDrinks = (payload) => ({
  type: 'SET_INGREDIENTS_DRINKS',
  payload,
});

export const setDrinksMainPage = () => async (dispatch) => {
  const request = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  );
  const json = await request.json();
  dispatch(actionReceitsMainPageDrinks(json));
};

export const setFoodsMainPage = () => async (dispatch) => {
  const request = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  );
  const json = await request.json();
  dispatch(actionReceitsMainPageFoods(json));
};

export const actionFilterCAtegoryFoods = (payload) => ({
  type: 'SET_FILTER_CATEGORY_FOODS',
  payload,
});

export const actionFilterCAtegoryDrinks = (payload) => ({
  type: 'SET_FILTER_CATEGORY_DRINKS',
  payload,
});

export const setFoodsCategory = (element) => async (dispatch) => {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${element}`,
  );
  const json = await request.json();
  dispatch(actionFilterCAtegoryFoods(json));
};

export const setDrinksCategory = (element) => async (dispatch) => {
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${element}`,
  );
  const json = await request.json();
  dispatch(actionFilterCAtegoryDrinks(json));
};

export const actionCleanFilterCAtegory = () => ({
  type: 'SET_CLEAN_CATEGORY',
  payload: [],
});
