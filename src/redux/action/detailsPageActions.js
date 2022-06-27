export const actionFoodsDetails = (payload) => ({
  type: 'SET_DETAILS_FOODS',
  payload,
});

export const actionDrinksDetails = (payload) => ({
  type: 'SET_DETAILS_DRINKS',
  payload,
});

export const setFoodsDetails = (id) => async (dispatch) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals } = await (await fetch(url)).json();
  const mealRecipe = meals[0];

  dispatch(actionFoodsDetails(mealRecipe));
};

export const setDrinksDetails = (id) => async (dispatch) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { drinks } = await (await fetch(url)).json();
  const drinkRecipe = drinks[0];

  dispatch(actionDrinksDetails(drinkRecipe));
};
