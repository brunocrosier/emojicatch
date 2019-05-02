const express = require('express')
const cors = require('cors')
const app = express()

const cheerio = require("cheerio")
const axios = require("axios")
const punycode = require("punycode")
const fetch = require("node-fetch")

app.use(cors())

app.use(express.json())

// app.get("/", (req, res, next) => {
//   res.set("Content-Type", "text/html")
//   res.status(200).send(`
//         <h1>Want access to this API?</h1>
//         <p>email me: bruno.crosier@gmail.com</p>
//     `)
// })


app.get("/lookup/:domain", cors(), (req, res, next) => {
  const myDomain = punycode.toASCII(req.params.domain)

  let ending = req.params.domain
    .match(/\.[^.]{2,3}(?:\.[^.]{2,3})?$/gi)
    .toString()

  const domainrLookupScrape = domainString => {
    axios.get(`https://domainr.com/${domainString}`).then(
      response => {
        if (response.status === 200) {
          const html = response.data
          const $ = cheerio.load(html)
          $(".domain-status").each(function(i, e) {
            res.status(200).send({
              url: domainString,
              status: $(e)
                .text()
                .trim()
                .toLowerCase()
            })
          })
        }
        return
      },
      err => console.log(err)
    )
  }

  const freenomLookup = domainString => {
    fetch(
      `https://api.freenom.com/v2/domain/search?domainname=${domainString}&email=bruno.crosier@gmail.com&password=nnib45ms&domaintype=PAID`
    )
      .then(response => response.json())
      .then(data => {
        res.status(200).json({
          url: domainString,
          status: data.domain[0].status.toLowerCase()
        })
        return
      },
      err => console.log(err)
      )
  }

  if ([".cf",".ml",".gq",".ga",".tk"].includes(ending)) {
    freenomLookup(myDomain)
  } else if ([".ws", ".to", ".fm"].includes(ending)) {
    domainrLookupScrape(myDomain)
  } else {
    res.status(404).json({
      url: myDomain,
      status: `cannot perform lookup for ${ending}`
    })
  }

})

// app.listen(3000, () => {
//   console.log("server started")
// })

module.exports = app
