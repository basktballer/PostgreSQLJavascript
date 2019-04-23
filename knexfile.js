// Update with your config settings.

const settings = require("./settings");  

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : settings.host,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  }

};
