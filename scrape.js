// Import puppeteer
const puppeteer = require("puppeteer");

(async () => {
  // Launch a new browser
  // To view puppeteer in headed mode, just pass it an argument
  // const browser = await puppeteer.launch({headless: false});
  const browser = await puppeteer.launch();
  // Create a page
  const page = await browser.newPage();
  // Navigate to a website
  await page.goto("https://www.kickstarter.com/");

  // In order to access the DOM of the page you want to scrape,
  // you need to use page.evaluate() with a callback function.
  const freshFavorites = await page.evaluate(() => {
    // Find the parent element of data you want to scrape.
    // Unfortunately, Kickstarter uses some Tachyion.io type of styling,
    // so we cant use unique class names to select our parent element.
    // Instead we can use descendant selectors to select an element.

    // In Chrome, you can right click the element on the screen and it will open the Developer Console.
    // In the Developer Console, find the parent element and right click, select Copy, and then select Copy JS path
    // This will give you the document.querySelector featured below.
    const container = document.querySelector(
      "#index-container > div > div.grid-container-full > div:nth-child(4) > div > div > div.flex.mx-4 > div > div"
    );
    // Because this is a node, we can access its children with .childNode.
    const children = container.childNodes;
    //This will be the array we store all our newly scraped data.
    let data = [];
    //To iterate through a nodelist, you can use forEach.
    children.forEach((child) => {
      //Push the data from each child in to our data array.
      data.push({
        //With the node child, we can perform querySelectors to pick apart our childs child nodes for data.
        title: child.querySelector("h3").innerText,
        description: child.querySelector("p").innerText,
        link: child.querySelector("a").getAttribute("href"),
      });
    });
    //Return the ~freshly~ collected data
    return data;
  });
  //Log our array to the terminal
  console.log("Fresh Favorites:", freshFavorites);
  await browser.close();
})();
