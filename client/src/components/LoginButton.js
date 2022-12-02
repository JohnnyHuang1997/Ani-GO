import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	return (
		!isAuthenticated && (
			<Button onClick={() => loginWithRedirect()}>Sign In</Button>
		)
	);
};

export default LoginButton;

const Button = styled.button`
	border: none;
	border-radius: 20px;
	font-size: 30px;
	padding: 5px;
	background-color: inherit;
	color: #630000;
	cursor: pointer;
	&:hover {
		color: #e5db89;
	}
`;
