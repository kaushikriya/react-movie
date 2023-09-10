import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../../interfaces/movie";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie";

export const useMovieDetails = (movieId: number | undefined) => {
  return useQuery({
    queryKey: ["movie_details", movieId],
    queryFn: async () => {
      const detailsResponse = await axios.get(`${BASE_URL}/${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      });

      const creditsResponse = await axios.get(
        `${BASE_URL}/${movieId}/credits`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );

      const movieDetails = detailsResponse.data;
      const credits = creditsResponse.data;

      return { movieDetails, credits };
    },
    select: (response: {
      movieDetails: {
        id: number;
        title: string;
        vote_average: number;
        poster_path: string;
        overview: string;
        release_date: number;
        runtime: number;
      };
      credits: {
        cast: { name: string }[];
        crew: { job: string; name: string }[];
      };
    }) => {
      const { movieDetails, credits } = response;

      const director = credits.crew.find((member) => member.job === "Director");
      const castList = credits.cast.map((member) => member.name);

      const movie: Movie = {
        movieId: movieDetails.id,
        title: movieDetails.title,
        rating: movieDetails.vote_average,
        media: movieDetails.poster_path,
        description: movieDetails.overview,
        year: new Date(movieDetails.release_date).getFullYear(),
        length: movieDetails.runtime,
        director: director ? director.name : "N/A", // Set director or N/A if not found
        cast: castList,
      };

      return movie;
    },
    enabled: !!movieId,
  });
};
