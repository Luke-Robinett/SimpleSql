const connection = require("../config/connection");

class SimpleSql {
 constructor() {
  this.command = "";
  this.params = [];
 }

 select(fields) {
  this.command = "";
  this.params = "";
 }

 selectify(fields) {
  if (fields.length === 0) {
   throw("fields must contain at least one element.");
  }

  let text = "";
  for (let i = 1; i < fields.length; i++) {
   text += "??, ";
  }
  return text + "??";
 }
}