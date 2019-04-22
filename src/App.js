import React, { useState, useEffect } from "react"
import SearchField from "./components/SearchField"
import "emoji-mart/css/emoji-mart.css"
import loadable from "@loadable/component"
import OutsideClickHandler from "react-outside-click-handler"
import ToggleEmoji from "./components/ToggleEmoji"
import GridStyled from "./components/GridStyled"
import Header from "./components/Header"
import SubmitButton from "./components/SubmitButton"
import EmojiContainer from "./components/EmojiContainer"
import Logo from "./components/Logo"
import Footer from "./components/Footer"
import DomainResults from "./components/DomainResults"

const EmojiPicker = loadable(() => import("./components/EmojiPicker"))

const App = () => {
  const domainEndings = [
    ".ws",
    ".to",
    ".ga",
    ".cf",
    ".tk",
    ".ml",
    ".gq",
    ".st",
    ".fm",
    ".je",
    ".gg"
  ]

  const [domainString, setDomainString] = useState("")
  const [domainsArray, setDomainsArray] = useState([])
  const [lookedUpDomainsArray, setLookedUpDomainsArray] = useState([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    document.title = domainString
  })

  const handleDomainInputChange = event => {
    setDomainString(event.target.value)
    setDomainsArray(
      domainEndings.map(ending => event.target.value.trim() + ending)
    )
  }

  const runDomainLookup = fullUrl => {
    return fetch(`https://now-express-example.brunocrosier.now.sh/lookup/${fullUrl}`)
      .then(res => res.json())
      .then(data => {
        setLookedUpDomainsArray(prevArray => [
          ...prevArray,
          {
            url: data.url,
            status: data.status
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


  const onPickerSelect = e => {
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

    setTimeout(
      () =>
        inputEl.current.setSelectionRange(
          start + e.native.length,
          end + e.native.length
        ),
      10
    )
  }


  return (
    <GridStyled>
      <Header>
        <Logo
          onClick={() => {
            setDomainString("")
            setDomainsArray([])
            setLookedUpDomainsArray([])
          }}
          src="/emoji-catch-logo.svg"
          alt="emojicatch logo"
        />
        <ToggleEmoji
          onClick={event => {
            setExpanded(!expanded)
          }}
        >
          open emoji picker
        </ToggleEmoji>
        <form
          style={{
            position: "relative",
            outline: "transparent",
            gridColumnStart: "input"
          }}
          onSubmit={handleSubmit}
        >
          <SearchField
            ref={inputEl}
            value={domainString}
            placeholder={"add emojis or text here!"}
            onChange={event => {
              handleDomainInputChange(event)
            }}
          />
          <EmojiContainer pose={expanded ? "visible" : "hidden"}>
            <OutsideClickHandler
              onOutsideClick={() => {
                expanded && setExpanded(false)
              }}
            >
              <EmojiPicker onPickerSelect={onPickerSelect} />
            </OutsideClickHandler>
          </EmojiContainer>
        </form>
        <SubmitButton
          onClick={() => {
            buttonHandleSubmit()
            if (expanded) {
              setExpanded(!expanded)
            }
          }}
        >
          <span role="img" aria-label="search">
            search
          </span>
        </SubmitButton>
      </Header>

      <DomainResults
        lookedUpDomainsArray={lookedUpDomainsArray}
      />
        
      <Footer />
    </GridStyled>
  )
}

export default App
