import Constants from "expo-constants";

const TMDB_API_KEY =
  Constants.expoConfig?.extra?.TMDB_API_KEY || process.env.TMDB_API_KEY;
const TMDB_READ_ACCESS_KEY =
  Constants.expoConfig?.extra?.TMDB_READ_ACCESS_KEY ||
  process.env.TMDB_READ_ACCESS_KEY;

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: TMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_READ_ACCESS_KEY}`,
  },
};

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const getImagePath = (path: string) => {
  return path ? `https://image.tmdb.org/t/p/original${path}` : "";
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  console.log("Endpoint:", endpoint);

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId: number, movieType: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/${movieType}/${movieId}`;
  console.log("endpoint", endpoint);

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const fetchTrendingMoviesAndTvShows = async (url: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/trending/${url}/week`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trending movies: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchNowPlayingMovies = async (url: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/${url}/now_playing`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch now playing movies: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};
