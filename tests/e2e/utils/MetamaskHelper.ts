import {
  Dappeteer,
  DappeteerBrowser,
  DappeteerLaunchOptions,
  DappeteerPage,
  launch,
  setupMetaMask,
} from '@chainsafe/dappeteer';

export class MetamaskHelper {
  public static async initDappeteer(
    seedPhrase: string = '',
    password: string = ''
  ) {
    let seed: string;
    let pass: string;
    if (seedPhrase !== '' && password != '') {
      seed = seedPhrase;
      pass = password;
    } else {
      seed = process.env.TEST_SEED || 'seed seed seed';
      pass = process.env.TEST_PASS || 'password';
    }
    const browser = await this.getBrowser();
    const metamask = await this.getMetamask(browser, seed, pass);
    const page = await this.getPage(browser);
    return [browser, metamask, page];
  }

  private static async getMetamask(
    browser: DappeteerBrowser,
    seed: string,
    password: string
  ) {
    let metamask: Dappeteer;
    try {
      metamask = await setupMetaMask(browser, {
        seed,
        hideSeed: true,
        password,
      });
      metamask.page.setViewport({
        width: 1024,
        height: 768,
      });
      if (Boolean(process.env.CI) == true) {
        //setDefaultTimeout 稍微长一点
        await metamask.page.waitForTimeout(60000);
      }
    } catch (error) {
      console.log('Error occurred setting up MetaMask');
      throw error;
    }
  }

  private static async getBrowser(): Promise<DappeteerBrowser> {
    let browser: DappeteerBrowser;

    let options: DappeteerLaunchOptions = {
      // metaMaskVersion: 'v10.28.3',
      headless: false,
      puppeteerOptions: {
        defaultViewport: null,
        slowMo: 1000,
        args: [
          '--no-sandbox',
          '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
          '--window-size=1200,800',
        ],
      },
    };
    if (Boolean(process.env.CI) == true) {
      options.puppeteerOptions!.slowMo = 1000;
    }
    try {
      browser = await launch(options);
    } catch (error) {
      console.log('Error occurred launching Puppeteer');
      throw error;
    }

    return browser;
  }

  private static async getPage(browser: DappeteerBrowser) {
    let page: DappeteerPage;
    try {
      page = await browser.newPage();
      await page.waitForTimeout(1800000);
    } catch (error) {
      console.log('Error occurred creating new page');
      throw error;
    }
    return page;
  }
}
