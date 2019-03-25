import React, { useState, useEffect } from "react"
import SearchField from "./components/SearchField"
import "emoji-mart/css/emoji-mart.css"
import { Picker } from "emoji-mart"
import OutsideClickHandler from "react-outside-click-handler"
import ToggleEmoji from "./components/ToggleEmoji"
import GridStyled from "./components/GridStyled"
import Header from "./components/Header"
import SubmitButton from "./components/SubmitButton"
import EmojiContainer from "./components/EmojiContainer"
import SingleDomain from "./components/SingleDomain"
import Title from "./components/Title"
import Footer from './components/Footer'

const App = () => {
  const domainEndings = [".ws", ".to", ".ga", ".cf", ".tk", ".ml", ".gq", ".st", ".fm", ".je", ".gg"]

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

    inputEl.current.focus()

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
        <Title
          onClick={() => {
            setDomainString("")
            setDomainsArray([])
            setLookedUpDomainsArray([])
          }}
          src="/emoji-catch-logo.svg" alt="emojicatch logo"
        />
        <ToggleEmoji
          onClick={event => {
            setExpanded(!expanded)
            onButtonClick(event)
          }}
        >
          open emoji picker
        </ToggleEmoji>
        <form
          style={{ position: "relative", outline: "transparent", gridColumnStart: "input" }}
          onSubmit={handleSubmit}
        >
          <SearchField
            ref={inputEl}
            value={domainString}
            placeholder={"add emojis or text here!"}
            onChange={event => {
              handleDomainChange(event)
            }}
          />
          <EmojiContainer
        pose={expanded ? "visible" : "hidden"}
      >
        <OutsideClickHandler
          onOutsideClick={() => {
            expanded && setExpanded(false)
          }}
        >
          <Picker
            set="apple"
            title="EmojiCatch.com"
            emoji="mag"
            onSelect={e => onPickerSelect(e)}
            exclude="recent"
          />
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
            🔍 search
          </span>
        </SubmitButton>
      </Header>

      

      <div
        style={{
          gridColumnStart: "main",
          gridRowStart: "domainresults",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "start",
          paddingTop: "1rem",
        }}
      >
        {lookedUpDomainsArray &&
          lookedUpDomainsArray.map((domain, index) => {
            return (
              <SingleDomain key={index} domain={domain}/>
            )
          })}
      </div>
      <Footer />
    </GridStyled>
  )
}

export default App
