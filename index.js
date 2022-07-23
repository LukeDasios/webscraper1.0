const puppeteer = require("puppeteer");

const main = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://lukedasios.github.io/PersonalWebsite/index.html");
  await page.screenshot({ path: "screenshot.png" });

  const title = await page.title();
  const url = await page.url();
  console.log(`title: ${title}, url: ${url}`);

  console.log("\n");

  const grabParagraph = await page.evaluate(() => {
    const paragraphTag = document.querySelector(".about-me p");
    return paragraphTag.innerText;
  });

  console.log(grabParagraph);

  console.log("\n");

  const grabList = await page.evaluate(() => {
    const listTag = document.querySelectorAll("#skills ul");

    let arr = []

    listTag.forEach((ul) => {
      arr.push(ul.innerText.split("\n"))
    })

    return arr;
  });

  console.log(grabList);

  console.log("\n");

  await browser.close();
};

main();
