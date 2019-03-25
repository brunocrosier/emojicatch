import styled from "styled-components"

const Title = styled.img`
  max-width: 25vw;
  justify-self: center;
  :hover {
    cursor: pointer;
  }
  grid-column: 1/3;
  @media (max-width: 768px) {
    max-width: 80vw;
  }
`

export default Title
