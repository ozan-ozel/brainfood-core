require('dotenv').config()

const db = require('./base').db
const str = require('./base').str
const int = require('./base').int
const FilterSet = require('./base').FilterSet

const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
})

pgp.pg.types.setTypeParser(1184, str => {
  return new Date(Date.parse(str + "+0000"));
})

const tblPlayers = "tblPlayers"

/**
 * id
 * name
 * isActive
 * lastGamePlayed
 * updatedAt
 * createdAt
 */

module.exports = {
  createPlayer: ({name}) => {
    return new Promise((resolve, reject) => {

      const csPlayers = new pgp.helpers.ColumnSet([
        str('name'),
        str('createdAt')
      ], {table: tblPlayers})
  
      let body = {
        name,
        isActive: false,
        createdAt: new Date()
      }
  
      const insert = pgp.helpers.insert(body, csPlayers)
  
      db.oneOrNone(insert)
      .then((result) => {
        resolve()
      })
      .catch((err) => {
        reject(err)
      })

    })
  },
  getPlayerByName: (name) => {
    return new Promise((resolve, reject) => {
      let q = `SELECT * from "tblPlayers" ` + pgp.as.format(' WHERE "name"=$1', [name])

      db.manyOrNone(q)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  getPlayerById: (id) => {
    return new Promise((resolve, reject) => {
      let q = `SELECT * from "tblPlayers" ` + pgp.as.format(' WHERE "id"=$1', [id])

      db.manyOrNone(q)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  updatePlayer: (name, isActive, lastGamePlayed) => {
    return new Promise((resolve, reject) => {
      const csPlayers = new pgp.helpers.ColumnSet([
        str('isActive'),
        str('lastGamePlayed'),
        str('updatedAt')
      ], {table: tblPlayers})

      let body = {
        isActive,
        lastGamePlayed,
        updatedAt: new Date()
      }

      const update = pgp.helpers.update(body, csPlayers) + pgp.as.format(' WHERE "name"=$1', [name])

      db.oneOrNone(update)
      .then((result) => {
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

}