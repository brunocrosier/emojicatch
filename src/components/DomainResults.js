import React from "react"
import styled from "styled-components"
import SingleDomain from "./SingleDomain"

const StyledDomainResults = styled.div`
  grid-column-start: main;
  grid-row-start: domainresults;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: start;
  padding-top: 1rem;
`

const DomainResults = (props) => {
  return (
  <StyledDomainResults>
      {props.lookedUpDomainsArray &&
          props.lookedUpDomainsArray.map((domain, index) => {
            return <SingleDomain key={index} domain={domain} />
          })}
  </StyledDomainResults>
  )
}

export default DomainResults
