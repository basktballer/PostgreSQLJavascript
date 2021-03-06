module.exports = (function(){  

  const settings = require("./settings");  
  const knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.host,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  });

  function lookupPeople(input, callback) {

    knex.select('*').from('famous_people')
    .where('first_name', '=' ,input).orWhere('last_name', '=', input)
    .asCallback((err, rows) => {
      if (err) callback(err);
      callback(null, rows);
      knex.destroy();
    });
  }

  function addPerson(input) {
    const inputArr = [{ first_name: input[0], last_name: input[1], birthdate: input[2]}];
    knex('famous_people').insert(inputArr)
    .then(() => console.log(`Person added. First Name: ${input[0]}, Last Name: ${input[1]}, Birthdate: ${input[2]}`))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
    
  }

  function destroy() {
    console.log('destroy');
    knex.destroy();
  }

  return {
    lookupPeople:lookupPeople,
    destroy:destroy,
    addPerson: addPerson
  }

})();