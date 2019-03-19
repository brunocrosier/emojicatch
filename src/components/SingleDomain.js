import React from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
  display: flex;
  border-radius: 50px;
  background: white;
  padding: 10px 20px;
  margin: 10px;
  height: max-content;
  box-shadow: 0px 0px 2px #7f28c3;
  color: white;
  font-size: 1.5rem;
  /* transition: 0.5s; */
  :hover {
    box-shadow: 0px 0px 10px #7f28c3;
  }
`
const SingleDomain = props => {
  let available = false

  props.domain.status === "undelegated inactive" && (available = true)
  props.domain.status === "inactive" && (available = true)

  let ending = props.domain.url
    .match(/\.[^.]{2,3}(?:\.[^.]{2,3})?$/gi)
    .toString()

  if (available === true && ending === ".to") {
    return (
    <a style={{textDecoration: "none"}} href={`https://register.to/cart.php?a=add&domain=register&query=${props.domain.url}`} target="_blank">
      <StyledDiv
        style={{
          background: available
            ? "linear-gradient(200deg, rgb(160, 243, 114), rgb(0, 177, 2))"
            : "linear-gradient(220deg,#fa7676,#ff2822)"
        }}
      >
        
          <span>{props.domain.url}</span>
        
      </StyledDiv>
      </a>
    )
  } else {
    return (
      <a style={{textDecoration: "none"}} href={`http://${props.domain.url}`} target="_blank" rel="noopener noreferrer" >
      <StyledDiv
        style={{
          background: available
            ? "linear-gradient(200deg, rgb(160, 243, 114), rgb(0, 177, 2))"
            : "linear-gradient(220deg,#fa7676,#ff2822)"
        }}
      >
        <span>{props.domain.url}</span>
      </StyledDiv>
      </a>
    )
  }
}

export default SingleDomain
