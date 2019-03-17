import React from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
  display: flex;
  border-radius: 20px;
  background: white;
  padding: 10px 20px;
  margin: 10px;
  height: max-content;
  box-shadow: 0px 0px 5px #7f28c3;
  color: white;
`
const SingleDomain = props => {
  let available = false

  props.domain.status === "undelegated inactive" && (available = true)
  props.domain.status === "inactive" && (available = true)

  return (
    <StyledDiv
      style={{
        background: available
          ? "linear-gradient(200deg,#d7ffb9, #3ff23f)"
          : "linear-gradient(220deg,#fa7676,#ff2822)",
      }}
    >
      <span>
        {props.domain.url} is {props.domain.status}
      </span>
    </StyledDiv>
  )
}

export default SingleDomain
