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
  padding: 5px 5px 5px 15px;
	border: none;
	font-size: 20px;
	text-align: center;
	font-family: 'Poppins', sans-serif;
`;
