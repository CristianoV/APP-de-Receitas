const INITIAL_STATE = {
  input: '',
  search: '',
  Receitas: [],
};

const reducerHeader = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_INPUT_SEARCH':
    return { ...state, input: action.payload };
  case 'SET_SEARCH':
    return { ...state, search: action.payload };
  case 'SET_INGREDIENTS_FOODS':
    return { ...state, Receitas: action.payload.meals };
  case 'SET_INGREDIENTS_DRINKS':
    return { ...state, Receitas: action.payload.drinks };
  default:
    return state;
  }
};

export default reducerHeader;
