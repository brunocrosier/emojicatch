import styled from "styled-components"

const GridStyled = styled.div`
  background: radial-gradient(#ffffff,#ecdef7);
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-columns: [main] 1fr;
  grid-template-rows: [top] minmax(min-content,max-content) [domainresults] 1fr [footer] minmax(min-content,max-content);
  overflow-x: hidden;
  overflow-y: auto;
`

export default GridStyled
