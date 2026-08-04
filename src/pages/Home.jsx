import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import useFetch from "../hooks/useFetch";

function Home() {
    const [search, setSearch] = useState("Batman");
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search);
        setPage(1);
    }, 500);
    return () => clearTimeout(timer);
}, [search]);
const {
    movies,
    loading,
    error,
    totalResults,
} = useFetch(debouncedSearch, page);
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
                : error}
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