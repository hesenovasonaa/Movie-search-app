const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(search, page = 1, signal){
    const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${search}&page=${page}`,
    { signal }
    );
    const data = await response.json();

    return data;
}