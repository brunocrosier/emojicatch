import React from "react"
import styled from "styled-components"
import SingleDomain from "./SingleDomain"
import EmptyResults from "./EmptyResults"

const StyledDomainResults = styled.div`
  /* grid-column-start: main;
  grid-row-start: domainresults; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: start;
  padding-top: 1rem;
`

const DomainResults = props => {
  return (
    <StyledDomainResults>
      {props.domainInputString.length > 0 &&
        props.domainsArray.map(domain => {
          return <SingleDomain key={domain} domain={domain} />
        })}

      {props.domainInputString.length === 0 && <EmptyResults />}
    </StyledDomainResults>
  )
}

export default DomainResults
