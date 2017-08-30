import { combineReducers } from 'redux';
import CardReducer from './component/header/reducers/CardReducer';

export default combineReducers({
  object: CardReducer
});
