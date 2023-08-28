import MajorNavItem from '../../components/navigation/majorNavItem';
import MinorNavItem from '../../components/navigation/minorNavItem';
import css from './sideNav.module.css';
import { HiOutlineRocketLaunch, HiOutlineTrophy } from 'react-icons/hi2';
import { FiAward } from 'react-icons/fi';
import { IoDiamondOutline } from 'react-icons/io5';
import { FaCircleDot } from 'react-icons/fa6';

function SideNav() {
    return (
        <div className={css.panel}>
            <div className={css.logo}>
                <span>TaleTwist</span>
            </div>
            <ul className={css.movieLists}>
                <MajorNavItem
                    label={'New Releases'}
                    Icon={HiOutlineRocketLaunch}
                />
                <MajorNavItem label={'Most Popular'} Icon={HiOutlineTrophy} />
                <MajorNavItem label={'Upcoming'} Icon={FiAward} />
                <MajorNavItem label={'Top Chart'} Icon={IoDiamondOutline} />
            </ul>
            <ul className={css.collections}>
                <MajorNavItem
                    label={'My Collection'}
                    Icon={FaCircleDot}
                    list={[
                        <MinorNavItem label={'Bookmark'} />,
                        <MinorNavItem label={'History'} />,
                        <MinorNavItem label={'Subscriptions'} />,
                    ]}
                />
            </ul>
        </div>
    );
}

export default SideNav;
