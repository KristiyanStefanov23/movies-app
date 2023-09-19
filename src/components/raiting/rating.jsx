import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ rating, className }) => {
	const stars = [];

	for (let i = 0; i < 5; i++) {
		if (rating / 2 >= i + 1) {
			stars.push(<FaStar key={i} />);
		} else if (rating / 2 > i) {
			stars.push(<FaStarHalfAlt key={i} />);
		} else {
			stars.push(<FaRegStar key={i} />);
		}
	}

	return <div className={className}>{stars}</div>;
};

export default Rating;
