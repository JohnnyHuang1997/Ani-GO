import styled from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Spinner = () => {
	return (
		<>
			<Spin>
				<AiOutlineLoading3Quarters
					className='spinner'
					style={{ width: '200px', height: '200px' }}
				/>
			</Spin>
		</>
	);
};

export default Spinner;

const Spin = styled.h1`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	left: 4%;
	height: 100vh;
	color: rgb(242, 186, 147);
	color: linear-gradient(
		90deg,
		rgba(242, 186, 147, 1) 0%,
		rgba(231, 134, 77, 0.3772102591036415) 53%,
		rgba(255, 1, 1, 0.7469362745098039) 100%
	);
	.spinner {
		animation: spin infinite 2s linear;
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
