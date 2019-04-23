const knexdb = require('./knex_script') 
const input = process.argv.slice(2);
knexdb.addPerson(input);


