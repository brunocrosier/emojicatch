import styled from "styled-components"

const GridStyled = styled.div`
  background: linear-gradient(30deg, #914dad, #b59bdb);
  min-height: 100vh;
  display: grid;
  padding: 0vw 4vw;
  grid-template-columns: [main] 1fr;
  grid-template-rows: [top] minmax(30vh, 1fr) [domainresults] 2fr;
  overflow: hidden;
`

export default GridStyled
