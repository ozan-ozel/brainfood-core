const {ALPHANUM_CHAR_CODES, SEGMENT_1_LEN, SEGMENT_2_LEN, SEPARATOR} = require('../config').TOKEN

const getToken = () => {
  let token = ""

  for(let i = 0; i < SEGMENT_1_LEN; i++) {
    let index = Math.floor(Math.random() * (ALPHANUM_CHAR_CODES.length - 1))

    token += String.fromCharCode(ALPHANUM_CHAR_CODES[index])
  }

  token += SEPARATOR

  for(let i = 0; i < SEGMENT_2_LEN; i++) {
    let index = Math.floor(Math.random() * (ALPHANUM_CHAR_CODES.length - 1))

    token += String.fromCharCode(ALPHANUM_CHAR_CODES[index])
  }

  return token
}

module.exports = {
  getToken
}