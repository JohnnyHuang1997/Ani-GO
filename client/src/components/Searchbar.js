import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
	const [value, setValue] = useState('');
	const navigate = useNavigate();

	const handleSelect = (suggestion) => {
		setValue('');
		navigate(`/search-result/${suggestion}`);
		navigate(0);
	};

	return (
		<>
			<Container>
				<Input
					type='search'
					placeholder='Search your Anime'
					value={value}
					onChange={(event) => setValue(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							handleSelect(event.target.value);
						}
					}}
				/>
				<Button onClick={() => setValue('')}>Clear</Button>
			</Container>
		</>
	);
};

export default Searchbar;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Input = styled.input`
	border-radius: 30px;
	padding: 15px;
	padding-left: 100px;
	padding-right: 100px;
  border: none;
  margin-right: 20px;
  font-size: 25px;
  font-family: 'Poppins', sans-serif;
`;
const Button = styled.button`
border-radius: 30px;
	padding: 15px;
  padding-left: 20px;
	padding-right: 20px;
  border: none;
  cursor: pointer;
  background-color: white;
  color: #ff6200;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 900;
`;