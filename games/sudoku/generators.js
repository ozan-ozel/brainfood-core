const {getEmptyBoard} = require('./common')

const {solveEfficient} = require('./solvers')

const LEVELS = require('../../config').LEVELS.SUDOKU

const exec = (difficulty) => {
  
  const N = 9

  let m = getEmptyBoard()

  if(solveEfficient(m)) {

    const solution = JSON.parse( JSON.stringify(m) )

    let sectorList = new Array(N).fill(0).map((x, index) => index)

    // console.log(sectorList)

    let areaCounts = JSON.parse(JSON.stringify(LEVELS[difficulty].areaCounts))

    while(areaCounts.length !== 0) {
      let currSector = Math.floor(Math.random() * sectorList.length)

      let currAreaCount = Math.floor(Math.random() * areaCounts.length)

      generateSector(m, sectorList[currSector], N - areaCounts[currAreaCount], N)

      sectorList.splice(currSector, 1)

      areaCounts.splice(currAreaCount, 1)
    }

    // for(let x = 0; x < LEVELS[difficulty]; x ++) {
    //   let index = Math.floor(Math.random() * ((N * N) - 1))

    //   let i = Math.floor(index / N)

    //   let j = index % 9

    //   if(m[i][j] === 0) {
    //     x --
    //   } else {
    //     m[i][j] = 0
    //   }
    // }

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

const generateSector = (m, sectorId, emptyCount, N) => {
  if(N === 9) {
    let availableIndexList = new Array(9).fill(0).map((x, index) => index)

    const rowCoeff = Math.floor(sectorId / 3)

    const columnCoeff = sectorId % 3

    while(emptyCount !== 0) {

      let currIndex = availableIndexList.splice(Math.floor(Math.random() * availableIndexList.length), 1)

      let currRow = (rowCoeff * 3) + Math.floor(currIndex / 3)

      let currColumn = (columnCoeff * 3) + Math.floor(currIndex % 3)

      m[parseInt(currRow)][parseInt(currColumn)] = 0

      emptyCount--
    }
  }

}

module.exports = {
   exec
}