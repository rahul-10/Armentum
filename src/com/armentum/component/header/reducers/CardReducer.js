import {
    CARD_QUANTITY,
} from '../actions/types';

const INITIAL_STATE = {
    _totalCard : 0,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARD_QUANTITY:
     const  _totalCard = state._totalCard;
    // console.log(_totalCard);
      return { ...state, _totalCard: (_totalCard  + action.payload) };
    default:
      return state;
  }
};
