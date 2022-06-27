const INITIAL_STATE = {};

const reducerDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_DETAILS_FOODS':
    return { ...state, details: action.payload };
  case 'SET_DETAILS_DRINKS':
    return { ...state, details: action.payload };
  default:
    return state;
  }
};

export default reducerDetails;
