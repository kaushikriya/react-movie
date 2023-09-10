import { useState } from "react";
import { Movie } from "../../interfaces/movie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../../store/movieStore/actions";
import { getMediaUrl } from "../../utils/media";

export const MovieCard = ({ movie }: { movie: Partial<Movie> }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    dispatch(setSelectedMovie(movie));
    router.push(`/details`);
  };

  return (
    <div
      className={`w-full m-2 rounded-md bg-slate-200 shadow-md whitespace-nowrap overflow-hidden transform transition-transform ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img className="w-full h-[200px]" src={getMediaUrl(movie.media)} alt="" />
      <div className="m-1 flex justify-between">
        <p className="whitespace-normal max-w-[80%] font-bold">{movie.title}</p>
        <p>({movie.rating})</p>
      </div>
      <p className="m-1 truncate">{movie.description}</p>
    </div>
  );
};
