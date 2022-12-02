import { useEffect } from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import styled from 'styled-components';

const GoTop = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

	return (
		<>
			<Arrow>
				<BsFillArrowUpCircleFill
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
					}}
					style={{
						color: 'white',
						width: '50px',
						height: '50px',
						position: 'absolute',
            cursor:"pointer"
					}}
				/>
			</Arrow>
		</>
	);
};

export default GoTop;

const Arrow = styled.div`
position: relative;
left: 50%;
bottom: 170px;
`;