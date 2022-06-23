const INITIAL_STATE = {
  Receitas: [],
};

const reducerMainPage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_FILTER_CATEGORY':
    return { ...state, Receitas: action.payload };
  default:
    return state;
  }
};

export default reducerMainPage;
