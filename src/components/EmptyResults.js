/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react"
import styled from "styled-components"

const WhyEmojis = styled.div`
  padding: 0 2rem;
  max-width: 90%;
  a {
    text-decoration: none;
    font-family: "AirbnbCereal-ExtraBold";
    color: rgb(255, 86, 139);
  }
  h1 {
    text-align: center;
    margin: 2.7rem 0;
  }
  h1 span {
    background-size: cover;
    background-image: linear-gradient(
      330deg,
      rgb(181, 155, 219),
      rgb(145, 77, 173)
    );
    font-family: "AirbnbCereal-ExtraBold";
    font-size: 1.7rem;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position: center center;
  }
  span.highlight {
    background: linear-gradient(
      177deg,
      transparent 66%,
      rgba(255, 86, 139, 0.8) 0
    );
  }
  span.bubble {
    background: #f7d5ff59;
    box-shadow: 0px 0px 1px #ff568b80;
    border-radius: 30px;
    padding: 2px 10px;
  }
  p,
  h3 {
    font-family: "AirbnbCereal-Book";
  }
  h3 {
    font-size: 1.3rem;
  }

  @media (min-width: 768px) {
    h1 span {
      font-size: 3rem;
    }
    h1 {
      margin: 4rem 0;
    }
    h3 {
      font-size: 1.5rem
    }
    p {
      font-size: 1.2rem
    }
  }
`

const EmptyResults = () => {
  return (
    <WhyEmojis>
      <h1>
        <span>why emoji domains?</span>
      </h1>
      <h3>
        they make sense in <span className="highlight">every</span> language{" "}
        <span style={{ verticalAlign: "middle", fontSize: "1.5rem" }}>🌐</span>
      </h3>
      <p>
        did you know the word for <span className="bubble">pineapple</span> in
        Arabic is <span className="bubble">أناناس</span> ? <br />
        <br />
        probably not - but an emoji domain like{" "}
        <a href="https://🍍.to">🍍.to</a> is instantly understood worldwide
      </p>

      <h3>
        they're short and sweet{" "}
        <span style={{ verticalAlign: "middle", fontSize: "1.5rem" }}>🍬</span>
      </h3>
      <p>which makes them more <span className="highlight">memorable</span> and brandable than traditional domains</p>
      <h1>
        <span>what about my old domain?</span>
      </h1>
      <h3>
        easy! set up a <span className="highlight">redirect</span>{" "}
        <span style={{ fontSize: "1.5rem" }}>👉</span>
      </h3>
      <p>
        no need to give up your old <span style={{fontFamily: "AirbnbCereal-ExtraBold"}}>.com</span> domain, just set up
        your emoji domain so that it redirects to it! <br />
        <br />
        check out how some of these big brands are doing it: <br />
        <br />
        </p>

        <div style={{textAlign: "center", lineHeight: "2.4rem", marginBottom: "4rem"}}> 

        <a href="http://🚿.ws">🚿.ws</a> redirects to ➡ <a href="https://frankbody.com">FrankBody.com</a> <br />
        <a href="http://👋.ws">👋.ws</a> redirects to ➡ <a href="https://MailChimp.com">MailChimp.com</a> <br />
        <a href="http://👔.ws">👔.ws</a> redirects to ➡ <a href="https://VanHeusen.com">VanHeusen.com</a> <br />
        <a href="http://👓.ws">👓.ws</a> redirects to ➡ <a href="https://WarbyParker.com">WarbyParker.com</a> <br />
        <a href="http://❤.je">❤.je</a> redirects to ➡ <a href="/">EmojiCatch.com</a>
        <br />
        </div>
    </WhyEmojis>
  )
}

export default EmptyResults
