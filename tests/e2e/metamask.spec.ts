const puppeteer = require('puppeteer');
const dappeteer = require('@chainsafe/dappeteer');

async function main() {
  const browser = await dappeteer.launch(puppeteer, {
    metamaskVersion: 'v10.28.3',
    headless: false,
    defaultViewport: null,
    executablePath:
      '~/Desktop/web3-education-interface/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    args: [
      '--no-sandbox',
      '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
      ,
      '--window-size=1200,800',
    ],
    slowMo: 200,
  });
  const metamask = await dappeteer.setupMetamask(browser, {
    seed: 'father across hunt civil solid above genuine lamp cricket galaxy degree together',
    hideSeed: true,
    password: 'zj198810',
  });
  //   await browser.close();
}

main();
