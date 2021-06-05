import { filmService } from './../service';

import {
 filmConstants
  } from './../constants/film.constants';
export const filmActions = {
  getPopularFilms
};

function getPopularFilms(currentTab) {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        return filmService
          .getPopularFilms(currentTab)
          .then(response => {
            dispatch({
              type: filmConstants.SET_FILMS,
              data:response.data.results
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    };
  }