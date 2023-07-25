function MoviePoster({ size, posterPath, htmlClassName }) {
    return <img className={htmlClassName} src={`https://image.tmdb.org/t/p/w${size}/${posterPath}`} />;
}

export default MoviePoster;
