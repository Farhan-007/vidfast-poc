const API_KEY = '7e28b016'; // Get from http://www.omdbapi.com/

export async function searchMovies(query) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  return res.json();
}

export async function getMovieById(id) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
  return res.json();
}