import styled from "styled-components"

const SearchField = styled.input`
  border-radius: 50px 0px 0px 50px;
  width: 100%;
  grid-column-start: 1;
  min-height: 70px;
  font-family: 'AirbnbCereal-Book', sans-serif;
  font-size: 2.4rem;
  text-align: center;
  border: 0px;
  padding: 0px;
  box-shadow: 0px 0px 10px pink;
  transition: 0.5s;
  outline: transparent;
  :focus {
    box-shadow: 0px 0px 20px purple;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

export default SearchField
