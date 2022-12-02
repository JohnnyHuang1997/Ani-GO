import FBW from './FBWbutton';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AnimePage = () => { 
	const { animeId } = useParams();

	const [anime, setAnime] = useState('');

	const { user } = useAuth0();

	useEffect(() => {
		fetch(`https://kitsu.io/api/edge/anime/${animeId}`)
			.then((res) => res.json())
			.then((data) => {
				setAnime(data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	////////// ADD FAVORITE /////////////
	const addFavorite = (anime) => {
		fetch('/api/add-favorite', {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				favorite: {
					id: anime.id,
					image: anime.attributes.posterImage.small,
					name: anime.attributes.titles.en,
				},
				email: user.email,
			}),
		});
	};
	////////////////////////////////////

	////////// ADD BOOKMARK /////////////
	const addBookmark = (anime) => {
		fetch('/api/add-bookmarks', {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				bookmarks: {
					id: anime.id,
					image: anime.attributes.posterImage.small,
					name: anime.attributes.titles.en,
				},
				email: user.email,
			}),
		});
	};
	////////////////////////////////////

	////////// ADD WATCHED /////////////
	const addIsWatch = (anime) => {
		fetch('/api/add-watch', {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				isWatched: {
					id: anime.id,
					image: anime.attributes.posterImage.small,
					name: anime.attributes.titles.en,
				},
				email: user.email,
			}),
		});
		////////////////////////////////
	};

	return (
		<>
			{!anime ? (
				<div>
					<Spinner />
				</div>
			) : (
				<Container>
					{anime.attributes.coverImage && (
						<CoverImage src={anime.attributes.coverImage.original} alt='' />
					)}

					<MainContent>
						<ImageWrapper>
							<Image src={anime.attributes.posterImage.original} alt='' />

							{user && (
								<ButtonContainer>
									<FBW
										anime={anime}
										addFavorite={addFavorite}
										addBookmark={addBookmark}
										addIsWatch={addIsWatch}
									/>
								</ButtonContainer>
							)}
						</ImageWrapper>

						<AnimeDetail className='bg-spin'>
							<Title>
								{anime.attributes.titles.en}&nbsp;
								<br />
								<span>{anime.attributes.titles.ja_jp}</span>
							</Title>
							<Date>
								<span>Start</span>&nbsp;{anime.attributes.startDate}
								&nbsp;&nbsp;-&nbsp;&nbsp;
								<span>End</span>&nbsp;{anime.attributes.endDate}
							</Date>
							<Episode>
								<span>Total Episodes</span>&nbsp;
								{anime.attributes.episodeCount}
							</Episode>
							<Status>{anime.attributes.status}</Status>
							<Type>{anime.attributes.subtype}</Type>
							<Ranking>
								<span>Rank</span>&nbsp;{anime.attributes.popularityRank}
							</Ranking>
						</AnimeDetail>
					</MainContent>

					<SynopsisWrapper>
						<Synopsis>
							<span>Synopsis</span>
							<br />
							<br />
							{anime.attributes.synopsis}
						</Synopsis>
					</SynopsisWrapper>
				</Container>
			)}
		</>
	);
};

export default AnimePage;

const Container = styled.div`
	background: rgb(12, 15, 15);
	background: linear-gradient(
		90deg,
		rgba(12, 15, 15, 1) 5%,
		rgba(85, 61, 91, 1) 72%,
		rgba(55, 23, 88, 0.6573004201680672) 100%
	);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	span {
		font-weight: 900;
	}
`;

const CoverImage = styled.img`
	height: 600px;
	width: 100%;
	object-fit: cover;
`;

const MainContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
  column-gap: 40px;
	margin-top: 200px;
	margin-bottom: 200px;

  
`;

//IMAGE WRAPPER START
const ImageWrapper = styled.div``;

const Image = styled.img`
	max-width: 500px;
	width: 100%;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 25px;
	background-color: var(--orange);
	button {
		border-radius: 5px;
	}
`;
//IMAGE WRAPPER END

//ANIME DETAIL WRAPPER
const AnimeDetail = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
  justify-content: space-evenly;

	--border-size: 3px;
	--border-angle: 0turn;
	width: 60vmin;
	height: 50vmin;
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
const Title = styled.p`
	font-weight: 900;
	font-size: 50px;
	font-family: 'Poppins', sans-serif;
	text-align: center;
	color: white;
	span {
		font-family: 'Poppins', sans-serif;
		font-weight: 300;
		text-align: center;
	}
`;
const Date = styled.p`
	font-size: 30px;
	color: white;
	span {
		text-transform: uppercase;
	}
`;
const Episode = styled.p`
	font-size: 30px;
	color: white;
	span {
		text-transform: uppercase;
	}
`;
const Status = styled.p`
	font-size: 30px;
	border: 3px solid var(--orange);
	color: var(--orange);
	border-radius: 10px;
	padding: 10px;
	text-transform: uppercase;
`;
const Type = styled.p`
	font-size: 30px;
	border: 3px solid var(--orange);
	color: var(--orange);
	border-radius: 10px;
	padding: 10px;
`;
const Ranking = styled.p`
	font-size: 30px;
	color: white;
	text-transform: uppercase;
`;
//ANIME DETAIL WRAPPER END

const SynopsisWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 50px;
`;
const Synopsis = styled.p`
	text-align: center;
	font-family: 'Poppins', sans-serif;
	font-size: 30px;
	color: white;
	width: 1500px;
	margin-bottom: 50px;
	span {
		text-transform: uppercase;
		border: 3px solid white;
		border-radius: 5px;
		padding: 10px;
	}
`;
