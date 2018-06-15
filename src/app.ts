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

global.fetchSampleJson = () => {
  // Need run on dev console and apply your app can connect to outsite service
  const url = 'https://raw.githubusercontent.com/LearnWebCode/json-example/master/animals-1.json'
  const res = T.get(url)
  const json = JSON.parse(res.getContentText())
  Logger.log(json.map((a) => a.name))
  // will output: [Meowsy, Barky, Purrpaws]
}

global.SheetDemo = () => {
  // Insert Demo Data
  const demoData = [
    ['key1', 'key_0001'],
    ['key2', 'key_0002'],
    ['key3', 'key_0003'],
  ]
  const sheet = S.connect()
  demoData.forEach(row => {
    sheet.appendRow(row)
  })
  const ss = new S()
  const data = ss.getCellPairs('A:B')
  Logger.log(JSON.stringify(data))
  ss.updateValsByKeys({ key3: 'new_key_3' }, 'A:B')
}
