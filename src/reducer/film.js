import {  filmConstants } from './../constants/film.constants';

const INITIAL_STATE = {
    films: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case filmConstants.SET_FILMS:
      return { ...state, films: action.data };
   
      default:
      return state;
  }
}



