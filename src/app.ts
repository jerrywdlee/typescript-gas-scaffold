import { Slack, Spreadsheet as S, Transport as T } from './lib/'
import { Test } from './Test'

global.test = () => {
  const test = new Test()
  test.echo('new world.')
}

// curl -L https://script.google.com/macros/s/<YOUR-GAS-APP-ID>/exec?res=[text|html|html_from_file|json|redirect_to]
global.doGet = (e) => {
  Logger.log(JSON.stringify(e))
  // Need run on dev console and apply your app can connect to Spreadsheets
  const sheet = S.connect()
  sheet.appendRow([(new Date()).toLocaleString(), JSON.stringify(e)])
  let params = ''
  if (e && e.parameter && e.parameter.res) {
    params = e.parameter.res.toString()
  }

  switch (params) {
    case 'text':
      return T.text('foo') // show string 'foo'
    case 'html':
      return T.html('<h1>Hello World</h1>') // show html snippet
    case 'html_from_file':
      return T.htmlFromFile('sample') // show html page `sample.html`
    case 'json':
      return T.json({ foo: 'bar' }) // show a json
    case 'redirect_to':
      return T.redirectTo('https://example.org', 'Loading...') // redirect to `https://example.org`
    default:
      return T.htmlFromFile('sample')
  }
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
  const data = ss.getCellPairs('A2:B10')
  Logger.log(JSON.stringify(data))
  // { "key1": "key_0001", "key2": "key_0002", "key3": "key_0003" }
  ss.updateValsByKeys({ key3: 'new_val_3' }, 'A:C')
  // reversed
  const data2 = ss.getCellPairs('B:A')
  Logger.log(JSON.stringify(data2))
  // { "key_0001": "key1", "key_0002": "key2", "key_0003": "key3" }
  ss.updateValsByKeys({ key_0002: 'new_val_2' }, 'B2:A10')
}

global.RotateLogDeme = () => {
  const maxLogNum = 10

  const logSheet = S.connect({ sheetName: 'logs' })
  const lastRow = logSheet.getLastRow()
  if (lastRow > maxLogNum) {
    const ss = new S()
    ss.rotateSheet('logs')
  }
}

global.SlackDemo = () => {
  /*
  const slackText = '<!here> <@slackId> Hello World!'
  const url = 'https://hooks.slack.com/services/...<YOUR-WEBHOOK>'
  const slack = new Slack(url, {
    channel: '#slack-bot',
    username: 'Slack Bot',
    icon_emoji: ':robot_face:',
  })
  // Enable Your Slack Webhook Then Test This
  slack.sendMsg({ text: slackText })
  */
}
