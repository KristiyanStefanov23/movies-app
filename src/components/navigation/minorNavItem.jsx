import { Link } from 'react-router-dom';
import css from './minorNav.module.css';

function MinorNavItem({ label, location, onClick }) {
	return (
		<Link className={css.item} onClick={onClick} to={location}>
			{label}
		</Link>
	);
}

export default MinorNavItem;
