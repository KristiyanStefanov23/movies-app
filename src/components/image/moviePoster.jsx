function MoviePoster({ size, posterPath }) {
    return <img src={`https://image.tmdb.org/t/p/w${size}/${posterPath}`} />;
}

export default MoviePoster;
