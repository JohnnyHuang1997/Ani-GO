import styled from 'styled-components';
import bleach from '../images/bleach.gif';
import blue from '../images/blue.gif';
import charizard from '../images/charizardx.gif';
import demonslayer from '../images/demonslayer.gif';
import jujutsu from '../images/jujutsu.gif';
import onepunch from '../images/onepunch.gif';
import zoro from '../images/zoro.gif';
import goku from '../images/goku.gif';
import natsu from '../images/natsu.gif';

const Carousel = () => {
	return (
		<Container>
			<CarouselContainer>
				<Wrapper>
					<Image src={bleach} alt='bleach' />
				</Wrapper>
				<Wrapper>
					<Image src={charizard} alt='charizard' />
				</Wrapper>
				<Wrapper>
					<Image src={demonslayer} alt='demon_slayer' />
				</Wrapper>
				<Wrapper>
					<Image src={jujutsu} alt='jujutsu' />
				</Wrapper>
				<Wrapper>
					<Image src={onepunch} alt='one_punch' />
				</Wrapper>
				<Wrapper>
					<Image src={blue} alt='blue_lock' />
				</Wrapper>
				<Wrapper>
					<Image src={zoro} alt='zoro' />
				</Wrapper>
				<Wrapper>
					<Image src={natsu} alt='natsu' />
				</Wrapper>
				<Wrapper>
					<Image src={goku} alt='goku' />
				</Wrapper>
			</CarouselContainer>
		</Container>
	);
};

export default Carousel;

const Container = styled.div`
	position: relative;
	width: 320px;
	margin: 5em auto;
	perspective: 1000px;
`;
const CarouselContainer = styled.div`
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	animation: rotate360 35s infinite forwards linear;
`;
const Wrapper = styled.div`
	position: absolute;
	width: 19em;
	height: 12em;
	top: 20px;
  left: 15%; 
	background-color: black;
	opacity: 0.8;
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
const Image = styled.img`
	margin: auto;
	width: 100%;
  height: 100%;
  opacity: 1;
	@keyframes rotate360 {
		from {
			transform: rotateY(0deg);
		}
		to {
			transform: rotateY(-360deg);
		}
	}
`;
