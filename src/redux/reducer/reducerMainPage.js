const INITIAL_STATE = {
  ReceitasFiltradas: [],
};

const reducerMainPage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_FILTER_CATEGORY_FOODS':
    return { ...state, ReceitasFiltradas: action.payload.meals };
  case 'SET_FILTER_CATEGORY_DRINKS':
    return { ...state, ReceitasFiltradas: action.payload.drinks };
  case 'SET_CLEAN_CATEGORY':
    return { ...state, ReceitasFiltradas: action.payload };
  default:
    return state;
  }
};

export default reducerMainPage;
