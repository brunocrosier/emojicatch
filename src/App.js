import React, { useState, useEffect } from "react";
//import DomainResults from "./components/DomainResults"
import SearchField from "./components/SearchField";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import posed from "react-pose";

const EmojiContainer = posed.div({
  visible: {
    y: 0,
    opacity: 1,
    delay: 10,
    transition: {
      y: { type: "spring", stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

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
  ];

  const [domainString, setDomainString] = useState("🤑");
  const [domainsArray, setDomainsArray] = useState([]);
  const [lookedUpDomainsArray, setLookedUpDomainsArray] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    document.title = domainString;
  });

  const handleDomainChange = event => {
    setDomainString(event.target.value);
    setDomainsArray(
      domainEndings.map(ending => event.target.value.trim() + ending)
    );
  };

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
        ]);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLookedUpDomainsArray([]);
    domainsArray.map(b => runDomainLookup(b));
  };

  const buttonHandleSubmit = e => {
    setLookedUpDomainsArray([]);
    domainsArray.map(b => runDomainLookup(b));
  };

  const inputEl = React.useRef(null);

  const onButtonClick = event => {
    inputEl.current.focus();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SearchField
          ref={inputEl}
          value={domainString}
          onChange={event => {
            handleDomainChange(event);
          }}
        />
      </form>
      <button
        onClick={event => {
          setExpanded(!expanded);
          onButtonClick(event);
        }}
      >
        Select Emoji
      </button>
      <button
        onClick={() => {
          buttonHandleSubmit();
          if (expanded) {
            setExpanded(!expanded);
          }
        }}
      >
        Search
      </button>
      <EmojiContainer
        style={{ position: "absolute" }}
        pose={expanded ? "visible" : "hidden"}
      >
        <Picker
          set="emojione"
          onSelect={e => {
            const start = inputEl.current.selectionStart;
            const end = inputEl.current.selectionEnd;
            //const result = domainString.substring(0, start) + e.native + domainString.substring(end, domainString.length)

            setDomainString(
              prevString =>
                prevString.substring(0, start) +
                e.native +
                prevString.substring(end, prevString.length)
            );

            setDomainsArray(
              domainEndings.map(
                ending =>
                  domainString.substring(0, start) +
                  e.native +
                  domainString.substring(end, domainString.length) +
                  ending
              )
            );

            inputEl.current.focus();
            // the line below doesn't work!
            // inputEl.current.setSelectionRange(start + e.native.length, end + e.native.length)

            //this one does, but is not good practice..
            setTimeout(
              () =>
                inputEl.current.setSelectionRange(
                  start + e.native.length,
                  end + e.native.length
                ),
              10
            );
          }}
        />
      </EmojiContainer>
      {lookedUpDomainsArray &&
        lookedUpDomainsArray.map((domain, index) => {
          return (
            <div key={index}>
              {domain.url} is {domain.status}
            </div>
          );
        })}
    </div>
  );
};

export default App;
