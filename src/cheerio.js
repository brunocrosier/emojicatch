const cheerio = require("cheerio")
const axios = require("axios")
const punycode = require("punycode")
const express = require("express")
const fetch = require("node-fetch")
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.get("/lookup/:domain", (req, res) => {
  const myDomain = punycode.toASCII(req.params.domain)

  let ending = req.params.domain.match(/\.[^.]{2,3}(?:\.[^.]{2,3})?$/gi).toString()

  const domainrLookupScrape = async domainString => {
    axios.get(`https://domainr.com/${domainString}`).then(
      response => {
        if (response.status === 200) {
          const html = response.data
          const $ = cheerio.load(html)
          $(".domain-status").each(function(i, e) {
            res.json({
              domain: domainString,
              availability: $(e)
                .text()
                .trim()
                .toLowerCase()
            })
          })
        }
      },
      err => console.log(err)
    )
  }

  const freenomLookup = domainString => {
    fetch(`https://api.freenom.com/v2/domain/search?domainname=${domainString}&email=bruno.crosier@gmail.com&password=nnib45ms&domaintype=FREE`)
    .then(res => res.json())
    .then(data => {
      res.json({
        domain: domainString,
        availability: data.domain[0].status.toLowerCase()
      })
    })
  }


  if (ending === ".cf" || ".ml" || ".gq" || ".ga" || ".tk") {
    freenomLookup(myDomain)
  }

  if (ending === ".ws" || ".to") {
    domainrLookupScrape(myDomain)
  }


})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
