import GlobalStyle from './GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Forum from './Forum';
import Browse from './Browse';
import Footer from './Footer';
import Profile from './Profile';
import AnimePage from './AnimePage';
import ErrorPage from './ErrorPage';
import SearchResult from './SearchResult';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  
	const {isAuthenticated } = useAuth0();

	return (
		<>
      <BrowserRouter>
				<GlobalStyle />
        <Navbar />
				<Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/anime/:animeId" element={<AnimePage/>}/>
          <Route path="/about" element={<About/>} />
          {isAuthenticated && <Route path="/forum" element={<Forum/>} />}
          <Route path="/browse" element={<Browse/>} />
          {isAuthenticated && <Route path="/profile" element={<Profile/>}/>}
          <Route path="/search-result/:searchId" element={<SearchResult/>}/>
          <Route path="/error-page" element={<ErrorPage/>}/>
        </Routes>
        <Footer/>
			</BrowserRouter>
		</>
	);
};

export default App;
