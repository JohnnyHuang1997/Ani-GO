import styled from 'styled-components';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import GoTop from './GoTop';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
	const navigate = useNavigate();

	return (
		<FooterContainer>

			<TextContainer>
				<Text
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						navigate('/');
					}}
				>
					Home
				</Text>
				<Text
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						navigate('/about');
					}}
				>
					About
				</Text>
        
        <Text
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						navigate('/browse');
					}}
				>
					Browse
				</Text>
			</TextContainer>

			<CompanyWrapper>
				<BsFacebook
					style={{
						color: 'pink',
						marginLeft: '15px',
						marginRight: '15px',
						width: '40px',
						height: '40px',
					}}
				/>
				<BsTwitter
					style={{
						color: 'pink',
						marginLeft: '15px',
						marginRight: '15px',
						width: '40px',
						height: '40px',
					}}
				/>
				<BsInstagram
					style={{
						color: 'pink',
						marginLeft: '15px',
						marginRight: '15px',
						width: '40px',
						height: '40px',
					}}
				/>
				<AniText>@Ani-GO 2022</AniText>
			</CompanyWrapper>

			<GoTop />
      
		</FooterContainer>
	);
};

export default Footer;

const FooterContainer = styled.footer`
	background: black;
	opacity: 0.8;
	padding: 100px;
`;
const TextContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;
const Text = styled.p`
	margin-left: 10px;
	margin-right: 10px;
	font-size: 20px;
	color: white;
  cursor: pointer;
  &:hover {
    color: pink;
  }
`;
const CompanyWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
const AniText = styled.p`
	color: white;
	font-size: 15px;
`;
