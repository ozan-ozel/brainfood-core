const {success, unexpected_err} = require('../config').RESPONSE_STATUS

const {getToken} = require('../utils/tokenGenerator')

const {initiateGame} = require('../games/sudoku/engine')

const initiate = async (req, res) => {
  const game = initiateGame(req.body.difficulty)

  const token = getToken()

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

module.exports = {
  initiate
}
