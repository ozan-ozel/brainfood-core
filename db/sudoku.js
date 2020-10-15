const couchbase = require('couchbase')

const {dbHelper} = require('./base')

const upsertGame = async (data) => {
  try {
    const {board, solution, state, token} = data

    const modifiedAt = Date.now()

    const moveList = []

    const document = {
      board,
      solution,
      moveList,
      state,
      modifiedAt
    }

    const result = await dbHelper('sudoku').upsert(token, document)

    return {
      token,
      board,
      state
    }
  } catch(err) {
    return {err}
  }
}

const getGame = async (token) => {
  try {

    const result = await dbHelper('sudoku').get(token)

    return result.content.board

  } catch(err) {
    return {err}
  }
}

const updateGame = async (token, board, state, moveCoord) => {
  try {

    let operations = []

    if(board) {
      operations.push(couchbase.MutateInSpec.upsert("board", board))
    }

    if(state) {
      operations.push(couchbase.MutateInSpec.upsert("state", state))
    }

    if(moveCoord) {
      operations.push(couchbase.MutateInSpec.arrayAppend("moveList", moveCoord))
    }

    const result = await dbHelper('sudoku').mutateIn(token, operations)

    return true

  } catch(err) {
    return {err}
  }
}

const removeGame = async (token) => {
  try {
    let result = await dbHelper('sudoku').remove(token)

    return true
  } catch(err) {
    return {err}
  }
}

module.exports = {
  upsertGame,
  getGame,
  updateGame,
  removeGame
}