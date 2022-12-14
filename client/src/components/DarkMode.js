import styled from 'styled-components';
import { BsFillMoonFill } from 'react-icons/bs';

const DarkMode = () => {
	let clickedClass = 'clicked';
	const body = document.body;
	const lightTheme = 'light';
	const darkTheme = 'dark';
	let theme;

	if (localStorage) {
		theme = localStorage.getItem('theme');
	}

	if (theme === lightTheme || theme === darkTheme) {
		body.classList.add(theme);
	} else {
		body.classList.add(lightTheme);
	}

	const switchTheme = (e) => {
		if (theme === darkTheme) {
			body.classList.replace(darkTheme, lightTheme);
			e.target.classList.remove(clickedClass);
			localStorage.setItem('theme', 'light');
			theme = lightTheme;
		} else {
			body.classList.replace(lightTheme, darkTheme);
			e.target.classList.add(clickedClass);
			localStorage.setItem('theme', 'dark');
			theme = darkTheme;
		}
	};

	return (
		<Dark
			className={theme === 'dark' ? clickedClass : ''}
			id='darkMode'
			onClick={(e) => switchTheme(e)}
		>
			<BsFillMoonFill style={{ width: '35px', height: '35px' }} />
		</Dark>
	);
};

export default DarkMode;

const Dark = styled.div`
	filter: grayscale(100%);
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;
  margin-right: 5em;
	transition: background-color 0.3s ease-in-out, filter 0.3s ease-in-out;
	&:hover {
		filter: none;
		cursor: pointer;
	}
	&:focus {
		filter: none;
		cursor: pointer;
	}
`;
