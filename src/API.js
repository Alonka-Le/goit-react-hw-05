import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjQ2YTIwOTM4NTExYmYyOWJiODc5ODk2MjI2ZmE3NCIsIm5iZiI6MTcyMTEzMDMxNC40MjMyNjgsInN1YiI6IjY2OTY1YmNmNDlmYTZmODA3MWQ1ZmM0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DMVyvT7ck686nTQSsEmIiVot2ly6ehOQYwnTD8NGjMs",
  },
};

export const getFilmsApi = async () => {
  const { data } = await axios.get("/trending/movie/day", options);
  return data;
};

export const fetchByFilm = async (query) => {
  const { data } = await axios.get(`/search/movie?query=${query}`, options);
  return data.results;
};

export const getMoviesDetalis = async (moviesId) => {
  const { data } = await axios.get(`movie/${moviesId}`, options);
  return data;
};

export const getMoviesCredits = async (moviesId) => {
  const { data } = await axios.get(`/movie/${moviesId}/credits`, options);
  return data.cast;
};
export const getMoviesReviews = async (moviesId) => {
  const { data } = await axios.get(`/movie/${moviesId}/reviews`, options);
  return data.results;
};
