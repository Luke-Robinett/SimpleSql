const { Selector } = require("./lib/sss");

const selector = new Selector();

selector
 .select([
  "ID",
  "name"
 ])
 .from("users")
 .whereEqual("ID", "2")
 .go(result => {
  console.log(JSON.stringify(result));
 });
