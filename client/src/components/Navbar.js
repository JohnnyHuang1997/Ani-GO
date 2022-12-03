import Logo from './Logo';
import DarkMode from './DarkMode';
import Searchbar from './Searchbar';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink, useNavigate } from 'react-router-dom';


const Navbar = () => {

	const navigate = useNavigate();

	const { isLoading, error, user } = useAuth0();

	return (
		<MainContainer>

			<LogoContainer
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					navigate('/');
				}}
			>
				<Logo />
        
			</LogoContainer>

			<NavbarWrapper>
				<DarkMode />
				<Searchbar />

				<Link to='/' end>
					Home
				</Link>
				<Link to='/about'>About</Link>
				{user && <Link to='/forum'>Forum</Link>}

				<Link to='/browse'>Browse</Link>
				<div>
					{error && <h2>Authentication Error</h2>}
					{!error && isLoading && <h2>Loading...</h2>}
					{!error && !isLoading && (
						<>
							<LoginButton />
							<LogoutButton />
						</>
					)}
				</div>
				{user && <Link to={'/profile'}>MyProfile</Link>}
			</NavbarWrapper>
      
		</MainContainer>
	);
};

export default Navbar;

const MainContainer = styled.nav`
	background: rgb(242, 186, 147);
	background: linear-gradient(
		90deg,
		rgba(242, 186, 147, 1) 0%,
		rgba(231, 134, 77, 0.3772102591036415) 53%,
		rgba(255, 1, 1, 0.7469362745098039) 100%
	);
	padding: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
  align-items: center;
  /* width: fit-content; */
  gap: 5em;
`;
const LogoContainer = styled.div`
	cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NavbarWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const Link = styled(NavLink)`
	text-decoration: none;
	color: #630000;
	font-size: 30px;
	margin-left: 20px;
	margin-right: 20px;
	&:hover {
		color: #e5db89;
	}
	&.active {
		color: #e5db89;
	}
`;
