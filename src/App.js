import React, { useState, useEffect } from "react"
import SearchField from "./components/SearchField"
import "emoji-mart/css/emoji-mart.css"
import ToggleEmoji from "./components/ToggleEmoji"
import GridStyled from "./components/GridStyled"
import Header from "./components/Header"
import Logo from "./components/Logo"
import Footer from "./components/Footer"
import DomainResults from "./components/DomainResults"
import EmojiPicker from "./components/EmojiPicker"
import Modal from "@material-ui/core/Modal"

const App = () => {
  const domainEndings = [
    ".ws",
    ".to",
    ".ga",
    ".cf",
    ".tk",
    ".ml",
    ".gq",
    // ".st",
    ".fm"
    // ".je",
    // ".gg"
  ]

  // Define our state and how to update it
  const [domainInputString, setdomainInputString] = useState("")
  const [domainsArray, setDomainsArray] = useState([])
  const [lookedUpDomainsArray, setLookedUpDomainsArray] = useState([])
  const [expanded, setExpanded] = useState(false)

  // // Every time the domainInputString changes, change the document.title
  // useEffect(() => {
  //   document.title = domainInputString
  // }, [domainInputString])

  const inputEl = React.useRef(null)

  // What happens when an emoji is selected from the picker
  const onPickerSelect = e => {
    // Close the picker modal
    setExpanded(false)

    const start = inputEl.current.selectionStart
    const end = inputEl.current.selectionEnd

    setdomainInputString(
      prevString =>
        prevString.substring(0, start) +
        e.native +
        prevString.substring(end, prevString.length)
    )

    setDomainsArray(
      domainEndings.map(
        ending =>
          domainInputString.substring(0, start) +
          e.native +
          domainInputString.substring(end, domainInputString.length) +
          ending
      )
    )

    inputEl.current.setSelectionRange(
      start + e.native.length,
      end + e.native.length
    )
  }

  // What happens when the input field's value changes
  const onChange = e => {
    setdomainInputString(e.target.value)

    setDomainsArray(domainEndings.map(ending => e.target.value.trim() + ending))
  }

  return (
    <GridStyled>
      <Header>
        <Logo
          onClick={() => {
            setdomainInputString("")
            setDomainsArray([])
            setLookedUpDomainsArray([])
          }}
          src="/emoji-catch-logo.svg"
          alt="emojicatch logo"
        />
        <form
          style={{
            position: "relative",
            outline: "transparent",
            gridColumn: "1/6",
            gridRow: "2"
          }}
          onSubmit={e => e.preventDefault()}
        >
          <SearchField
            ref={inputEl}
            value={domainInputString}
            placeholder={"add emojis or text here!"}
            onChange={onChange}
          />

          <Modal open={expanded} onClose={() => setExpanded(false)}>
            <div
              style={{
                outline: "none",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                position: "absolute"
              }}
            >
              <EmojiPicker onPickerSelect={onPickerSelect} />
            </div>
          </Modal>
        </form>
        <ToggleEmoji
          onClick={event => {
            setExpanded(!expanded)
          }}
        >
          <p>emoji picker</p>
        </ToggleEmoji>
      </Header>

      <DomainResults
        domainInputString={domainInputString}
        domainEndings={domainEndings}
        lookedUpDomainsArray={lookedUpDomainsArray}
        domainsArray={domainsArray}
      />

      <Footer />
    </GridStyled>
  )
}

export default App
