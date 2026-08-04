import { useEffect, useState } from "react";
import { searchMovies } from "../services/api";

function useFetch(search, page) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [totalResults, setTotalResults] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        async function getMovies() {
            try {
                setLoading(true);
                setError("");
                const query =
                    search.trim() === "" ? "Batman" : search;
                const data = await searchMovies(
                    query,
                    page,
                    controller.signal
                );
                if (data.Response === "True") {
                    setMovies(data.Search || []);
                    setTotalResults(Number(data.totalResults));
                    setError("");
                } else {
                    setMovies([]);
                    setTotalResults(0);
                    setError(data.Error);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        getMovies();
        return () => {
            controller.abort();
        };
    }, [search, page]);
    return {
        movies,
        loading,
        error,
        totalResults,
    };
}

export default useFetch;