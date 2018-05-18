export class Transport {
  // constructor() {
  // }

  public static text(value): GoogleAppsScript.Content.TextOutput {
    return ContentService.createTextOutput(value)
  }

  public static get(url: string): GoogleAppsScript.URL_Fetch.HTTPResponse {
    return UrlFetchApp.fetch(url)
  }
}

interface FetchOption {
  method?: HttpMethods,
  contentType?: string,
  payload?: string
  headers?: object
  validateHttpsCertificates?: boolean
  followRedirects?: boolean
  muteHttpExceptions?: boolean
  escaping?: boolean
}

enum HttpMethods { get, delete, patch, post, put }
