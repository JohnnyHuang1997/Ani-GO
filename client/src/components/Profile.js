import Rating from './Rating';
import Spinner from './Spinner';
import TierCarousel from './TierCarousel';
import { AiFillEye, AiFillStar } from 'react-icons/ai';
import { FaBookmark } from 'react-icons/fa';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
	const { user, isAuthenticated } = useAuth0();

	const [favoriteAnime, setFavoriteAnime] = useState(null);
	const [bookmarkAnime, setBookmarkAnime] = useState(null);
	const [watchedAnime, setWatchedAnime] = useState([]);

	const [flag, setFlag] = useState(true);
	const [userPoints, setUserPoints] = useState(0);

	//GET USER
	useEffect(() => {
		fetch(`/api/get-user/${user.email}`)
			.then((res) => res.json())
			.then((data) => {
				setFavoriteAnime(Object.values(data.data.favorite));
				setBookmarkAnime(Object.values(data.data.bookmarks));
				setWatchedAnime(Object.values(data.data.isWatched));
				setUserPoints(Object.values(data.data.isWatched).length * 100);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [flag]);

	useEffect(() => {}, [watchedAnime]);

	//PATCH TO REMOVE ONE ANIME
	const handleDeleteContent = (anime, collectionId) => {
		setFlag(!flag);
		fetch(`/api/delete-anime/${collectionId}`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: anime.id,
				email: user.email,
			}),
		});
	};

	return (
		<>
			{!isAuthenticated &&
			favoriteAnime &&
			bookmarkAnime &&
			watchedAnime !== null ? (
				<div>
					<Spinner />
				</div>
			) : (
				<Container>
					<ProfileWrapper>
						<Name>
							Welcome back,&nbsp;<span>{user?.name}</span>
						</Name>
					</ProfileWrapper>

					<TierChartContainer>
						<div>
							<Chart>
								Tier list <br /> <br />
								How it works <br />
								<br />
								Each watched anime earns you 100 points! Simple as that!
							</Chart>
						</div>

						<Tier3>
							100 <span>bronze: casual</span>
						</Tier3>
						<Tier2>
							1000+ <span>gold: fan</span>
						</Tier2>
						<Tier1>
							3000+ <span>diamond: weeb</span>
						</Tier1>
						<Tier0>
							10,000+ <span>ruby: touch some grass</span>
						</Tier0>
					</TierChartContainer>

					<TierSystem>
						<h2>Your current rank</h2>
						<TierColor userPoints={userPoints}>{userPoints}</TierColor>
						<TierCarousel userPoints={userPoints} />
					</TierSystem>

					<ListWrapper>
						<Header>
							Favorites &nbsp; <AiFillStar />
						</Header>
						<FavoriteContainer>
							{favoriteAnime?.map((anime) => {
								return (
									<Favorites key={anime.id}>
										<img src={anime.image} alt='anime-poster' />
										<p>{anime.name}</p>
										<button
											onClick={() => handleDeleteContent(anime, 'favorite')}
										>
											x
										</button>
									</Favorites>
								);
							})}
						</FavoriteContainer>

						<div>
							<Header>
								Bookmarked &nbsp; <FaBookmark />
							</Header>

							<BookmarkContainer>
								{bookmarkAnime?.map((anime) => {
									return (
										<Bookmarks key={anime.id}>
											<img src={anime.image} alt='anime-poster' />
											<p>{anime.name}</p>
											<button
												onClick={() => handleDeleteContent(anime, 'bookmarks')}
											>
												x
											</button>
										</Bookmarks>
									);
								})}
							</BookmarkContainer>
						</div>

						<Header>
							Watched List &nbsp; <AiFillEye />
						</Header>

						<WatchedContainer>
							{watchedAnime?.map((anime) => {
								return (
									<WatchedList key={anime.id}>
										<img src={anime.image} alt='anime-poster' />
										<p>{anime.name}</p>
										<button
											onClick={() => handleDeleteContent(anime, 'isWatched')}
										>
											x
										</button>

										<Rating anime={anime} />
									</WatchedList>
								);
							})}
						</WatchedContainer>
					</ListWrapper>
				</Container>
			)}
		</>
	);
};

