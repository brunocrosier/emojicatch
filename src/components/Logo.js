import styled from "styled-components"

const Logo = styled.img`
  max-width: 25vw;
  max-height: 18vw;
  justify-self: center;
  :hover {
    cursor: pointer;
  }
  grid-column: 1/8;
  @media (max-width: 768px) {
    max-width: 80vw;
  }
`

export default Logo
