import styled from 'styled-components';

const TierCarousel = (userPoints) => {
	return (
		<Container>
			<CarouselContainer>
				<Wrapper userPoints={userPoints.userPoints}>
					<Content></Content>
				</Wrapper>
				<Wrapper userPoints={userPoints.userPoints}>
					<Content></Content>
				</Wrapper>
				<Wrapper userPoints={userPoints.userPoints}>
					<Content></Content>
				</Wrapper>
				<Wrapper userPoints={userPoints.userPoints}>
					<Content></Content>
				</Wrapper>
				<Wrapper userPoints={userPoints.userPoints}>
					<Content></Content>
				</Wrapper>
				<Wrapper userPoints={userPoints.userPoints}>
					<Content></Content>
				</Wrapper>
				<Wrapper userPoints={userPoints.userPoints}>
					<Content></Content>
				</Wrapper>
				<Wrapper userPoints={userPoints.userPoints}>
					<Content></Content>
				</Wrapper>
				<Wrapper userPoints={userPoints.userPoints}>
					<Content></Content>
				</Wrapper>
			</CarouselContainer>
		</Container>
	);
};

export default TierCarousel;

const Container = styled.div`
	text-align: center;
	color: #fefefe;
	position: relative;
	width: 220px;
	margin: 100px auto 0 auto;
	perspective: 1000px;
`;

const CarouselContainer = styled.div`
	position: absolute;
	width: 50%;
	height: 50%;
	transform-style: preserve-3d;
	animation: rotate360 40s infinite forwards linear;
`;

const Wrapper = styled.div`
	//COLOR CHANGER DEPENDING ON TIER
	//TIER 3: CASUAL 100 POINTS   :BRONZE
	//TIER 2: FAN    1000 POINTS  :GOLD
	//TIER 1: WEEB   3000 POINTS  :DIAMOND
	//TIER 0: T.G    10000 POINTS :RUBY

	/* background-color: #C7020C; ruby */
	/* background-color: #b9f2ff; diamond  */
	/* background-color: #ffa812; gold */
	/* background-color: #8b4513; bronze */

	background-color: ${({ userPoints }) => {
		if (userPoints < 1000) {
			return '#8b4513';
		}
		if (userPoints >= 1000 && userPoints < 3000) {
			return '#ffa812';
		}
		if (userPoints >= 3000 && userPoints < 10000) {
			return '#b9f2ff';
		}
    if (userPoints >= 10000) {
      return '#C7020C';
    }
	}};

	opacity: 0.5;
	position: absolute;
	width: 313px;
	height: 75px;
	top: 5px;
	left: 50%;
	background-size: cover;
	box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.5);
	display: flex;
	:nth-child(1) {
		transform: rotateY(0deg) translateZ(430px);
	}
	:nth-child(2) {
		transform: rotateY(40deg) translateZ(430px);
	}
	:nth-child(3) {
		transform: rotateY(80deg) translateZ(430px);
	}
	:nth-child(4) {
		transform: rotateY(120deg) translateZ(430px);
	}
	:nth-child(5) {
		transform: rotateY(160deg) translateZ(430px);
	}
	:nth-child(6) {
		transform: rotateY(200deg) translateZ(430px);
	}
	:nth-child(7) {
		transform: rotateY(240deg) translateZ(430px);
	}
	:nth-child(8) {
		transform: rotateY(280deg) translateZ(430px);
	}
	:nth-child(9) {
		transform: rotateY(320deg) translateZ(430px);
	}
`;

const Content = styled.h2`
	margin: auto;
	font-size: 2rem;
	background: rgb(12, 15, 15);
	background: linear-gradient(
		90deg,
		rgba(12, 15, 15, 1) 5%,
		rgba(85, 61, 91, 1) 72%,
		rgba(55, 23, 88, 0.6573004201680672) 100%
	);
	width: 100%;
	@keyframes rotate360 {
		from {
			transform: rotateY(0deg);
		}
		to {
			transform: rotateY(-360deg);
		}
	}
`;