export default Profile;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	h2 {
		font-family: 'Poppins', sans-serif;
		text-align: center;
		text-transform: uppercase;
		font-size: 35px;
	}
`;

const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 2em 0 2em 0;
`;

const Name = styled.p`
	text-align: center;
	text-transform: uppercase;
	font-family: 'Poppins', sans-serif;
	font-size: 30px;
	span {
		font-weight: 900;
		font-size: 30px;
		color: #ff6200;
		font-family: 'Poppins', sans-serif;
		text-decoration: underline;
	}
`;

const TierChartContainer = styled.div`
	border: 5px solid var(--purple);
	border-radius: 10px;
	padding-left: 2em;
	padding-right: 2em;
	background-color: var(--blue);
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const Chart = styled.h2`
	color: white;
	text-decoration: underline;
	text-align: center;
`;

const Tier3 = styled.h2`
	color: white;
	font-family: 'Poppins', sans-serif;
	span {
		color: #8b4513;
	}
`;

const Tier2 = styled.h2`
	color: white;
	font-family: 'Poppins', sans-serif;
	span {
		color: #ffa812;
	}
`;

const Tier1 = styled.h2`
	color: white;
	font-family: 'Poppins', sans-serif;
	span {
		color: #b9f2ff;
	}
`;

const Tier0 = styled.h2`
	color: white;
	font-family: 'Poppins', sans-serif;
	span {
		color: #c7020c;
	}
`;

const TierSystem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const TierColor = styled.h2`
	color: ${({ userPoints }) => {
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
`;

const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 300px;
	margin-bottom: 300px;
`;
const Header = styled.h2``;

const FavoriteContainer = styled.div`
	display: grid;
	grid-template-columns: 200px 200px 200px 200px;
	justify-content: center;
	align-items: center;
	column-gap: 4rem;
	row-gap: 3rem;
`;

const Favorites = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	border: 1px solid black;
	button {
		cursor: pointer;
		width: 100%;
		padding: 10px;
		padding-left: 15px;
		padding-right: 15px;
		background-color: var(--orange);
		color: var(--white);
		border: none;
		font-size: 20px;
		text-align: center;
		&:hover {
			background-color: var(--purple);
		}
	}
	img {
		max-height: 400px;
		width: 100%;
	}
	p {
		text-align: center;
		font-size: 25px;
		text-transform: uppercase;
		font-weight: 900;
		font-family: 'Poppins', sans-serif;
		color: #ff6200;

		--max-lines: 1;
		display: -webkit-box;
		overflow: scroll;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: var(--max-lines);
	}
`;

const BookmarkContainer = styled.div`
	display: grid;
	grid-template-columns: 200px 200px 200px 200px;
	justify-content: center;
	align-items: center;
	column-gap: 4rem;
	row-gap: 3rem;
	max-height: fit-content;
`;

const Bookmarks = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	border: 1px solid black;
	button {
		cursor: pointer;
		width: 100%;
		padding: 10px;
		padding-left: 15px;
		padding-right: 15px;
		background-color: var(--orange);
		color: var(--white);
		border: none;
		font-size: 20px;
		text-align: center;
		&:hover {
			background-color: var(--purple);
		}
	}
	img {
		max-height: 400px;
		width: 100%;
	}
	p {
		text-align: center;
		font-size: 25px;
		text-transform: uppercase;
		font-weight: 900;
		font-family: 'Poppins', sans-serif;
		color: #ff6200;
	}
`;

const WatchedContainer = styled.div`
	display: grid;
	grid-template-columns: 200px 200px 200px 200px;
	justify-content: center;
	align-items: center;
	column-gap: 4rem;
	row-gap: 3rem;
	max-height: fit-content;
`;

const WatchedList = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	border: 1px solid black;
	button {
		cursor: pointer;
		width: 100%;
		padding: 10px;
		padding-left: 15px;
		padding-right: 15px;
		background-color: var(--orange);
		color: var(--white);
		border: none;
		font-size: 20px;
		text-align: center;
		&:hover {
			background-color: var(--purple);
		}
	}
	img {
		max-height: 400px;
		width: 100%;
	}
	p {
		text-align: center;
		font-size: 25px;
		text-transform: uppercase;
		font-weight: 900;
		font-family: 'Poppins', sans-serif;
		color: #ff6200;
	}
`;
