import React from "react"
import styled from "styled-components"

const StyledFooter = styled.div`
  color: white;
  width: 100%;
  font-size: 1.3rem;
  font-family: sofia-pro, segoe ui;
  font-display: swap;
  font-weight: 400;
  justify-self: center;
  background: linear-gradient(30deg, #914dad, #b59bdb);
  border-radius: 2rem;
  padding: 0.5rem 2rem;
  text-align: center;
  margin-bottom: 0;
  a {
    color: white;
    font-weight: 600;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <p>
      made by {" "}
      <a href="https://twitter.com/bruno_crosier">@bruno_crosier</a>
      </p>
    </StyledFooter>
  )
}

export default Footer
