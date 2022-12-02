import styled from 'styled-components';
import Carousel from './Carousel';
import Spinner from './Spinner';
import FBW from './FBWbutton';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {

	const { user, isAuthenticated } = useAuth0();

	const navigate = useNavigate();

	const [trendingAnime, setTrendingAnime] = useState(null);

	useEffect(() => {
		fetch('https://kitsu.io/api/edge/trending/anime')
			.then((res) => res.json())
			.then((data) => {
				setTrendingAnime(data.data);
			})
			.catch((err) => {
				navigate('/error-page');
				console.log(err);
			});
	}, []);

	////////// ADD USER /////////////////
	useEffect(() => {
		fetch('/api/add-user', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...user,
				favorite: {},
				bookmarks: {},
				isWatched: {},
			}),
		});
	}, [user, isAuthenticated]);
	////////////////////////////////////

	////////// ADD FAVORITE ////////////
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
	///////////////////////////////////

	////////// ADD BOOKMARK ///////////
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
	///////////////////////////////////

	////////// ADD WATCHED ////////////
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
	};
	//////////////////////////////////

	return (
		<>
			{!trendingAnime ? (
				<div>
          <Spinner/>
        </div>
			) : (
				<>
					<CarouselWrapper>
						<Carousel />
					</CarouselWrapper>

					<MainContainer>
						<Header>
							<h2>Trending Animes</h2>
						</Header>

						{trendingAnime.map((anime) => {
							return (
								<ImageContainer key={anime.id}>
									<Image
										src={anime.attributes.posterImage.small}
										alt='anime-poster'
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											navigate(`/anime/${anime.id}`);
										}}
									/>
									<Title
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											navigate(`/anime/${anime.id}`);
										}}
									>
										{anime.attributes.titles.en}
									</Title>

									<RankAndType>
										<Rank>
											Rank&nbsp;<span>{anime.attributes.popularityRank}</span>
										</Rank>
										<Subtype>{anime.attributes.subtype}</Subtype>
									</RankAndType>

									{/* {FAV/BOOK/WATCHED BUTTON} */}
									{user && (
										<div>
											<FBW
												anime={anime}
												addFavorite={addFavorite}
												addBookmark={addBookmark}
												addIsWatch={addIsWatch}
											/>
										</div>
									)}
								</ImageContainer>
							);
						})}

						<ViewMore
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								navigate('/browse');
							}}
						>
							browse the collection
						</ViewMore>
					</MainContainer>
				</>
			)}
		</>
	);
};

export default Home;

const MainContainer = styled.div`
	display: grid;
	grid-template-columns: 300px 300px 300px 300px;
	justify-content: center;
	align-items: center;
	column-gap: 2rem;
	row-gap: 3rem;
	margin-top: 500px;
	margin-bottom: 200px;
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
	h2 {
		text-transform: uppercase;
		text-align: center;
		font-family: 'Poppins', sans-serif;
	}
`;

const CarouselWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border: 1px solid black;
	max-height: 800px;
	height: 100%;
	&:hover {
		opacity: 0.8;
	}
`;

const Image = styled.img`
	cursor: pointer;
	width: 100%;
`;

const Title = styled.p`
	text-align: center;
	font-size: 25px;
	text-transform: uppercase;
	font-weight: 900;
	font-family: 'Poppins', sans-serif;
	color: #ff6200;
	cursor: pointer;
`;

const RankAndType = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	column-gap: 30px;
`;

const Rank = styled.p`
	font-weight: 700;
	text-transform: uppercase;
	span {
		color: #ff6200;
		font-size: 25px;
		font-weight: 900;
		border: 3px solid #ff6200;
		border-radius: 5px;
	}
`;

const Subtype = styled.p`
	font-weight: 900;
	padding: 5px;
	border-radius: 5px;
	text-transform: uppercase;
	width: fit-content;
	text-align: center;
	color: #ff6200;
	border: 3px solid #ff6200;
`;

const ViewMore = styled.h2`
	text-transform: uppercase;
	font-weight: 900;
	text-decoration: underline;
	text-align: center;
	font-family: 'Poppins', sans-serif;
	cursor: pointer;
`;


