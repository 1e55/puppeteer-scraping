// Scrape KickStarter for their FreshFavorites

const puppeteer = require("puppeteer");

(async () => {
  // use this browser if you want to see chromium while the program runs.
  // const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.kickstarter.com/");

  // In order to interact with the DOM of the page your browser is on,
  // you need to do it inside a 'await page.evaluate(callback)' function.

  const freshFavorites = await page.evaluate(() => {
    // So now we need to grab the containing element of all the elements we want to scrape
    // Sounds easy right? just document.querySelector('class name')?
    // Wrong, their class names like this: 'class="flex flex-row flex-nowrap justify-between mt6"'
    // They're using Tachyon css to style this element, so there is no solid class to work off of.

    // Luckily we can still reference this node by using its X Path

    // In Chrome, right click and inspect the element you want to grab
    // which will open the developer console and
    // highlight the element you clicked.

    // Then in the developer console, right click the element and click Copy, then Copy JS Path.
    // You literally get this querySelector, its basically magic.

    const container = document.querySelector(
      "#index-container > div > div.grid-container-full > div:nth-child(4) > div > div > div.flex.mx-4 > div > div"
    );

    // get the child nodes of the freshFavories containing element
    let children = container.childNodes;
    let data = []; //An array to store our new data objects

    // You can use querySelector on each child to get whatever child of the children you want
    children.forEach(child => {
      data.push({
        title: child.querySelector("h3").innerText,
        description: child.querySelector("p").innerText,
        link: child.querySelector("a").getAttribute("href")
      });
    });
    return data;
  });

  // console log our array of objects
  console.log("Fresh Favorites:", freshFavorites);

  //TODO: use await page.goto("") to go to our newly scraped links and scrape more data on each of those pages

  await browser.close();
})();
