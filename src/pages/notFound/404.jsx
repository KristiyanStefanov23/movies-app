import css from './404.module.css';

function NotFound() {
	return (
		<div className={css.holder}>
			<h2>You are trapped in unknown lands</h2>
			<img
				src='https://http.cat/404'
				alt='Perfectly hidden cat'
				useMap='#imageMap'
			/>
			<map name='imageMap'>
				<area
					target=''
					alt=''
					title=''
					href='/'
					coords='305,253,129,349'
					shape='rect'
				/>
				<area
					target=''
					alt=''
					title=''
					href='/'
					coords='302,363,379,237'
					shape='rect'
				/>
				<area
					target=''
					alt=''
					title=''
					href='/'
					coords='465,189,320,240'
					shape='rect'
				/>
			</map>
			<h2>You must find the cat in order to return</h2>
		</div>
	);
}

export default NotFound;
