import React, { useState, useEffect } from "react"
//import DomainResults from "./components/DomainResults"
import SearchField from "./components/SearchField"
import "emoji-mart/css/emoji-mart.css"
import { Picker } from "emoji-mart"
import posed from "react-pose"
import styled from "styled-components"

const GridStyled = styled.div`
  background: linear-gradient(30deg, #914dad, #b59bdb);
  min-height: 100vh;
  display: grid;
  padding: 0vw 4vw;
  grid-template-columns: [main] 1fr;
  grid-template-rows: [top] 30vh [domainresults] 1fr;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: [input] 1fr [searchbutton] 20vw;
  grid-template-rows: [h1] 1fr [toggle] 40px 1fr;
`

const ToggleEmoji = styled.p`
  text-align: right;
  grid-row-start: toggle;
  a {
    color: white;
  }
`

const SubmitButton = styled.button`
  height: 70px;
  border: 0px;
  background: #ff72bf;
  color: white;
  font-size: 40px;
  font-weight: 700;
  border-radius: 0px 50px 50px 0px;
`

const EmojiContainer = posed.div({
  visible: {
    y: 0,
    opacity: 1,
    delay: 0,
    transition: {
      y: { type: "spring", stiffness: 1000, damping: 15 },
      default: { duration: 100 }
    },
    applyAtStart: { display: "block" }
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
    applyAtEnd: { display: "none" }
  }
})

const SingleDomain = styled.div`
  border-radius: 20px;
  background: white;
  padding: 10px 20px;
  margin: 10px;
  height: max-content;
`

const App = () => {
  const domainEndings = [
    ".ws",
    ".ga",
    ".cf",
    ".tk",
    ".ml",
    ".gq",
    ".kz",
    ".st",
    ".fm",
    ".je"
  ]

  const [domainString, setDomainString] = useState("")
  const [domainsArray, setDomainsArray] = useState([])
  const [lookedUpDomainsArray, setLookedUpDomainsArray] = useState([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    document.title = domainString
  })

  const handleDomainChange = event => {
    setDomainString(event.target.value)
    setDomainsArray(
      domainEndings.map(ending => event.target.value.trim() + ending)
    )
  }

  const runDomainLookup = fullUrl => {
    return fetch(
      `https://domainr.p.rapidapi.com/v2/status?domain=${fullUrl}&mashape-key=2ddd8493aemsh9c8c14d07283191p1bf80ajsn8c5449b7f056`
    )
      .then(res => res.json())
      .then(data => {
        setLookedUpDomainsArray(prevArray => [
          ...prevArray,
          {
            url: data.status[0].domain,
            status: data.status[0].status
          }
        ])
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLookedUpDomainsArray([])
    domainsArray.map(b => runDomainLookup(b))
  }

  const buttonHandleSubmit = e => {
    setLookedUpDomainsArray([])
    domainsArray.map(b => runDomainLookup(b))
  }

  const inputEl = React.useRef(null)

  const onButtonClick = event => {
    inputEl.current.focus()
  }

  return (
    <GridStyled>
      <Header>
        <h1
          style={{
            color: "white",
            gridRowStart: "h1",
            textAlign: "center",
            gridColumnStart: "input",
            gridColumnEnd: 3
          }}
        >
          Emoji Domain Search
        </h1>
        <ToggleEmoji
          onClick={event => {
            setExpanded(!expanded)
            onButtonClick(event)
          }}
        >
          <a href="#">Select Emoji</a>
        </ToggleEmoji>
        <form style={{ gridColumnStart: "input" }} onSubmit={handleSubmit}>
          <SearchField
            ref={inputEl}
            value={domainString}
            placeholder="Add emojis or text here!"
            onChange={event => {
              handleDomainChange(event)
            }}
          />
        </form>
        <SubmitButton
          onClick={() => {
            buttonHandleSubmit()
            if (expanded) {
              setExpanded(!expanded)
            }
          }}
        >
          Search
        </SubmitButton>
      </Header>

      <EmojiContainer
        style={{ position: "absolute", textAlign: "right" }}
        pose={expanded ? "visible" : "hidden"}
      >
        <Picker
          set="emojione"
          onSelect={e => {
            const start = inputEl.current.selectionStart
            const end = inputEl.current.selectionEnd

            setDomainString(
              prevString =>
                prevString.substring(0, start) +
                e.native +
                prevString.substring(end, prevString.length)
            )

            setDomainsArray(
              domainEndings.map(
                ending =>
                  domainString.substring(0, start) +
                  e.native +
                  domainString.substring(end, domainString.length) +
                  ending
              )
            )

            inputEl.current.focus()

            setTimeout(
              () =>
                inputEl.current.setSelectionRange(
                  start + e.native.length,
                  end + e.native.length
                ),
              10
            )
          }}
        />
      </EmojiContainer>

      <div
        style={{
          gridColumnStart: "main",
          gridRowStart: "domainresults",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "start",
        }}
      >
        {lookedUpDomainsArray &&
          lookedUpDomainsArray.map((domain, index) => {
            return (
              <SingleDomain key={index}>
                <span>
                  {domain.url} is {domain.status}
                </span>
              </SingleDomain>
            )
          })}
      </div>
    </GridStyled>
  )
}

export default App
