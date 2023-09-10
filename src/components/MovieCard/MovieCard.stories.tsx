import React from "react";
import { Movie } from "../../interfaces/movie";
import { MovieCard } from "./MovieCard";

export default {
  title: "MovieCard",
  component: MovieCard,
  args: {
    movie: {
      id: 123,
      title: "Great movie",
      rating: 6.9,
      description: "This is a movie worth watching",
      media: "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
    },
  },
};

export const Default = (
  args: React.JSX.IntrinsicAttributes & { movie: Partial<Movie> }
) => <MovieCard {...args} />;
