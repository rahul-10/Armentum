import {
  CARD_QUANTITY
} from './types';

export const addCard = (no) => ({
    type: CARD_QUANTITY,
    payload: no
  });
