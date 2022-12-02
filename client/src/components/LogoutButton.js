import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();

	return isAuthenticated && <Button onClick={() => logout()}>Sign Out</Button>;
};

export default LogoutButton;

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