interface Global {
  test(): void
  doGet(e): any
  doPost(e): any
  fetchSampleJson(): any
  SheetDemo(): any
  SlackDemo(): any
}

declare var global: Global
