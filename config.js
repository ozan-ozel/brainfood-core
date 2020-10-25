const RESPONSE_STATUS =  {
  success: "Success",
  unexpected_err: "Unexpected Error",
  parameter_missing: "Parameter Missing",
  parameter_wrong: "Parameter Wrong"
}

const GAME_STATES = {
  SUDOKU: {
    "INITIAL": "INITIAL",
    "FINISH": "FINISH",
    "CONTINUE": "CONTINUE",
    "FAIL": "FAIL"
  }
}

const LEVELS = {
  SUDOKU: {
    "EASY": {
      total: 36,
      areaCounts: [6, 5, 5, 4, 4, 4, 3, 3, 2]
    },
    "MEDIUM": {
      total: 31,
      areaCounts: [6, 5, 4, 4, 3, 3, 2, 2, 2]
    },
    "HARD": {
      total: 26,
      areaCounts: [5, 4, 4, 3, 3, 2, 2, 2, 1]
    }
  }
}

// token has 2 segments, separated by '-'
// [16]-[12]
const TOKEN = {
  SEGMENT_1_LEN: 16,
  SEPARATOR: '-',
  SEGMENT_2_LEN: 12,
  
  // numbers 48 - 57
  // Uppercase 65 - 90
  // Lowercase 97 - 122
  ALPHANUM_CHAR_CODES: [
    48,  49,  50,  51,  52,  53,  54,  55,  56,  57,  66,
    67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,
    78,  79,  80,  81,  82,  83,  84,  85,  86,  87,  88,
    89,  90,  98,  99, 100, 101, 102, 103, 104, 105, 106,
    107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
    118, 119, 120, 121, 122
  ]
}

module.exports = {
  LEVELS,
  RESPONSE_STATUS,
  GAME_STATES,
  TOKEN
}