require('dotenv').config()

const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});

// Preparing the connection details:
const cn = 'postgres://' 
  + process.env.PG_USER + ':'
  + process.env.PG_PASSWORD + '@'
  + process.env.PG_HOST + ':'
  + process.env.PG_PORT + '/'
  + process.env.PG_DATABASE_NAME;

// Creating a new database instance from the connection details:
const db = pgp(cn);

if(process.env.NODE_ENV === "dev") {
  db.connect()
    .then(obj => {
        // Can check the server version here (pg-promise v10.1.0+):
        const serverVersion = obj.client.serverVersion;
        console.log("server connection done")
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });
}

// generic way to skip NULL/undefined values for strings:
const str = (col) => {
  return {
      name: col,
      skip: function () {
          var val = this[col];
          return val === undefined;
      }
  };
}

// generic way to skip NULL/undefined values for integers,
// while parsing the type correctly:
const int = (col) => {
  return {
      name: col,
      skip: function () {
          var val = this[col];
          return val === null || val === undefined;
      },
      init: function () {
          return parseInt(this[col]);
      }
  };
}

class FilterSet {
  constructor(filters, options) {
      if (!filters || typeof filters !== 'object') {
          throw new TypeError('Parameter \'filters\' must be an object.');
      }
      this.filters = filters;
      this.options = options;
      this.rawType = true; // do not escape the result from toPostgres()
  }

  toPostgres(/*self*/) {
      // let self = this
      const keys = Object.keys(this.filters);

      const filterKeys = [];

      keys.forEach(el => {
        if(this.filters[el])
          filterKeys.push(el);
      })

      const s = filterKeys.map(
        k => {
         if(this.options && this.options[k] && this.options[k]['%LIKE%']) {
            let tmp =
              ((this.options && this.options[k] && this.options[k]['tbl']) 
                ? (this.options[k]['tbl'] + '.') : '') +
                pgp.as.name(k) + ' LIKE \'%${' + k + ':value}%\'' ;
          
            return tmp;
          }
          else {
            let tmp = 
              (this.options && this.options[k] && this.options[k]['tbl'] ? (this.options[k]['tbl'] + '.') : '') +
                pgp.as.name(k) + ' = ${' + k + '}'
            return tmp;
          }
        }).join(' AND '); 

      return s==="" ? true : pgp.as.format(s, this.filters);
  }
}

module.exports =   {
  db,
  str,
  int,
  FilterSet
}
