// write a welcome a message
// list out the files in the data folder and ask which like to select
// use readline function to give the user a way to input
// we write a function that runs only after the user has given input
// function takes number and matches it to an array with the list of files.
// it then reads the file and displays in the terminal.
const readline = require('readline')
const fs = require('fs')
const os = require('os')
const artList = [
  ' ',
  '0. kea',
  '1. kiwi',
  '2. manaia',
  '3. nikau',
  '4. pohutukawa',
  ' ',
]
const fileList = [
  'kea.txt',
  'kiwi.txt',
  'manaia.txt',
  'nikau.txt',
  'pohutukawa.txt',
]
let regNum = /[0-4]/
console.log('Do you like art? You are in the right place! Welcome!')
mainMenu()

function pressEnter() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question(
    `Pick an artwork by inputting a number between 0 and 4 and press Enter:    `,
    function (input) {
      rl.close()
      if (input === 'q') {
        process.exit(0)
      } else if (!regNum.test(input)) {
        console.log(`Please choose a number from 0 to 4`)
        pressEnter()
      } else {
        displayFile(input)
      }
    }
  )
}

function mainMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question(
    `Would you like to see an artwork?  Press y to enter or q to exit:  `,
    function (input) {
      rl.close()
      if (input === 'y') {
        displayList(artList)
        pressEnter()
      } else if (input === 'q') {
        process.exit(0)
      }
    }
  )
}

function pickAnother() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question(
    `Want to see another? ${os.EOL} Press y to enter ${os.EOL} Press c or v to comment or view comments ${os.EOL} Press d to erase comments ${os.EOL} Press q to exit:  ${os.EOL}`,
    function (input) {
      rl.close()
      if (input === 'y') {
        displayList(artList)
        pressEnter()
      } else if (input == 'c') {
        comments()
      } else if (input == 'v') {
        showComments()
      } else if (input == 'd') {
        eraseComments()
      } else if (input === 'q') {
        process.exit(0)
      }
    }
  )
}

function comments() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question(`Leave a comment and press enter:  ${os.EOL}`, function (input) {
    rl.close()
    fs.appendFile('data/comments.txt', os.EOL + input, 'utf-8', (err) => {
      if (err) {
        throw err
      }
      console.log(`Comment submitted`)
      pickAnother()
    })
  })
}

function eraseComments() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question(
    `Are you sure you want to erase all comments?  y to erase, n to return to the main menu:  ${os.EOL}`,
    function (input) {
      rl.close()
      if (input === 'y') {
        fs.writeFile('data/comments.txt', '', 'utf-8', (err) => {
          if (err) {
            throw err
          }
          console.log(`Comments erased`)
          mainMenu()
        })
      }
      if (input === 'n') {
        mainMenu()
      }
    }
  )
}
function showComments() {
  fs.readFile('data/comments.txt', 'utf-8', (err, data) => {
    if (err) {
      throw err
    }
    console.log(`Comments: ${os.EOL} ${data}`)
    pickAnother()
  })
}

function displayFile(input) {
  fs.readFile(`data/${fileList[input]}`, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    console.log(data)
    pickAnother()
  })
}

function displayList(artList) {
  for (let item of artList) {
    console.log(item)
  }
}
