const puppeteer = require("puppeteer");

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
  });
  const page = await browser.newPage();
  await page.goto("https://quotes.toscrape.com/page/2/");

  // await page.click(`a[href="/login"`);

  // await page.type("#username", "Luke_Das", { delay: 100 });
  // await page.type("#password", "Password123", { delay: 100 });

  // await page.click(`input[value="Login"`, { delay: 100 });

  // await page.click(`.pager .next a`, { delay: 100 });

  let url;
  let final = [];

  last = 0;

  do {
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

    url = await page.url();
    last = parseInt(url[url.length - 2]);
    final.push(grabQuotes);
    await page.click(`.pager .next a`, { delay: 100 });
  } while (last < 9);

  for (let i = 0; i < final.length; i++) {
    for (let j = 0; j < final[i].length; j++) {
      console.log(final[i][j]);
    }
  }

  await browser.close();
};

main();
