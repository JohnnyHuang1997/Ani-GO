import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';

const colors = {
	orange: '#ff6200',
	grey: '#a9a9a9',
};

const Rating = ({ anime }) => {

	const { user } = useAuth0();
	const [currentValue, setCurrentValue] = useState(
		anime.rating !== null ? anime.rating : 0
	);
	const [hoverValue, setHoverValue] = useState(undefined);
  const [flag, setFlag] = useState(true);
	const stars = Array(5).fill(0);

	useEffect(() => {
		fetch('/api/add-rating', {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: user.email,
				rating: currentValue,
				anime: anime,
			}),
		});
	}, [flag]);

	const handleClick = (value) => {
		setCurrentValue(value);
    setFlag(!flag);
	};

	const handleMouseOver = (newHoverValue) => {
		setHoverValue(newHoverValue);
	};

	const handleMouseLeave = () => {
		setHoverValue(undefined);
	};

	// const HandleAddRating = () => {

	// };

	return (
		<Container>
			<StarWrapper>
				{stars.map((_, index) => {
					return (
						<FaStar
							key={index}
							size={24}
							onClick={() => handleClick(index + 1)}
							onMouseOver={() => handleMouseOver(index + 1)}
							onMouseLeave={handleMouseLeave}
							color={
								(hoverValue || currentValue) > index
									? colors.orange
									: colors.grey
							}
							style={{
								marginRight: 10,
								cursor: 'pointer',
							}}
						/>
					);
				})}
			</StarWrapper>
		</Container>
	);
};

export default Rating;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const StarWrapper = styled.div`
	display: flex;
	flex-direction: row;
	padding: 15px;
`;
