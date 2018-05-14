export class Transport {
  // constructor() {
  // }

  public static text(value): any {
    return ContentService.createTextOutput(value)
  }
}
