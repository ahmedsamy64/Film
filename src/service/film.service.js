import axios from 'axios';
import { API_URL } from './../constants/common.constants';

export const filmService = {
  getPopularFilms
};

function getPopularFilms(currentTab) {
    return axios
      .get(`${API_URL}/movie/${currentTab}?api_key=4f298a53e552283bee957836a529baec&language=en-US&page=1`)
      .catch();
  }