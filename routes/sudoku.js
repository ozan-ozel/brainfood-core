const validator = require('../validators/sudoku')
const controller = require('../controllers/sudoku')

module.exports = (router) => {
  router.route('/sudoku/initiate')
    .post(validator.initiate, controller.initiate)
}