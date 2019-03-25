const puppeteer = require("puppeteer")
const express = require("express")
const port = process.env.PORT || 3000


const app = express()

app.use(express.json())

app.get("/lookup/:domain", (req, res) => {

  const myDomain = req.params.domain

  const lookupScrape = async domainString => {
    const browser = await puppeteer.launch({ headless: true })

    const page = await browser.newPage()

    await page.setRequestInterception(true);
    
    page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
            req.abort();
        }
        else {
            req.continue();
        }
    });
 

    
    await page.goto(`https://domainr.com/${domainString}`)
    const texty = await page.$eval(".domain-status", e => e.textContent)
    
    
    res.send(await texty)

    await browser.close()
  }

  lookupScrape(myDomain)

})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})