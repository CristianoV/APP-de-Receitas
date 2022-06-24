import { combineReducers } from 'redux';
import reducerHeader from './reducerHeader';
import reducerMainPage from './reducerMainPage';

const rootReducer = combineReducers({ reducerHeader, reducerMainPage });

export default rootReducer;
