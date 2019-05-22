const express = require("express")
const app = express()

const cheerio = require("cheerio")
const axios = require("axios")
const punycode = require("punycode")
const fetch = require("node-fetch")

const curl = require("curl")

app.use(express.json())

app.get("/lookup/:domain", (req, res, next) => {
  // punycoded version of whatever :domain is
  const myDomain = punycode.toASCII(req.params.domain)

  // use regex to find out the domain's ending
  let ending = req.params.domain
    .match(/\.[^.]{2,5}(?:\.[^.]{2,3})?$/gi)
    .toString()

  //function to look up the availability using Hexonet

  const hexonetLookupScrape = domainString => {
    curl.get(
      `https://coreapi.1api.net/api/call.cgi?s_login=bonjourl&s_pw=nnib45ms&command=CheckDomain&domain=${domainString}`,
      function(err, response, body) {
        if (body.includes("CODE=210")) {
          res.status(200).json({
            url: domainString,
            status: "available"
          })
        } else if (body.includes("CODE=211")) {
          res.status(200).json({
            url: domainString,
            status: "taken"
          })
        } else {
          res.status(404).json({
            url: domainString,
            status: "error"
          })
        }
      }
    )
  }

  // function to look up the availability using domainr.com
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

  // function to look up the availability using domainr.com
  const stLookupScrape = domainString => {
    axios
      .get(
        `https://www.nic.st/register-domain?bulkdomains=&domain=${domainString}`
      )
      .then(
        response => {
          if (response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)
            $("div.media-body > p:nth-child(1)").each(function(i, e) {
              let isAvailable = $(e)
                .text()
                .includes("available")
              let result = isAvailable ? "available" : "taken"

              res.status(200).send({
                url: domainString,
                status: result
              })
            })
          }
          return
        },
        err => console.log(err)
      )
  }

  // function to look up the availability using ps.kz API
  const kzLookupScrape = domainString => {
    fetch(
      `https://api.ps.kz/kzdomain/domain-check?username=ps_api_420685&password=paiGM8UcTrBdBa5Xmiz8&input_format=http&output_format=json&dname=${domainString}`
    )
      .then(response => response.json())
      .then(
        data => {
          if (data.answer.domains[0].result) {
            res.status(200).json({
              url: domainString,
              status: data.answer.domains[0].result.toLowerCase()
            })
          } else {
            res.status(200).json({
              url: domainString,
              status: "error"
            })
          }

          return
        },
        err => console.log(err)
      )
  }

  // function to look up the availability using freenom API
  const freenomLookup = domainString => {
    fetch(
      `https://api.freenom.com/v2/domain/search?domainname=${domainString}&email=bruno.crosier@gmail.com&password=nnib45ms&domaintype=PAID`
    )
      .then(response => response.json())
      .then(
        data => {
          res.status(200).json({
            url: domainString,
            status: data.domain[0].status.toLowerCase()
          })
          return
        },
        err => console.log(err)
      )
  }

  if ([".cf", ".ml", ".gq", ".ga", ".tk"].includes(ending)) {
    freenomLookup(myDomain)
  } else if (
    [".ws", ".to", ".je", ".gg", ".radio.am", ".radio.fm"].includes(ending)
  ) {
    hexonetLookupScrape(myDomain)
  } else if ([".st"].includes(ending)) {
    stLookupScrape(myDomain)
  } else if ([".kz", ".com.kz", ".org.kz"].includes(ending)) {
    kzLookupScrape(myDomain)
  } else {
    res.status(404).json({
      url: myDomain,
      status: `cannot perform lookup for ${ending}`
    })
  }
})

app.listen(3000, () => {
  console.log("server started")
})

module.exports = app
