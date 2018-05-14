// import { Spreadsheet as S, Transport as T } from './lib/'
import { Test } from './Test'

global.test = () => {
  const test = new Test()
  test.echo('new world.')
}

// global.doGet = (e) => {
//   Logger.log(JSON.stringify(e))
//   const sheet = S.connect()
//   sheet.appendRow([Date.now(), JSON.stringify(e)])
//   return T.text('foo')
// }
