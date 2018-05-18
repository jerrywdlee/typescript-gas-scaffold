# GAS Typescript Scaffold

## About

This is a scaffold for writing Google Apps Script in TypeScript and building with webpack.

## Requirements

* Git
* Node.js 8.10.0 or heigher

## Install & Initiation
### Clone Repo
```sh
$ git clone https://github.com/jerrywdlee/typescript-gas-scaffold.git <YOUR-NEW-REPO-NAME>
$ cd <YOUR-NEW-REPO-NAME>
```

### Install packages
```sh
$ npm i
```

### Init Project
```sh
$ npm run init
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
[Reffered From Here](https://github.com/naoki-sawada/gas-typescript-webpack.git).  
[node-google-apps-script](https://github.com/danthareja/node-google-apps-script).