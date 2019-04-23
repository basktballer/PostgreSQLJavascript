

module.exports = (function(){  

  const pg = require('pg');
  const settings = require("./settings");
  
  const client = new pg.Client({
    user : settings.user,
    password : settings.password,
    database: settings.database,
    host : settings.host,
    port : settings.port,
    ssl : settings.ssl
  });
  
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
  });
  
  function outputOne(callback) {
    client.query("SELECT $1::int AS number", ["1"], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      } else 
      callback(result.rows[0].number);
      client.end()
    });

  }

  function lookupPeople(name, callback) {
    client.query(`SELECT * FROM famous_people WHERE first_name = $1 OR last_nameasfas = $1`, [name])
    .then (results => {
      callback(null, results)
      client.end();
    })
    .catch (e => callback(e.stack))
  }

  return {
    outputOne: outputOne,
    lookupPeople: lookupPeople
  }

})()