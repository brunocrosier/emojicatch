import React, { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import punycode from "punycode"

const pulse = keyframes`
    0% {
    background: #19dcea;
  }
  33.3333% {
    background: #b22cff;
  }
  66.666% {
    background: #ea2222;
  }
  100% {
    background: #f5be10;
  }
`

const Skeleton = styled.div`
  display: flex;
  border-radius: 50px;
  min-height: 1.5rem;
  background: linear-gradient(30deg, #cccccc, #fefefe);
  padding: 10px 20px;
  margin: 10px;
  height: max-content;
  box-shadow: 0px 0px 2px white;
  color: white;
  font-family: "sofia-pro", sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  text-decoration: none;
  :hover {
    box-shadow: 0px 0px 10px #7f28c3;
  }
  animation: ${pulse} 3s linear infinite alternate both;
  span {
    opacity: 0.5;
  }
`

const enterAnim = keyframes`
{
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: ${props => props.opacity};
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: ${props => props.opacity};
    transform: scale3d(1, 1, 1);
  }
}
`

const StyledA = styled.a`
  display: flex;
  border-radius: 50px;
  background: ${props => props.background};
  opacity: ${props => props.opacity};
  padding: 10px 20px;
  margin: 10px;
  height: max-content;
  /* box-shadow: 0px 0px 2px #7f28c3; */
  color: white;
  font-family: "sofia-pro", sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  text-decoration: none;
  :hover {
    box-shadow: 0px 0px 10px #7f28c3;
  }
  animation: ${enterAnim} 0.75s linear;
`
const SingleDomain = props => {
  const [isAvailable, setIsAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const runDomainLookup = fullUrl => {
    return fetch(`/lookup/${fullUrl}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "available") {
          setIsAvailable(true)
        }
        setIsLoading(false)
      })
      .catch(err => console.warn("hey bruno", err))
  }

  // let ending = props.domain.match(/\.[^.]{2,3}(?:\.[^.]{2,3})?$/gi).toString()

  useEffect(() => {
    runDomainLookup(props.domain)
  })

  let background
  let opacity = 1

  if (isAvailable) {
    background = "linear-gradient(30deg, rgb(255, 73, 224), rgb(10, 255, 255))"
  } else if (isLoading) {
    background = "linear-gradient(200deg,#7427b0,#00BCD4)"
  } else {
    background = "linear-gradient(220deg,#fa7676,#ff2822)"
    opacity = 0.3
  }


  if (isLoading) {
    return (
      <Skeleton>
        <span style={{ color: "transparent" }}>
          {punycode.toUnicode(props.domain)}
        </span>
      </Skeleton>
    )
  } else {
    return (
      <StyledA
        background={background}
        opacity={opacity}
        href={`http://${props.domain}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{punycode.toUnicode(props.domain)}</span>
      </StyledA>
    )
  }

}

export default SingleDomain
