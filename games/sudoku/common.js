const getEmptyBoard = () => {
  let arr = new Array(9)

  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(9).fill(0)
  }

  return arr
}

const printBoard = (b) => {
  let rows = []

  for(let i = 0; i < b.length; i++) {
    let s = ""

    for(let j = 0; j < b[i].length; j++) {
      s = s + b[i][j] + " "

      if( (j + 1) % 3 === 0 ) {
        s += "| "
      }
    }

    rows.push(s)

    if( (i + 1) % 3 === 0)
      rows.push("----------------------------")
  }

  return rows.join('\n')
}

// used for specific move
const isValid = (arr, row, col, k) => {
  for(let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3)
    const n = 3 * Math.floor(col / 3) + i % 3

    if(arr[row][i] === k || arr[i][col] === k || arr[m][n] === k)
      return false
  }
  return true
}

const checkFull = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
      if(arr[i][j] === 0) {
        return false
      }
    }
  }

  return true
}

module.exports = {
  getEmptyBoard,
  printBoard,
  checkFull,
  isValid
}