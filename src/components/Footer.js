import React from "react"
import styled from "styled-components"


const StyledFooter = styled.p`
  color: purple;
  font-size: 50px;
  font-family: Josefin Sans;
  font-weight: 700;
  justify-self: center;
`

const Footer = () => {
  return <StyledFooter>Made with ☕ & 🥐 by @brunezy</StyledFooter>
}

export default Footer
