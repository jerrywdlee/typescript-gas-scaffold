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
$ npm run reset
# It will delete exist .git folder and run git init
```

## Usage
### Development

If you watnt to use watch mode,

```sh
$ npm run watch
```

### Do Dev

Edit code in `src/app.ts` (and/or other codes in `/src`), then enjoy it ;)

### Deploy by [Google Clasp](https://github.com/google/clasp#readme)
_**May Need Enable the Apps Script API at https://script.google.com/home/usersettings**_

#### Login
```sh
$ npm run clasp login
# OR
$ cd build/ && $(npm bin)/clasp login
```

#### Clone
_**Change `code.gs` (or other name) generated automatically to `bundle.gs`**_  
```sh
$ npm run clasp clone <scriptId>
# OR
$ cd build/ && $(npm bin)/clasp clone <scriptId>
```

#### Pull
```sh
$ npm run clasp pull
# OR
$ cd build/ && $(npm bin)/clasp pull
```

#### Push
_**Need Do `Clone` and `Pull` first!**_  
_**May need refresh work space to show change**_
```sh
$ npm run push
# OR
$ npm run clasp push
# OR
$ cd build/ && $(npm bin)/clasp push
```

### Watch & Push
If Clasp is configed, run `npm run watch:push` will be faster.

## Notice

- If want connect to Spreadsheets ect. Need run on dev console first and apply permission
- If want update your REST API, need update web app setting after deploy your app

## Reference
[Google Clasp](https://github.com/google/clasp#readme).  
[Reffered From Here](https://github.com/naoki-sawada/gas-typescript-webpack.git).  
[node-google-apps-script](https://github.com/danthareja/node-google-apps-script).