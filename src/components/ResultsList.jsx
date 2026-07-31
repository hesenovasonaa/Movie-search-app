import Card from "./Card.jsx";

function ResultsList({ movies }) {
    return (
    <div className="results">
        {movies.map((movie) => (
        <Card key={movie.imdbID} movie={movie} />
        ))}
    </div>
    );
}

export default ResultsList;