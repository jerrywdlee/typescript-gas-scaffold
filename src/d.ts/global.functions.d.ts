interface Global {
  test(): void
  doGet(e): any
  doPost(e): any
  fetchSampleJson(): any
}

declare var global: Global
