# gas typescript webpack

## About

This is an example of writing Google Apps Script in TypeScript and building with webpack.

## Requirements

* Node.js 8.10.0 or heigher

## Install
### install this project
```sh
$ npm i
```

## Usage
### Development

If you watnt to use watch mode,

```sh
$ npm run watch
```

### Deploy
```sh
$ npm build
# Then copy it to your GAS file
# OR Use `gapps upload` if node-google-apps-script installed
# gapps cannot up load Scripts which embedded in Spreadsheets or other files
```

## Notice

- If want connect to Spreadsheets ect. Need run on dev console first and apply permission
- If want update your REST API, need update web app setting after deploy your app

## Reference
[Japanease post](https://qiita.com/nsawa/items/96c5300c811856024789).
[Git Hub](https://github.com/naoki-sawada/gas-typescript-webpack.git).
[node-google-apps-script](https://github.com/danthareja/node-google-apps-script).