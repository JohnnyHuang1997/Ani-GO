import styled from "styled-components";
import { FaBomb } from "react-icons/fa";

const ErrorPage = () => {
  
  return (
    <>
      <Container>
        <FaBomb style={{ width: "150px", height: "150px" }}></FaBomb>&nbsp;
        <Message>An unknown error has occurred.</Message>
        <p>
          Please try refreshing the page, or <br/>
          <a href="https://www.concordia.ca/contact.html">contact support</a> if
          the problem persists.
        </p>
      </Container>
    </>
  );
}

export default ErrorPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 175px;
  height: 100vh;
  p{
    font-size: 50px;
  }
  a {
    text-align: center;
    font-size: 50px;
    color: hsl(258deg, 100%, 50%);
    text-decoration: underline;
  }
  a:hover {
    background-color: hsl(258deg, 100%, 90%);
    color: goldenrod;
    border-radius: 20px;
  }
`;
const Message = styled.p`
  font-weight: bold;
  font-size: 50px;
`;
