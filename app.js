const { Select } = require("./lib/simpleSql");

const select = new Select();

select
 .select([
  "ID",
  "name"
 ])
 .from("users")
 .whereEqual("ID", "2")
 .go(result => {
  console.log(JSON.stringify(result));
 });
