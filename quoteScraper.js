const puppeteer = require("puppeteer");

const main = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");

  const grabQuotes = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".col-md-8 .quote");

    let quotesArray = [];

    quotes.forEach((quoteTag) => {
      const quoteInfo = quoteTag.querySelectorAll("span");

      const actualQuote = quoteInfo[0];
      const actualAuthor = quoteInfo[1];

      const authorName = actualAuthor.querySelector("small");

      quotesArray.push({
        quote: actualQuote.innerText,
        author: authorName.innerText,
      });
    });

    return quotesArray;
  });

  console.log(grabQuotes);

  await browser.close();
};

main();
