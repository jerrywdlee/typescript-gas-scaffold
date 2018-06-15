export class Spreadsheet {
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

  public spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
  constructor(param: SpreadsheetParams = {}) {
    let tmpSs: GoogleAppsScript.Spreadsheet.Spreadsheet = null
    if (param.fileId) {
      tmpSs = SpreadsheetApp.openById(param.fileId)
    } else if (param.fileUrl) {
      tmpSs = SpreadsheetApp.openByUrl(param.fileUrl)
    } else {
      tmpSs = SpreadsheetApp.getActive()
    }
    this.spreadsheet = tmpSs
  }

  public getCellPairs(column: string = 'A:B', sheetName?: string): any {
    let sheet = null
    if (sheetName) {
      sheet = this.spreadsheet.getSheetByName(sheetName)
    } else {
      sheet = this.spreadsheet.getActiveSheet()
    }
    const range = sheet.getRange(column)
    const rows = range.getValues().filter(row => row[0])
    const values = {}
    rows.forEach(r => values[r[0].toString()] = r[1])
    return values
  }

  public updateValsByKeys(params: {}, column: string, sheetName?: string) {
    let sheet = null
    if (sheetName) {
      sheet = this.spreadsheet.getSheetByName(sheetName)
    } else {
      sheet = this.spreadsheet.getActiveSheet()
    }
    const range = sheet.getRange(column)
    const keys = Object.keys(params)
    const keyLocats = {}
    const [keyCol, valCol] = column.split(':')

    let offset = 1
    if (keyCol.match(/(\d+)/)) {
      offset = parseInt(RegExp.$1, 10)
    }
    range.getValues().forEach((row, i) => {
      const k = row[0].toString()
      if (keys.indexOf(k) !== -1) {
        keyLocats[k] = i + offset
      }
    })
    keys.forEach(k => {
      const cellId = `${valCol.replace(/\d+/, '')}${keyLocats[k]}`
      const cell = sheet.getRange(cellId)
      cell.setValue(params[k])
    })
  }
}

interface SpreadsheetParams {
  fileId?: string,
  fileUrl?: string,
  sheetName?: string
}
