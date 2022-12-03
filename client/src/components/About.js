import styled from 'styled-components';
import jujutsu from '../images/jujutsu.gif';

const About = () => {
	return (
		<MainContainer>
			<InfoWrapper>
				<Header>Welcome to ANI-GO</Header>
				<Page>
					What is Anime?
					<br />
					<br />
					Anime is a hand-drawn and
					<br />
					computer-generated animation originated from Japan.
					<br />
					<br />
					Users can view and search for whichever anime they are curious about
					<br />
					<br />
					Signed-in users can join the Forum page to discuss their favorite
					anime
					<br />
					<br />
					Signed-in users can also: bookmark, favorite, rate and checked if they
					watched an anime
					<br />
					<br />
					Lastly, signed-in users can view their Tier Ranking based on how many
					anime they've watched in their profile!
					<br />
					<br />
					<img src={jujutsu} alt='jujutsu' />
				</Page>
			</InfoWrapper>
		</MainContainer>
	);
};

export default About;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  margin-top: 2em;
  margin-bottom: 2em;
	width: 50%;
	img {
		border-radius: 10px;
	}
`;

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	border-radius: 10px;
	--border-size: 3px;
	--border-angle: 0turn;
	background-image: conic-gradient(
			from var(--border-angle),
			#213,
			#112 50%,
			#213
		),
		conic-gradient(from var(--border-angle), transparent 20%, #08f, #f03);
	background-size: calc(100% - (var(--border-size) * 2))
			calc(100% - (var(--border-size) * 2)),
		cover;
	background-position: center center;
	background-repeat: no-repeat;

	animation: bg-spin 5s linear infinite;

	@keyframes bg-spin {
		to {
			--border-angle: 1turn;
		}
	}
	@property --border-angle {
		syntax: '<angle>';
		inherits: true;
		initial-value: 0turn;
	}
`;

const Header = styled.h2`
	text-align: center;
	text-transform: uppercase;
	color: var(--white);
	font-size: 50px;
`;

const Page = styled.p`
	text-align: center;
	color: var(--white);
	font-size: 30px;
`;
