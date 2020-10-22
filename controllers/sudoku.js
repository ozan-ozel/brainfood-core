const {success, unexpected_err} = require('../config').RESPONSE_STATUS

const {getToken} = require('../utils/tokenGenerator')

// sudoku methods
const {upsertGame, getGame} = require('../db/sudoku')
const {initiateGame} = require('../games/sudoku/engine')

const initiate = async (req, res) => {
  const game = initiateGame(req.body.difficulty)

  const token = getToken()

  // const result = await upsertGame({...game, token})

  if(game && token) {
    res.status(200).send({
      status: success,
      result: {
        token,
        board: game.board,
        solution: game.solution
      }
    })
  } else {
    res.status(500).send({
      status: unexpected_err,
      message: "Token or game can not be generated"
    })
  }
}

const get = async (req, res) => {
  let result = await getGame(req.body.token)

  if(result.err) {
    res.status(500).send({
      status: unexpected_err,
      message: JSON.stringify(result.err)
    })
  } else {
    res.status(200).send({
      status: success,
      result
    })
  }
}

module.exports = {
  initiate,
  get
}
