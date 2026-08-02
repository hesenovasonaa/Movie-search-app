import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import { searchMovies } from "../services/api";

function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("Batman");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
}, [search]);
    useEffect(() => {
    async function getMovies() {
        setLoading(true);
        setError("");
        const query =
            debouncedSearch.trim() === ""
            ? "Batman"
            : debouncedSearch;
        const data = await searchMovies(query);
        if (data.Response === "True") {
            setMovies(data.Search);
        } else {
            setMovies([]);
            setError(data.Error);
        }
        setLoading(false);
    }
    getMovies();
}, [debouncedSearch]);

    return (
    <div className="container">
        <h1>Movie Search App</h1>
        <SearchBar
            search={search}
            setSearch={setSearch}
        />
        {loading && <p>Yüklənir...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
            <ResultsList movies={movies} />
)}
    </div>
    );
}

export default Home;