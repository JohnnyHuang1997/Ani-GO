import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FBW from './FBWbutton';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from './Spinner';

const Browse = () => {
	const navigate = useNavigate();

	const { user } = useAuth0();

	const [anime, setAnime] = useState(null);

	const [categoryName, setCategoryName] = useState('');
	const [pageCategory, setPageCategory] = useState(
		'page[limit]=20&page[offset]=0'
	);

	const [page, setPage] = useState(
		localStorage.getItem('page') !== undefined
			? JSON.parse(localStorage.getItem('page'))
			: 'https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0'
	);
	const [pageButton, setPageButton] = useState(null);

	const [currentCategory, setCurrentCategory] = useState('');

	const arrayHoldingGenres = [
		'comedy',
		'shounen',
		'seinen',
		'adventure',
		'romance',
		'thriller',
		'action',
		'drama',
		'mystery',
		'horror',
		'fantasy',
		'all',
		'sports',
		'school',
		'isekai',
		'stereotypes',
		'ecchi',
	];

	useEffect(() => {
		if (categoryName === '') {
			fetch(page)
				.then((res) => res.json())
				.then((data) => {
					const linkArray = Object.entries(data.links);
					setPageButton(linkArray);
					setAnime(data.data);
				})
				.catch((error) => {
					navigate('/error-page');
					console.log(error);
				});
		}
	}, [page]);

	const handleClick = (url) => {
		setCategoryName('category');
		setPage(url);
		localStorage.setItem('page', JSON.stringify(url));
	};

	useEffect(() => {
		if (categoryName !== '') {
			fetch(page)
				.then((res) => res.json())
				.then((data) => {
					const linkArray = Object.entries(data.links);
					setPageButton(linkArray);
					setAnime(data.data);
				})
				.catch((error) => {
					navigate('/error-page');
					console.log(error);
				});
		}
	}, [categoryName, page]);

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
			{!anime && !pageButton ? (
				<div>
					<Spinner />
				</div>
			) : (
				<MainContainer>
					<Filter>
						<FilterName>
							<h2>Filter by category:</h2>
							<h1>{currentCategory}</h1>
						</FilterName>

						<FilterContent>
							{arrayHoldingGenres.map((genre) => {
								return (
									<Wrapper key={Math.floor(Math.random() * 1400000000)}>
										<FilterButton
											className={currentCategory === genre ? 'active' : ''}
											onClick={() => {
												handleClick(
													`https://kitsu.io/api/edge/anime?filter[categories]=${genre}&${pageCategory}`
												);
												setCurrentCategory(genre);
											}}
										>
											{genre}
										</FilterButton>
									</Wrapper>
								);
							})}
						</FilterContent>
					</Filter>

					<Paginationwrapper>
						{pageButton.map((pagination) => {
							return (
								<ButtonWrapper key={Math.floor(Math.random() * 1400000000)}>
									<Button onClick={() => setPage(pagination[1])}>
										{pagination[0]}
									</Button>
								</ButtonWrapper>
							);
						})}
					</Paginationwrapper>

					<DisplayAnimeWrapper>
						{anime.map((show) => {
							return (
								<AnimeWrapper key={show.id}>
									<RatingDiv>
										<AvgRateText className='rate'>rating</AvgRateText>
										<AvgRating className='rating'>
											{show.attributes.averageRating}
										</AvgRating>
									</RatingDiv>

									<ImagePoster
										src={show.attributes.posterImage.small}
										alt='anime-poster'
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											navigate(`/anime/${show.id}`);
										}}
									/>
									<Title
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											navigate(`/anime/${show.id}`);
										}}
									>
										{show.attributes.titles.en}
									</Title>
									<StartEnd>
										<span>Start</span> &nbsp;
										{show.attributes.startDate} &nbsp;
										<br />
										<span>End</span> &nbsp;
										{show.attributes.endDate}
									</StartEnd>

									<RankAndType>
										<Rank>
											Rank&nbsp;<span>{show.attributes.popularityRank}</span>
										</Rank>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<Subtype>{show.attributes.subtype}</Subtype>
									</RankAndType>

									{user && (
										<div>
											<FBW
												anime={show}
												addFavorite={addFavorite}
												addBookmark={addBookmark}
												addIsWatch={addIsWatch}
											/>
										</div>
									)}
								</AnimeWrapper>
							);
						})}
					</DisplayAnimeWrapper>
				</MainContainer>
			)}
		</>
	);
};

export default Browse;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Filter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const FilterName = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	h2 {
		text-transform: uppercase;
	}
	h1 {
		text-transform: uppercase;
	}
`;

const Wrapper = styled.div`
	.active {
		background-color: var(--blue);
	}
`;

const FilterContent = styled.div`
	display: grid;
	grid-template-columns: 250px 250px 250px 250px;
	justify-content: center;
	align-items: center;
	column-gap: 1em;
	row-gap: 1em;
	padding-top: 1em;
	padding-bottom: 1em;
	border-radius: 10px;
	background: rgb(242, 186, 147);
	background: linear-gradient(
		90deg,
		rgba(242, 186, 147, 1) 0%,
		rgba(231, 134, 77, 0.3772102591036415) 53%,
		rgba(255, 1, 1, 0.7469362745098039) 100%
	);
`;

const FilterButton = styled.button`
	font-style: italic;
	border: none;
	width: fit-content;
	padding: 1em;
	font-size: 15px;
	border-radius: 10px;
	text-transform: uppercase;
	color: white;
	text-align: center;
	background-color: #ff6200;
	&:hover {
		cursor: pointer;
		background-color: var(--blue);
	}
`;

const Paginationwrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 75px;
	margin: 3em 0 3em 0;
	align-items: center;
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

const Button = styled.button`
	border: none;
	padding: 10px;
	border-radius: 5px;
	font-size: 15px;
	font-weight: 900;
	background-color: #ff6200;
	color: white;
	cursor: pointer;
	&:hover {
		background-color: var(--purple);
		color: white;
	}
`;

const RatingDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 1em;
`;
const AvgRateText = styled.p`
	text-transform: uppercase;
	font-weight: 900;
	font-family: 'Poppins', sans-serif;
	&:hover + .rating {
		display: block;
		color: #ff6200;
	}
`;

const AvgRating = styled.p`
	display: none;
	font-weight: 900;
	font-family: 'Poppins', sans-serif;
`;

const DisplayAnimeWrapper = styled.div`
	display: grid;
	grid-template-columns: 250px 250px 250px 250px;
	column-gap: 3em;
	row-gap: 3em;
	justify-content: center;
	align-items: center;
	margin: 0 0 3em 0;
`;

const AnimeWrapper = styled.div`
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

const ImagePoster = styled.img`
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

const StartEnd = styled.p`
	text-align: center;
	font-size: 25px;
	font-weight: 700;
	font-family: 'Poppins', sans-serif;
	span {
		font-size: 15px;
		text-transform: uppercase;
	}
`;

const RankAndType = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
`;

const Rank = styled.p`
	font-weight: 700;
	text-transform: uppercase;
	span {
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
	color: white;
	background-color: #ff6200;
`;
