import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';

const Forum = () => {
	const { user, isAuthenticated } = useAuth0();
	const [input, setInput] = useState('');
	const [feed, setFeed] = useState([]);

	const inputHandler = (e) => {
		setInput(e.target.value);
	};

	useEffect(() => {});

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('/api/comment', {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				input: input,
				email: user.email,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status < 300) {
					setInput('');
					setFeed(data.data);
				} else {
					console.log(data.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			{!isAuthenticated ? (
				<h2>Loading...</h2>
			) : (
				<MainContainer>
					<Header>Forum Page</Header>
					<Content>
						<Form onSubmit={(e) => handleSubmit(e)}>
							<Name>{user?.name}</Name>
							<TextArea
								name='reply'
								placeholder="What's happening?"
								rows='4'
								cols='30'
								onChange={inputHandler}
								value={input}
							/>
							<ButtonContainer>
								<CharacterCount input={input}>
									{100 - input.length}
								</CharacterCount>
								<ButtonSubmit type='submit' disabled={input.length >= 100}>
									send
								</ButtonSubmit>
							</ButtonContainer>
						</Form>
					</Content>

					<PageContainer>
						{feed.map((message) => {
							return (
								<PageBox key={Math.floor(Math.random() * 1400000000)}>
									<Text>
										<span>{message.email}</span>: {message.message}
									</Text>
								</PageBox>
							);
						})}
					</PageContainer>
				</MainContainer>
			)}
		</>
	);
};

export default Forum;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const Header = styled.h1`
	text-transform: uppercase;
	color: var(--orange);
	font-family: 'Poppins', sans-serif;
`;
const Name = styled.h2`
	color: var(--blue);
	font-family: 'Poppins', sans-serif;
`;
const Content = styled.div`
	border: 1px solid black;
	margin-bottom: 50px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: rgb(242, 186, 147);
	background: linear-gradient(
		90deg,
		rgba(242, 186, 147, 1) 0%,
		rgba(231, 134, 77, 0.3772102591036415) 53%,
		rgba(255, 1, 1, 0.7469362745098039) 100%
	);
`;

const TextArea = styled.textarea`
	border: none;
	width: fit-content;
	padding-top: 1em;
	padding-left: 1em;
	padding-right: 1em;
	font-size: 20px;
	font-family: 'Poppins', sans-serif;
	resize: none;
	background-color: var(--white);
`;
const CharacterCount = styled.p`
	text-align: center;
	font-size: 20px;
	font-weight: 900;
	color: midnightblue;
	color: ${({ input }) => {
		if (input.length < 70) {
			return 'midnightblue';
		}
		if (input.length >= 70 && input.length < 100) {
			return 'yellow';
		} else {
			return 'red';
		}
	}};
`;
const ButtonSubmit = styled.button`
	background-color: var(--blue);
	color: var(--white);
	border-radius: 10px;
	font-weight: 900;
	font-size: 20px;
	text-align: center;
	&:hover {
		color: var(--orange);
		cursor: pointer;
	}
	:disabled {
		cursor: not-allowed;
		background-color: lightgray;
	}
`;
const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	font-family: 'Poppins', sans-serif;
	column-gap: 1em;
	margin: 1em 0 1em 0;
`;

const PageContainer = styled.div`
	border: 5px solid gainsboro;
	background-color: seashell;
	width: 50%;
	height: 500px;
	margin: 0 0 5em 0;
	border-radius: 20px;
	--max-lines: 50;
	display: -webkit-box;
	overflow: scroll;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: var(--max-lines);
`;

const PageBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border: 2px solid var(--purple);
	border-radius: 30px;
  margin: 1em 0 1em 1em;
	width: fit-content;
	background-color: white;
`;
const Text = styled.p`
	display: flex;
	justify-content: flex-start;
	font-size: 15px;
  padding-left: 1em;
  padding-right: 1em;
	font-family: 'Poppins', sans-serif;
	span {
		color: var(--orange);
		font-weight: 900;
		font-family: 'Poppins', sans-serif;
	}
`;
