export class Spreadsheet {
  // constructor(param: SpreadsheetParams) {
  // }

  public static connect(param: SpreadsheetParams = {}): GoogleAppsScript.Spreadsheet.Sheet {
    let tmpSs: GoogleAppsScript.Spreadsheet.Spreadsheet = null
    if (param.fileId) {
      tmpSs = SpreadsheetApp.openById(param.fileId)
    } else if (param.fileUrl) {
      tmpSs = SpreadsheetApp.openByUrl(param.fileUrl)
    } else {
      tmpSs = SpreadsheetApp.getActive()
    }
    if (tmpSs) {
      if (param.sheetName) {
        return tmpSs.getSheetByName(param.sheetName)
      } else {
        return tmpSs.getActiveSheet()
      }
    }
  }
}

interface SpreadsheetParams {
  fileId?: string,
  fileUrl?: string,
  sheetName?: string
}
