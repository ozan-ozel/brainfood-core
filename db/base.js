const couchbase = require('couchbase')

const couchbase_url = process.env.COUCHDB_URL

const couchbase_username = process.env.COUCHDB_USERNAME

const couchbase_password = process.env.COUCHDB_PASSWORD

const cluster = new couchbase.Cluster(couchbase_url, {
  username: couchbase_username,
  password: couchbase_password
})

const dbHelper = (bucketName) => {
  return cluster.bucket(bucketName).defaultCollection()
}

module.exports = {
  dbHelper
}