const puppeteer = require("puppeteer");

class LocalBrowserInteraction {
  constructor() {
    this.pbrowser;
  }

  async openFileInBrowser(path, width, height, x, y) {
    this.pbrowser = await puppeteer.launch({
      defaultViewport: null,
      headless: false,
      args: ["--no-sandbox", `--window-size=${width},${height}`, `--window-position=${x},${y}`],
    });
    const page = await this.pbrowser.newPage();
    await page.goto(path);
  }

  async closePBrowser(){
    await this.pbrowser.close();
  }
}

module.exports = LocalBrowserInteraction;
