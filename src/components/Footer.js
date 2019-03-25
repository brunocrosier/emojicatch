import React from "react"
import styled from "styled-components"

const StyledFooter = styled.p`
  color: white;
  font-size: 1.3rem;
  font-family: sofia-pro;
  font-weight: 400;
  justify-self: center;
  background: linear-gradient(30deg, #914dad, #b59bdb);
  border-radius: 2rem;
  padding: 0.5rem 2rem;
  text-align: center;
  margin-bottom: 1rem;
  a {
    color: white;
    font-weight: 600;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      made with ☕ & 🥐 by {" "}
      <a href="https://twitter.com/bruno_crosier">@bruno_crosier</a>
    </StyledFooter>
  )
}

export default Footer
