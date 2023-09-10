import React from "react";
import { useSelector } from "react-redux";
import { useMovieDetails } from "../../hooks/useMovieDetails/useMovieDetails";
import { getMediaUrl } from "../../utils/media";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { Movie } from "../../interfaces/movie";
import { useRouter } from "next/router";

export const MovieDetails = () => {
  const router = useRouter();
  const selectedMovie = useSelector(
    (state: { selectedMovie: Movie | null }) => state.selectedMovie
  );

  const { data: movieDetails } = useMovieDetails(selectedMovie?.movieId);

  if (!movieDetails) return null;

  const movieCastLength =
    movieDetails.cast && movieDetails.cast.length > 0
      ? movieDetails.cast.length
      : 0;

  return (
    <div className="whitespace-normal w-full items-center flex-wrap">
      <div className="w-full h-15 flex flex-row justify-between items-center p-3 border border-gray-300 shadow-md">
        <p className="text-lg font-semibold hover:cursor-pointer">
          Movie Details
        </p>
        <HomeSharpIcon onClick={() => router.push("/")} className="h-8 w-8" />
      </div>
      <div className="m-3 grid grid-cols-1 md:grid-cols-6">
        <div className="w-[100%] col-span-1">
          <img
            src={getMediaUrl(movieDetails.media)}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="w-full md:mx-4 col-span-5">
          <div className="flex gap-2 items-center">
            <p className="text-xl font-semibold">{movieDetails.title}</p>
            <p className="text-md text-slate-400">
              ({movieDetails.rating.toFixed(2)})
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p>{movieDetails.year}</p>
            <p className="divider-vertical-text">|</p>
            <p>
              {Math.floor(
                movieDetails.length && movieDetails.length > 0
                  ? movieDetails?.length / 60
                  : 0
              ).toString() +
                "h" +
                " " +
                (movieDetails.length && movieDetails.length > 0
                  ? movieDetails?.length % 60
                  : 0
                ).toString() +
                "m"}
            </p>
            <p className="divider-vertical-text">|</p>
            <p>{movieDetails.director}</p>
          </div>
          <div className="w-full mt-2 text-sm flex-wrap">
            <div className="flex flex-row flex-wrap">
              <p className="text-sm font-semibold mr-1">Cast:</p>
              {movieDetails.cast &&
                movieDetails.cast.map((actor: string, index: number) => (
                  <React.Fragment key={index}>
                    <p className="text-sm whitespace-nowrap">{actor}</p>
                    {index !== movieCastLength - 1 && <p>,</p>}
                  </React.Fragment>
                ))}
            </div>
            <div className="flex flex-row gap-1 flex-wrap">
              <p className="text-sm font-semibold whitespace-nowrap">
                Description:
              </p>
              <p>{movieDetails.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
