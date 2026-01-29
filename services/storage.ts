import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_MOVIES_KEY = "saved_movies";

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

// Function to get all saved movies
export const getSavedMovies = async (): Promise<Movie[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to fetch saved movies.", e);
    return [];
  }
};

// Function to save a movie
export const saveMovie = async (movie: Movie): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    const isAlreadySaved = savedMovies.some((m) => m.id === movie.id);
    if (!isAlreadySaved) {
      const newSavedMovies = [...savedMovies, movie];
      const jsonValue = JSON.stringify(newSavedMovies);
      await AsyncStorage.setItem(SAVED_MOVIES_KEY, jsonValue);
    }
    return true;
  } catch (e) {
    console.error("Failed to save movie.", e);
    return false;
  }
};

// Function to remove a movie by its ID
export const removeMovie = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    const newSavedMovies = savedMovies.filter((m) => m.id !== movieId);
    const jsonValue = JSON.stringify(newSavedMovies);
    await AsyncStorage.setItem(SAVED_MOVIES_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error("Failed to remove movie.", e);
    return false;
  }
};

// Function to check if a movie is saved
export const isMovieSaved = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    return savedMovies.some((m) => m.id === movieId);
  } catch (e) {
    console.error("Failed to check if movie is saved.", e);
    return false;
  }
};
