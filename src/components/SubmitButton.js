import styled from "styled-components"

const SubmitButton = styled.button`
  padding: 0px 20px;
  display: flex;
  height: 70px;
  border: 0px;
  background: linear-gradient(20deg, #ea2988, #ff72bf);
  color: white;
  font-size: 2.4rem;
  font-weight: 700;
  border-radius: 0px 50px 50px 0px;
  box-shadow: 0px 0px 0px #9c27b0;
  transition: 0.5s;
  outline: transparent;
  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px #9c27b0;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    border-radius: 50px;
    justify-content: center;
  }
  span {
    width: max-content;
  }
`

export default SubmitButton
