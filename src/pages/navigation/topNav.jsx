import Search from '../../components/search/search';
import css from './topNav.module.css';

function TopNav() {
    return (
        <div>
            <Search />
            <div className={css.profile}>
                <span className={css.name}>Kristiyan Stefanov</span>
                <img className={css.picture} src="" alt="user pfp" />
                <span className={css.optionIcon}>⚙</span>
            </div>
        </div>
    );
}

export default TopNav;
