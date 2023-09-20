import css from './loader.module.css';

function Loader() {
	return (
		<div className={css.container}>
			<div className={css.loader}></div>
		</div>
	);
}

export default Loader;
