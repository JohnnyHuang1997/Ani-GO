import magician from '../images/magician.jpeg';
import styled from 'styled-components';

const Logo = () => {
	return (
		<Container>
			<ImageLogo src={magician} />
			<Title>ANI-GO</Title>
		</Container>
	);
};

export default Logo;
const Container = styled.div`
	display: flex;
	align-items: center;
	width: fit-content;
`;
const ImageLogo = styled.img`
	width: 75px;
	height: 75px;
	border-radius: 50%;
`;
const Title = styled.p`
	font-size: 30px;
	color: white;
	font-weight: 900;
`;
