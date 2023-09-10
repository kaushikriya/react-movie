import { useMemo, useState } from "react";
import { useGetMovies } from "../../hooks/useGetMovies";
import { useSearchMovies } from "../../hooks/useSearchMovies/useSearchMovies";
import { Movie } from "../../interfaces/movie";
import { MovieCard } from "../MovieCard/MovieCard";
import SearchBar from "../SearchBar/SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePagination } from "../../hooks/usePagination/usePagination";

export const MovieLanding = () => {
  const [page, setPage] = useState<number>(1);
  const { data: movies } = useGetMovies(page);
  const [searchInput, setSearchInput] = useState<string | undefined>();

  const { data: searchMovies } = useSearchMovies(searchInput);

  const handleSearch = (value: string | undefined) => {
    setSearchInput(value);
  };

  const paginatedMovies = usePagination(movies);

  const finalMovies = searchInput ? searchMovies : paginatedMovies;

  return (
    <div className="w-full ">
      <SearchBar value={searchInput} handleChange={handleSearch} />
      <InfiniteScroll
        dataLength={finalMovies?.length ?? 0}
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid md:grid-cols-3 gap-2 grid-cols-1 lg:grid-cols-5">
          {finalMovies && finalMovies.length > 0
            ? finalMovies.map((movie: Partial<Movie>, index: number) => (
                <div className="flex justify-center" key={index}>
                  <MovieCard movie={movie} />
                </div>
              ))
            : null}
        </div>
      </InfiniteScroll>
    </div>
  );
};
