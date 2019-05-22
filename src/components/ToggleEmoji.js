import styled from "styled-components"

const ToggleEmoji = styled.button`
  background: #ff568b;
  text-align: center;
  grid-row-start: 2;
  grid-column: 6/8;
  color: white;
  font-family: 'AirbnbCereal-ExtraBold', sans-serif;
  font-size: 1rem;
  border: 0px;
  border-radius: 0px 50px 50px 0px;
  outline: none;
  :hover {
    cursor: pointer;
  }
  p {
    text-decoration: none;
  }
`

export default ToggleEmoji
