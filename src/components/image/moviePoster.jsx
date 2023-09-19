function MoviePoster({ size, posterPath, htmlClassName, onErrorImg }) {
	if (!posterPath) return;
	return (
		<img
			onError={onErrorImg}
			className={htmlClassName}
			alt=''
			src={`https://image.tmdb.org/t/p/w${size}/${posterPath}`}
		/>
	);
}

export default MoviePoster;
