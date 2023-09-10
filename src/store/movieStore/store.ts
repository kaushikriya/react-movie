import { createStore } from "redux";
import { Movie } from "../../interfaces/movie";

interface MovieState {
  selectedMovie: Movie | null;
}

const initialState: MovieState = {
  selectedMovie: null,
};

type Action = { type: "SET_SELECTED_MOVIE"; payload: Movie | null };

const rootReducer = (state = initialState, action: Action): MovieState => {
  switch (action.type) {
    case "SET_SELECTED_MOVIE":
      return { ...state, selectedMovie: action.payload };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
