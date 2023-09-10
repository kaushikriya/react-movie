import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../../interfaces/movie";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const useSearchMovies = (searchKeyword: string | undefined) => {
  return useQuery({
    queryKey: ["search_movies"],
    queryFn: async () => {
      const response = await axios.get(BASE_URL, {
        params: {
          api_key: API_KEY,
          query: searchKeyword,
        },
      });
      return response;
    },
    select: (response: {
      data: {
        results: {
          title: string;
          id: number;
          vote_average: number;
          poster_path: string;
          overview: string;
        }[];
      };
    }) => {
      const movies = response.data.results.map(
        (movie: {
          title: string;
          id: number;
          vote_average: number;
          poster_path: string;
          overview: string;
        }) =>
          ({
            title: movie.title,
            movieId: movie.id,
            rating: movie.vote_average,
            media: movie.poster_path,
            description: movie.overview,
          } as Movie)
      );
      return movies;
    },
    enabled: !!searchKeyword,
  });
};
