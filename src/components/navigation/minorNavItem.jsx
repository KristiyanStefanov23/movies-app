import { Link } from 'react-router-dom';

function MinorNavItem({ label, location, onClick }) {
	return (
		<Link onClick={onClick} to={location}>
			{label}
		</Link>
	);
}

export default MinorNavItem;
