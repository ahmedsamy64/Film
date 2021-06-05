import axios from 'axios';
import { API_URL } from './../constants/common.constants';

export const filmService = {
  getPopularFilms,
  getFilmCredits,
  getFilmKeywords,
  getFilmDetails
};

function getPopularFilms(currentTab) {
  return axios.get(`${API_URL}/movie/${currentTab}?api_key=4f298a53e552283bee957836a529baec&language=en-US&page=1`).catch();
};


function getFilmCredits(id) {
  return axios.get(`${API_URL}/movie/${id}/credits?api_key=4f298a53e552283bee957836a529baec&language=en-US`).catch();
};

function getFilmKeywords(id) {
  return axios.get(`${API_URL}/movie/${id}/keywords?api_key=4f298a53e552283bee957836a529baec&language=en-US`).catch();
}

function getFilmDetails(id) {
  return axios.get(`${API_URL}/movie/${id}?api_key=4f298a53e552283bee957836a529baec&language=en-US`).catch();
}

