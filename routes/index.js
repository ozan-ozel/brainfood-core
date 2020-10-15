const sudoku = require('./sudoku')

module.exports = (router) => {
  sudoku(router)
  return router
}