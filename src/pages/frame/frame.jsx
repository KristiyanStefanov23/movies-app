import frameCss from './frame.module.css';
import sideNavCss from './sideNav.module.css';
import { Link, Outlet } from 'react-router-dom';
import Search from '../../components/search/search';
import { HiOutlineRocketLaunch, HiOutlineTrophy } from 'react-icons/hi2';
import { FiAward } from 'react-icons/fi';
import { IoDiamondOutline } from 'react-icons/io5';
import { FaCircleDot } from 'react-icons/fa6';
import { MajorNavItem, MinorNavItem } from '../../components/navigation';
import { useEffect, useRef, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

function Frame() {
	const [showNav, setShowNav] = useState(true);
	const [sideNavHidden, setSideNavHidden] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const outletRef = useRef(null);

	const resetNav = () => setSideNavHidden(true);

	useEffect(() => {
		let timer;
		const el = outletRef.current.children[0];
		el?.addEventListener('scroll', () => {
			clearTimeout(timer);

			setShowNav(el.scrollTop < lastScrollY);
			timer = setTimeout(function () {
				console.log(1);
				setLastScrollY(el.scrollTop);
			}, 100);
		});
		return () => {
			el?.removeEventListener('scroll', null);
		};
	}, [lastScrollY]);

	return (
		<main
			style={{
				backgroundImage: `url(${process.env.PUBLIC_URL}/media/bg.jpg)`,
			}}
			className={frameCss.main}
		>
			<nav className={!sideNavHidden ? frameCss.shown : ''}>
				<div onMouseLeave={resetNav} className={sideNavCss.panel}>
					<div onClick={resetNav} className={sideNavCss.closeBtn}>
						x
					</div>
					<Link
						onClick={resetNav}
						to={'/'}
						className={sideNavCss.logo}
					>
						<span>TaleTwist</span>
					</Link>
					<ul onClick={resetNav} className={sideNavCss.movieLists}>
						<MajorNavItem
							linkTo={'/new'}
							label={'New Releases'}
							Icon={HiOutlineRocketLaunch}
						/>
						<MajorNavItem
							linkTo={'/popular'}
							label={'Most Popular'}
							Icon={HiOutlineTrophy}
						/>
						<MajorNavItem
							linkTo={'/upcoming'}
							label={'Upcoming'}
							Icon={FiAward}
						/>
						<MajorNavItem
							linkTo={'/top'}
							label={'Top Chart'}
							Icon={IoDiamondOutline}
						/>
					</ul>
					<ul className={sideNavCss.collections}>
						<MajorNavItem
							label={'My Collection'}
							Icon={FaCircleDot}
							list={[
								<MinorNavItem
									location={'bookmark'}
									onClick={resetNav}
									label={'Bookmark'}
								/>,
								<MinorNavItem
									location={'history'}
									onClick={resetNav}
									label={'History'}
								/>,
							]}
						/>
					</ul>
				</div>
			</nav>
			<div className={frameCss.view}>
				<nav className={!showNav ? frameCss.hidden : ''}>
					<div className={frameCss.holder}>
						<div className={frameCss.navLeft}>
							<RxHamburgerMenu
								className={frameCss.navToggler}
								size={25}
								onClick={() => setSideNavHidden((old) => !old)}
							/>
							<Search />
						</div>
						<div className={frameCss.profile}>
							<span className={frameCss.name}>
								Hi, Kristiyan Stefanov
							</span>
						</div>
					</div>
				</nav>
				<div ref={outletRef} className={frameCss.outlet}>
					<Outlet />
				</div>
			</div>
		</main>
	);
}

export default Frame;
