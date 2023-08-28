import { Link } from 'react-router-dom';
import css from './minorNav.module.css';

function MinorNavItem({ label, location }) {
    return (
        <Link className={css.item} to={location}>
            {label}
        </Link>
    );
}

export default MinorNavItem;
