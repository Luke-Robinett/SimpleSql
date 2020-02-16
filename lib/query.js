const connection = require("../config/connection");

class Query {
 constructor() {
  this.command = {
   insertData: {
    text: "",
    fields: [],
    values: []
   },
   updateData: {
    text: "",
    table: ""
   },
   setData: {
    text: "",
    field: "",
    value: ""
   },
   deleteData: {
    text: "",
    table: ""
   },
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

 insert(table, fields, values) {
  this.command.insertData.text = "INSERT INTO ?? ";
  if (fields.length > 0) {
   this.command.insertData.text += " (" + this.stringArrayToList(fields, "??") +")\n";
   this.command.insertData.fields = fields;
  }
  if (values.length > 0) {
   this.command.insertData.text += "VALUES (" + this.stringArrayToList(values, "?") +")\n";
   this.command.insertData.values = values;
  }

  return this;
 }

 select(fields) {
  this.command.selectData.text = "SELECT " + this.stringArrayToList(fields, "??") + "\n";
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

 stringArrayToList(arr, str) {
  if (arr.length === 0) {
   throw ("arr must contain at least one element.");
  }
  let text = "";
  for (let i = 1; i < arr.length; i++) {
   text += str + ", ";
  }
  return text + str;
 }
}

module.exports = Query;