export class Spreadsheet {
  /**
   * Spreadsheet.connect: return a sheet fast
   * @param param SpreadsheetParams
   */
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

  /**
   * getCellPairs: Get cells from target range, form as KEY-VALUE object
   * @param column target range, first column as key, last column as value
   * @param sheetName target sheet, default: sheet 'settings'
   */
  public getCellPairs(column: string = 'A:B', sheetName: string = 'settings'): any {
    const sheet = this.spreadsheet.getSheetByName(sheetName)
    if (!sheet) { throw new Error('No Available Sheet!') }
    let [l1, l2] = column.split(':').map(l => l.toUpperCase())
    let reverseFlg = false
    if (l1 > l2) {
      reverseFlg = true; [l2, l1] = [l1, l2]
    }
    const columnStr = `${l1}:${l2}`
    Logger.log(columnStr)
    const range = sheet.getRange(columnStr)
    const values = {}
    const rows = range.getValues().filter(row => row[0])
    if (reverseFlg) {
      rows.forEach(r => values[r[r.length - 1].toString()] = r[0].toString())
    } else {
      rows.forEach(r => values[r[0].toString()] = r[r.length - 1])
    }
    return values
  }

  /**
   * updateValsByKeys: Update columns by KEY-VALUE object
   * First column of range as KEY, Last column of range as VALUE
   * @param params object: {key: value}
   * @param column string: taget columns like 'A:B', 'A2:B10', 'A2:C10'
   * @param sheetName string: target sheet name, if empty, getActiveSheet
   */
  public updateValsByKeys(params: {}, column: string, sheetName?: string) {
    let sheet = null
    if (sheetName) {
      sheet = this.spreadsheet.getSheetByName(sheetName)
    } else {
      sheet = this.spreadsheet.getActiveSheet()
    }
    if (!sheet) { throw new Error('No Available Sheet!') }
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

  /**
   * rotateSheet: rotate target sheet
   * @param sheetName sheet to be rotated
   * @param options RotateSheetOpt
   * @param options.hideCopy hide copied sheet, default: true
   * @param options.rotatedName name of copied sheet, default: sheetName_yyyy-MM-dd
   * @param options.useHeader set sheet header, default: true
   */
  public rotateSheet(sheetName: string, options: RotateSheetOpt = {}) {
    const SS = this.spreadsheet
    const sheet = SS.getSheetByName(sheetName)
    if (!sheet) { throw new Error('No Available Sheet!') }
    const now = new Date()
    const dateString = Utilities.formatDate(now, 'UTC', 'yyyy-MM-dd')

    let { rotatedName, useHeader, hideCopy } = options
    rotatedName = rotatedName || `${sheetName}_${dateString}`
    useHeader = useHeader || true
    hideCopy = hideCopy || true

    if (!useHeader) { useHeader = true }
    let copiedSheet = SS.getSheetByName(rotatedName)
    if (copiedSheet !== null) { throw new Error(`Sheet ${rotatedName} Exsits!`) }
    const sheetsNum = SS.getNumSheets()
    copiedSheet = SS.insertSheet(rotatedName, sheetsNum, { template: sheet })
    if (useHeader) {
      const range = sheet.getRange('1:1')
      const row = range.getValues()[0]
      Logger.log(row)
      sheet.clearContents()
      sheet.appendRow(row)
    } else {
      sheet.clear()
    }
    if (hideCopy) {
      copiedSheet.hideSheet()
    }
    return { sheet, copiedSheet }
  }
}

interface SpreadsheetParams {
  fileId?: string,
  fileUrl?: string,
  sheetName?: string
}

interface RotateSheetOpt {
  hideCopy?: boolean,
  rotatedName?: string,
  useHeader?: boolean
}
