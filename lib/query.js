const connection = require("../config/connection");

class Query {
 constructor() {
  this.command = {
   insertData: {
    text: "",
    table: "",
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
  this.command.insertData.table = table;
  if (typeof (fields) === "object" && fields.length > 0) {
   this.command.insertData.text += " (" + this.stringArrayToList(fields, "??") + ")\n";
   this.command.insertData.fields = fields;
  }
  else if (typeof (fields) !== "object" && typeof(fields) !== "undefined") {
   this.command.insertData.text += " (??)\n";
   this.command.insertData.fields = [ fields ];
  }
  if (typeof (values) === "object" && values.length > 0) {
   this.command.insertData.text += "VALUES (" + this.stringArrayToList(values, "?") + ")\n";
   this.command.insertData.values = values;
  }
  else if (typeof (values) !== "object" && typeof(values) !== "undefined") {
   this.command.insertData.text += "VALUES (?)\n";
   this.command.insertData.values = [ values ];
  }

  return this;
 }

 select(fields) {
  if (typeof(fields) === "object" && fields.length > 0) {
   this.command.selectData.text = "SELECT " + this.stringArrayToList(fields, "??") + "\n";
   this.command.selectData.fields = fields;
  }
  else if (typeof(fields) !== "object" && typeof(fields) !== "undefined") {
   this.command.selectData.text = "SELECT ??\n";
   this.command.selectData.fields = [ fields ];
  }

  return this;
 }

 from(tableName) {
  this.command.fromData.text = "FROM ??\n";
  this.command.fromData.table = tableName;

  return this;
 }

 innerJoin(table, leftKey, rightKey) {
  this.command.joinDataArray.push({
   text: "INNER JOIN ?? ON ?? = ??\n",
   table: table,
   leftKey: leftKey,
   rightKey: rightKey
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
  let commandText = this.command.insertData.text
   + this.command.selectData.text
   + this.command.fromData.text;
  this.command.joinDataArray.forEach(joinDataItem => {
   commandText += joinDataItem.text;
  });
  commandText += this.command.whereData.text;
  this.command.whereAdditionalDataArray.forEach(whereDataItem => {
   commandText += whereDataItem.text;
  });

  const queryParams = [];
  (this.command.insertData.table !== "") ? queryParams.push(this.command.insertData.table) : null;
  (this.command.insertData.fields.length > 0) ? queryParams.push(...this.command.insertData.fields) : null;
  (this.command.insertData.values.length > 0) ? queryParams.push(...this.command.insertData.values) : null;
  (this.command.selectData.fields.length > 0) ? queryParams.push(...this.command.selectData.fields) : null;
  (this.command.fromData.table !== "") ? queryParams.push(this.command.fromData.table) : null;
  this.command.joinDataArray.forEach(joinDataItem => {
   queryParams.push(
    joinDataItem.table,
    joinDataItem.leftKey,
    joinDataItem.rightKey
   );
  });
  ((this.command.whereData.field !== "") && (this.command.whereData.value !== ""))
   ? queryParams.push(
    this.command.whereData.field,
    this.command.whereData.value
   ) : null;
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