const connection = require("../config/connection");

class Select {
 constructor() {
  this.command = {
   selectData: {
    text: "",
    fields: []
   },
   fromData: {
    text: "",
    table: ""
   },
   joinDataArray: [],
   whereData: {
    text: "",
    field: "",
    value: ""
   },
   whereAdditionalDataArray: [],
   groupByData: {
    text: "",
    fields: []
   },
   orderByData: {
    text: "",
    fields: []
   }
  };
 }

 select(fields) {
  this.command.selectData.text = "SELECT " + selectify(fields);
  this.command.selectData.fields = fields;

  return this;
 }

 from(tableName) {
  this.command.fromData.text = "FROM ??\n";
  this.command.fromData.table = tableName;

  return this;
 }

 innerJoin(innerJoinData) {
  this.command.joinDataArray.push({
   text: "INNER JOIN ?? ON ?? = ??\n",
   params: {
    table: innerJoinData.table,
    leftKey: innerJoinData.leftKey,
    rightKey: innerJoinData.rightKey
   }
  });

  return this;
 }

 whereEqual(field, value) {
  this.command.whereData.text = "WHERE ?? = ?\n";
  this.command.whereData.field = field;
  this.command.whereData.value = value;

  return this;
 }

 go(cb) {
  let commandText = this.command.selectData.text
   + this.command.fromData.text;
  this.command.joinDataArray.forEach(joinDataItem => {
   commandText += joinDataItem.text;
  });
  commandText += this.command.whereData.text;
  this.command.whereAdditionalDataArray.forEach(whereDataItem => {
   commandText += whereDataItem.text;
  });

  const queryParams = this.command.selectData.fields;
  queryParams.push(this.command.fromData.table);
  this.command.joinDataArray.forEach(joinDataItem => {
   queryParams.push(
    joinDataItem.params.table,
    joinDataItem.params.leftKey,
    joinDataItem.params.rightKey
   );
  });
  queryParams.push(
   this.command.whereData.field,
   this.command.whereData.value
  );
  this.command.whereAdditionalDataArray.forEach(whereDataItem => {
   queryParams.push(
    whereDataItem.field,
    whereDataItem.value
   );
  });

  const query = connection.query(commandText, queryParams, (err, result) => {
   console.log(query.sql);
   if (err) {
    console.log(err.message);
    return;
   }
   cb(result);
  });
 }
}

function selectify(fields) {
 if (fields.length === 0) {
  throw ("fields must contain at least one element.");
 }
 let text = "";
 for (let i = 1; i < fields.length; i++) {
  text += "??, ";
 }
 return text + "??\n";
}

module.exports = Select;