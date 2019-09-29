const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.kickstarter.com/");

  const freshFavorites = await page.evaluate(() => {
    const container = document.querySelector(
      "#index-container > div > div.grid-container-full > div:nth-child(4) > div > div > div.flex.mx-4 > div > div"
    );
    const children = container.childNodes;
    let data = [];

    children.forEach(child => {
      data.push({
        title: child.querySelector("h3").innerText,
        description: child.querySelector("p").innerText,
        link: child.querySelector("a").getAttribute("href")
      });
    });
    return data;
  });

  console.log("Fresh Favorites:", freshFavorites);
  await browser.close();
})();
