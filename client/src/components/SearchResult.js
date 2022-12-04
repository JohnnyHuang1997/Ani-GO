import FBW from './FBWbutton';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useNavigate } from 'react-router-dom';

const SearchResult = () => {
	const navigate = useNavigate();

	const { searchId } = useParams();

	const { user } = useAuth0();

	const [result, setResult] = useState(null);

	const [pageButton, setPageButton] = useState(null);

	const [page, setPage] = useState(
		`https://kitsu.io/api/edge/anime?filter[text]=${searchId}?page[limit]=20&page[offset]=0`
	);

	useEffect(() => {
		fetch(page)
			.then((res) => res.json())
			.then((data) => {
				const linkArray = Object.entries(data.links);
				setPageButton(linkArray);
				setResult(data.data);
			})
			.catch((err) => {
				navigate('/error-page');
				console.log(err);
			});
	}, [page]);

	////////// ADD FAVORITE LIST//////////
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

	////////// ADD BOOKMARK LIST///////
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
	//////////////////////////////////

	////////// ADD WATCHED LIST//////
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
	////////////////////////////////

	return (
		<>
			{!result ? (
				<div>
					<Spinner />
				</div>
			) : (
				<>
					<Container>
						<Wrapper>
							{result.map((anime) => {
								return (
									<ImageContainer key={anime.id}>
										<Image
											src={anime.attributes.posterImage.small}
											alt='poster'
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

										<Date>
											<span>Start</span> &nbsp;
											{anime.attributes.startDate} &nbsp;
											<br />
											<span>End</span> &nbsp;
											{anime.attributes.endDate}
										</Date>

										<RankAndType>
											<Rank>
												Rank&nbsp;<span>{anime.attributes.popularityRank}</span>
											</Rank>
											<Type>{anime.attributes.subtype}</Type>
										</RankAndType>

										<TextWrapper>
											<Synopsis>{anime.attributes.synopsis}</Synopsis>
										</TextWrapper>

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
						</Wrapper>

            <PaginateWrapper>
						{pageButton.map((paginate) => {
							return (
								<ButtonWrapper key={Math.floor(Math.random() * 1400000000)}>
									<Button onClick={() => setPage(paginate[1])}>
										{paginate[0]}
									</Button>
								</ButtonWrapper>
							);
						})}
					</PaginateWrapper>
					</Container>

					
				</>
			)}
		</>
	);
};

export default SearchResult;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 200px 200px 200px 200px;
	justify-content: center;
	align-items: center;
	text-align: center;
  margin: 3em 0 3em 0;
  row-gap: 5em;
  column-gap: 5em;
`;

const ImageContainer = styled.div`
	border: 1px solid black;
	max-height: 900px;
	height: 100%;
	&:hover {
		opacity: 0.8;
	}
`;

const Image = styled.img`
	max-width: 700px;
	width: 100%;
	cursor: pointer;
`;

const TextWrapper = styled.div`
	--max-lines: 5;
	display: -webkit-box;
	overflow: scroll;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: var(--max-lines);
	cursor: context-menu;
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

const Date = styled.p`
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
	align-items: center;
  justify-content: center;
  gap: 1em;
`;

const Type = styled.p`
	font-weight: 900;
	padding: 5px;
	border-radius: 5px;
	text-transform: uppercase;
	width: fit-content;
	text-align: center;
	color: white;
	background-color: #ff6200;
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

const Synopsis = styled.p`
	font-size: 25px;
`;

const PaginateWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 0 0 5em 0;
  gap: 5em;
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
		background-color: black;
		color: goldenrod;
	}
`;
