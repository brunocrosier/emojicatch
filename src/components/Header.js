import styled, { keyframes } from "styled-components"

const pulse = keyframes`
    0% {
      background-size: 100% 100%;
  }
  100% {
    background-size: 150% 150%;
  }
`

const Header = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  background: radial-gradient(rgb(181, 155, 219), rgb(145, 77, 173));
  box-shadow: 0px 0px 15px #63207f;
  padding: 2rem 20vw;
  animation: ${pulse} 1.2s ease-in-out infinite alternate both;
  @media (max-width: 768px) {
    form {
      grid-column: 1/3;
    }
    padding: 1rem;
  }
`

export default Header
