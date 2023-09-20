import { useState } from 'react';
import css from './majorNav.module.css';
import { Link } from 'react-router-dom';

function MajorNavItem({ Icon, label, list = [], linkTo }) {
	const [listVisible, setListVisible] = useState(true);
	function handleClick() {
		if (list.length < 1) return;
		setListVisible(!listVisible);
	}

	return (
		<li className={css.item}>
			<div
				className={`${list.length > 0 ? css.section : ''} ${
					!!listVisible && css.listShown
				}`}
			>
				<Link onClick={handleClick} to={linkTo}>
					<span className={css.icon}>{Icon && <Icon />}</span>
					<span className={css.label}>{label}</span>
				</Link>
			</div>
			{list.length > 0 && (
				<ul hidden={!listVisible}>
					{list.map((Item, i) => (
						<li key={i}>{Item}</li>
					))}
				</ul>
			)}
		</li>
	);
}

export default MajorNavItem;
