import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import { searchMovies } from "../services/api";

function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("Batman");
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search);
        setPage(1);
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
        const data = await searchMovies(query, page);
        if (data.Response === "True") {
            setMovies(data.Search || []);
            setTotalResults(Number(data.totalResults));
            setError("");
        } else {
            setMovies([]);
            setTotalResults(0);
            setError(data.Error);
        }
        setLoading(false);
    }
    getMovies();
}, [debouncedSearch, page]);
const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
const totalPages = Math.ceil(totalResults / 10);
    return (
    <div className="container">
        <h1>Movie Search App</h1>
        <SearchBar
            search={search}
            setSearch={setSearch}
        />
        {loading && <p className="message">Yüklənir...</p>}
        {!loading && error && (
            <p className="message">
                {error === "Too many results."
                    ? "Zəhmət olmasa daha dəqiq axtarış sözü yazın."
                    : "Heç bir film tapılmadı."}
            </p>
        )}
        {!loading && !error && movies.length===0 && (
            <p className="message">Heç bir film tapılmadı.</p>
        )}
        {!loading && !error && movies.length > 0 && (
            <>
                <ResultsList movies={movies} />
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span>Page {page}</span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                    >
                        Next
                    </button>
                </div>
    </>
)}
    </div>
    );
}

export default Home;