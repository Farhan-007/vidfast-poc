const API_KEY = process.env.OMDB_API_KEY

export async function searchMovies(query) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  return res.json();
}

export async function getMovieById(id) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
  return res.json();
}