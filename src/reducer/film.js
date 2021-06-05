import { filmConstants } from './../constants/film.constants';

const INITIAL_STATE = {
  films: [],
  filmCredits: [],
  filmKeywords: [],
  filmDetails: {}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case filmConstants.SET_FILMS:
      return { ...state, films: action.data };

    case filmConstants.SET_FILM_CREDITS:
      return { ...state, filmCredits: action.data };

    case filmConstants.SET_FILM_KEYWORDS:
      return { ...state, filmKeywords: action.data };

    case filmConstants.SET_FILM_DETAILS:
      return { ...state, filmDetails: action.data };

    default:
      return state;
  }
}



