export abstract class AppPage {
  private ci: string = process.env.CI || 'false';

  //   public async bringToFront(): Promise<Page> {
  //     await this.Page.bringToFront();
  //     return this.Page;
  //   }

  public async blockingWait(
    seconds: number,
    checkCi: boolean = false
  ): Promise<void> {
    let waitSeconds = seconds;

    if (checkCi && this.ci === 'true') {
      waitSeconds = seconds * 2;
    }

    var waitTill = new Date(new Date().getTime() + waitSeconds * 1000);
    while (waitTill > new Date()) {}
  }
}
