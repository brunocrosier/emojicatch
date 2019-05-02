import React from "react"
import styled from "styled-components"

const StyledEmptyResults = styled.div`
  background: linear-gradient(30deg,#f564c81a,#ec64f50d);
  border-radius: 20px;
  border: 1px solid #dd64f52b;
  width: 75%;
  padding: 1.5rem;
  margin-top: 2rem;
  h1 {
      color: #8e59c7a8;
      font-size: 1.3rem;
      text-align: center;
  }
  p, a {
      color: #8e59c7a8;
      font-size: 1rem;
      text-align: center;
  }
  a {
      font-weight: 600;
  }
`

const EmptyResults = () => {
  return (
    <StyledEmptyResults>
     <h1>emoji domain search</h1>
     <p>a free, <a href="https://github.com/brunocrosier/emojicatch">open source</a> search tool to find every available emoji domain</p>
     <p></p>
    </StyledEmptyResults>
  )
}

export default EmptyResults
