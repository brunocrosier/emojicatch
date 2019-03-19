import styled from "styled-components"

const Header = styled.div`
  display: grid;
  background: linear-gradient(30deg, #914dad, #b59bdb);
  grid-template-columns: [input] 1fr [searchbutton] min-content;
  grid-template-rows: [h1] max-content [toggle] max-content [search] max-content;
  box-shadow: 0px 0px 15px #63207f;
  padding: 2rem;
  @media (max-width: 768px) {
    form {
      grid-column: 1/3;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
`

export default Header
