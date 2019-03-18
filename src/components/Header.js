import styled from "styled-components"

const Header = styled.div`
  display: grid;
  grid-template-columns: [input] 1fr [searchbutton] min-content;
  grid-template-rows: [h1] max-content [toggle] max-content [search] max-content;
  @media (max-width: 768px) {
    form {
      grid-column: 1/3;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
`

export default Header
