const common = require('./common')
const { printBoard, isValid } = require('./common')

// https://stackoverflow.com/questions/42736648/sudoku-solver-in-js
const solveBacktring = (arr) => {

  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {

      if(arr[i][j] === 0) {
        for(let v = 1; v <= 9; v ++) {
          if(isValid(arr, i, j, v)) {
            arr[i][j] = v

            console.log(printBoard(arr))

            if(solveBacktring(arr)) {
              return true
            } else {
              arr[i][j] = 0
            }
          }
        }
        return false
      }
    }
  }
  return true
}

// https://www.codeproject.com/Articles/23206/Sudoku-Algorithm-Generates-a-Valid-Sudoku-in-0-018
const solveEfficient = (m) => {
  
  let counter = 0

  const initialAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  let available = new Array(81).fill(JSON.parse(JSON.stringify(initialAvailable)))

  while(counter != 81) {

    if(available[counter].length !== 0) {

      let v = Math.floor(Math.random() * (Math.max(...available[counter])) + 1 )

      let i = Math.floor(counter / 9)

      let j = counter % 9

      if(m[i][j] === 0 && isValid(m, i, j, v) ) {
        m[i][j] = v

        available[counter].splice(
          available[counter].indexOf(v), 1)

        counter++
      } else {
        available[counter].splice(
          available[counter].indexOf(v), 1)
      }
    } else {
      available[counter] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      counter = counter !== 0 ? (counter - 1) : 0

      let i = Math.floor(counter / 9)

      let j = counter % 9

      m[i][j] = 0
    }
  }

  return true
}

module.exports = {
  solveBacktring,
  solveEfficient
}