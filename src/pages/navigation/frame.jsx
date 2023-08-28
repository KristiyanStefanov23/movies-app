import SideNav from './sideNav';
import TopNav from './topNav';
import css from './frame.module.css';
import { Outlet } from 'react-router-dom';

function Frame() {
    return (
        <main
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/media/bg.jpg)`,
            }}
            className={css.main}
        >
            <nav>
                <SideNav />
            </nav>
            <div className={css.view}>
                <nav>
                    <TopNav />
                </nav>
                <div className={css.outlet}>
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default Frame;
