import { combineReducers } from 'redux';
import reducerHeader from './reducerHeader';
import reducerMainPage from './reducerMainPage';
import reducerDetails from './reducerDetails';

const rootReducer = combineReducers({ reducerHeader, reducerMainPage, reducerDetails });

export default rootReducer;
