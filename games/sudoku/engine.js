const {SUDOKU} = require('../../config').GAME_STATES

const {isValid, checkFull} = require('./common')

const sudokuGenerator = require('../sudoku/generators')

const initiateGame = (difficulty) => {
  let result = sudokuGenerator.exec(difficulty)

  return {...result, state: SUDOKU.INITIAL}
}

const makeMove = (data) => {
  const {board, i, j, v} = data

  let status = SUDOKU.CONTINUE

  if(isValid(board, i, j, v)) {

    // check to see if the board is full, i.e. this is the last move
    if(checkFull(board)) {
      // save it to redis
      status = SUDOKU.FINISH
    }

  } else {
    status = SUDOKU.FAIL
  }

  return status
}

module.exports = {
  initiateGame,
  makeMove
}