import { Spreadsheet as S, Transport as T } from './lib/'
import { Test } from './Test'

global.test = () => {
  const test = new Test()
  test.echo('new world.')
}

global.doGet = (e) => {
  Logger.log(JSON.stringify(e))
  // Need run on dev console and apply your app can connect to Spreadsheets
  const sheet = S.connect()
  sheet.appendRow([(new Date()).toLocaleString(), JSON.stringify(e)])
  return T.text('foo')
}
