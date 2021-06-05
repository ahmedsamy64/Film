import { filmService } from './../service';
import { filmConstants } from './../constants/film.constants';

export const filmActions = {
  getPopularFilms,
  getFilmCredits,
  getFilmKeywords,
  getFilmDetails
};

function getPopularFilms(currentTab) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return filmService
        .getPopularFilms(currentTab)
        .then(response => {
          dispatch({
            type: filmConstants.SET_FILMS,
            data: response.data.results
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

function getFilmCredits(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return filmService
        .getFilmCredits(id)
        .then(response => {
          dispatch({
            type: filmConstants.SET_FILM_CREDITS,
            data: response.data.cast
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

function getFilmKeywords(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return filmService
        .getFilmKeywords(id)
        .then(response => {
          dispatch({
            type: filmConstants.SET_FILM_KEYWORDS,
            data: response.data.keywords
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

function getFilmDetails(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return filmService
        .getFilmDetails(id)
        .then(response => {
          dispatch({
            type: filmConstants.SET_FILM_DETAILS,
            data: response.data
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}