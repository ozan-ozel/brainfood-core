const config = require('../config')

const SUDOKU_LEVELS = config.LEVELS.SUDOKU
const { parameter_missing, parameter_wrong } = config.RESPONSE_STATUS
const { SEGMENT_1_LEN, SEGMENT_2_LEN, SEPARATOR } = config.TOKEN

const initiate = async (req, res, next) => {

  if("difficulty" in req.body) {
    if(SUDOKU_LEVELS[req.body.difficulty]) {
      next()
    } else {
      res.status(400).send({
        status: parameter_wrong,
        message: "Valid difficulty levels are : " + JSON.stringify(SUDOKU_LEVELS)
      })
    }
  } else {
    res.status(400).send({
      status: parameter_missing,
      message: "'difficulty' parameter should exist in the body."
    })
  }
}

module.exports = {
  initiate
}