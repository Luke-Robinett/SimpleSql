const Query = require("./lib/query");

// doInsert();
const query = new Query();
query
.select("*")
.from("users")
.innerJoin("laptops", "users.ID", "user_id")
.go(result => {
 console.log(result);
});

function doInsert() {
 const query = new Query();

 query
  .insert(
   "users",
   "name"
  )
  .select("name")
  .from("users")
  .whereEqual("ID", "3")
  .go(result => {
   console.log(result);
   doSelect();

  });
}

function doSelect() {
 const query = new Query();

 query
  .select(
   "*"
  )
  .from("users")
  // .whereEqual("ID", "2")
  .go(result => {
   console.log(JSON.stringify(result));
  });
}