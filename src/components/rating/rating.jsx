import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

function Rating({ rating, className }) {
	const maxRating = 5;
	const starIcons = [];

	for (let i = 0; i < maxRating; i++) {
		const isFullStar = rating / 2 >= i + 1;
		const isHalfStar = rating / 2 > i;

		if (isFullStar) {
			starIcons.push(<FaStar key={i} />);
		} else if (isHalfStar) {
			starIcons.push(<FaStarHalfAlt key={i} />);
		} else {
			starIcons.push(<FaRegStar key={i} />);
		}
	}

	return <div className={className}>{starIcons}</div>;
}

export default Rating;
