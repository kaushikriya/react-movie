export interface Movie {
  movieId: number;
  title: string;
  rating: number;
  media: string;
  description: string;
  year?: number;
  length?: number;
  director?: string;
  cast?: string[];
}
