function Card({ movie }) {
    return (
        <div className="card">
            <img
                src={
                    movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/150x220?text=No+Image"
                }
                alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
        </div>
    );
}

export default Card;