// const puppeteer = require('puppeteer');
const dappeteer = require('@chainsafe/dappeteer');

async function main() {
  const browser = await dappeteer.launch({
    // metaMaskVersion: 'v10.28.3',
    headless: false,
    defaultViewport: null,
    // executablePath:
    //   '~/Desktop/web3-education-interface/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    args: [
      '--no-sandbox',
      '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
      ,
      '--window-size=1200,800',
    ],
    slowMo: 1000,
  });
  const metamask = await dappeteer.setupMetaMask(browser, {
    seed: 'father across hunt civil solid above genuine lamp cricket galaxy degree together',
    hideSeed: true,
    password: 'zj198810',
  });
  await metamask.switchNetwork('mainnet');
  const pages = await browser.pages();
  if (pages.length > 1) {
    await pages[0].close();
  }
  const page = await browser.newPage();
  await page.goto(
    'https://v2.solv.finance/marketplace/vesting?network=mainnet',
    {
      waitUntil: 'networkidle0',
    }
  );
  await metamask.approve();
  await page.bringToFront();

  await page.$eval(
    '#address',
    (el) => (el.value = '0x0A6e2a9F041381C76EE5187fBDFf9372e25E46F2')
  );

  console.log('测试结束🌺');
  await browser.close();
}

main();
