import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import Pagination from "../components/Pagination";
import { searchMovies } from "../services/api";

function Home() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
    async function getMovies() {
        const data = await searchMovies("Batman");
        setMovies(data.Search);
    }
    getMovies();
}, []);

    return (
    <div className="container">
        <h1>Movie Search App</h1>
        <ResultsList movies={movies} />
        
    </div>
    );
}

export default Home;