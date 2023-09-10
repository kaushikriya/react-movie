import { Movie } from "../../interfaces/movie";

export const setSelectedMovie = (movie: Partial<Movie> | null) => ({
  type: "SET_SELECTED_MOVIE",
  payload: movie,
});
