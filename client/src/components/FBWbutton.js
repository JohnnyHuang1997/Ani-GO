import { FaBookmark } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';

const FBW = ({anime, addFavorite, addBookmark, addIsWatch}) => {

	return (
		<ButtonWrapper>
			<Button onClick={() => addFavorite(anime)}>
				<AiFillStar
					style={{
						width: '30px',
						height: '30px',
						backgroundColor: 'white',
						borderRadius: '8px',
            color: 'var(--orange)',
						cursor: 'pointer',
					}}
				/>
			</Button>

			<Button onClick={() => addBookmark(anime)}>
				<FaBookmark
					style={{
						width: '30px',
						height: '30px',
						backgroundColor: 'white',
						borderRadius: '8px',
            color: 'var(--orange)',
						cursor: 'pointer',
					}}
				/>
			</Button>

			<Watched onClick={() => addIsWatch(anime)}>Watched?</Watched>
		</ButtonWrapper>
	);
};

export default FBW;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	column-gap: 30px;
  padding-top: 20px;
`;
const Button = styled.button`
	border: none;
  &:hover {
    opacity: 0.6;
  }
`;
const Watched = styled.button`
	height: 37px;
	text-align: center;
	font-size: 20px;
	cursor: pointer;
	background-color: white;
	text-transform: uppercase;
	font-weight: 900;
  border: none;
  &:hover {
    opacity: 0.6;
  }
  &:focus {
    background-color: var(--purple);
    color: white;
  }
`;
