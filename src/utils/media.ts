export const getMediaUrl = (media: string | undefined) => {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  return `${baseUrl}${media}`;
};
