import styled from "styled-components"

const GridStyled = styled.div`
  background: linear-gradient(30deg, #eeeeee, #dddddd);
  min-height: 100vh;
  display: grid;
  grid-template-columns: [main] 1fr;
  grid-template-rows: [top] minmax(min-content,max-content) [domainresults] 1fr [footer] minmax(min-content,max-content);
  overflow: hidden;
`

export default GridStyled
