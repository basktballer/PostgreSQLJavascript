const dayjs = require('dayjs');
const db = require ('./test_script') 
const input = process.argv[2];

db.lookupPeople(input,function(err, output) {
      if(!err) {
        console.log(`Found ${output.rows.length} track(s) by the name '${input}': `)
        output.rows.forEach( (element, index) => {
          console.log(`- ${index + 1}: ${element.first_name} ${element.last_name}, born '${dayjs(element.birthdate).format('YYYY-MM-DD')}'`);
        });
      } else {
        console.log(err);
      }
    });

console.log("Searching...");

