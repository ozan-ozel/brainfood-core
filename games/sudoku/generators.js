const {getEmptyBoard} = require('./common')

const {solveEfficient} = require('./solvers')

const LEVELS = require('../../config').LEVELS.SUDOKU

const exec = (difficulty) => {
  
  const N = 9

  let m = getEmptyBoard()

  if(solveEfficient(m)) {

    const solution = Object.assign([], m)

    let x = LEVELS[difficulty]

    let l = {
      d: 2,
      t: 'e',
      h: []
    }

    for(let x = 0; x < LEVELS[difficulty]; x ++) {
      let index = Math.floor(Math.random() * ((N * N) - 1))

      let i = Math.floor(index / N)

      let j = index % 9

      if(m[i][j] === 0) {
        x --
      } else {
        m[i][j] = 0
      }
    }

    for(let i = 0; i < m.length; i++) {
      for(let j = 0; j < m[i].length; j++) {
        if(m[i][j] === 0) {
          m[i][j] = {
            d: '',
            t: 'e',
            h: []
          }
        } else {
          m[i][j] = {
            d: m[i][j],
            t: 'g'
          }
        }
      }
    }

    return {
      board: m,
      solution
    }
  } else {
    console.log("Can not generate sudoku board.")
  }
}

module.exports = {
   exec
}