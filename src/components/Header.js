import styled, { keyframes } from "styled-components"

const theAnim = keyframes`
0% {
    filter: hue-rotate(0deg);
}
100% {
    filter: hue-rotate(360deg);
}
`

const pulse = keyframes`
    0% {
      background-size: 100% 100%;
  }
  100% {
    background-size: 150% 100%;
  }
`

const Header = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  background: linear-gradient(30deg,#f5afd6,#914dad);
  box-shadow: 0px 0px 15px #63207f;
  padding: 2rem 10vw;
  animation: ${pulse} 1.2s ease-in-out infinite alternate both;
  @media (max-width: 768px) {
    form {
      grid-column: 1/3;
    }
    padding: 1rem;
  }
`

export default Header
