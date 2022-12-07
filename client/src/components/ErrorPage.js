import styled from "styled-components";
import { FaBomb } from "react-icons/fa";

const ErrorPage = () => {
  
  return (
    <>
      <Container>
        <FaBomb style={{ width: "150px", height: "150px" }}></FaBomb>&nbsp;
        <Message>An unknown error has occurred.</Message>
        <p>
          Please try refreshing the page!
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
  height: 100vh;
  p{
    font-size: 50px;
    text-align: center;
  }
`;
const Message = styled.p`
  font-weight: bold;
  font-size: 50px;
  text-align: center;
`;
