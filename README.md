# Super Simple SQL
## Version 1.0.0


Super Simple SQL (SSS) provides a simple and intuitive wrapper for MySQL queries that mirrors SQL syntax.


## Example

### SQL Command

```
SELECT ID, name
FROM users
WHERE ID = 2;
```


### Writing it in SSS

```
// Import the library
const { Select } = require("./lib/sss");

// Instantiate a new Select object
const select = new Select();

// Perform a select query
select
 .select([
  "ID",
  "name"
 ])
 .from("users")
 .whereEqual("ID", "2")
 .go(result => {
  // Do something with the result
  console.log(JSON.stringify(result));
 });
```


## Installation

Simply copy the sss.js file into your project and require it into your script files as needed.


## Usage

You can import the entire library into your Node script or just the classes you need.


### Importing the entire library:

```
const sss = require("./sss");  // Add path as needed
```


### Importing just the classes you need:

```
const { Select, Insert } = require("./sss");
```


### Instantiate An Instance:

```
const select = new Select();

// Or if you imported the whole library,
const select = new sss.Select();
```


### Intuitive Function Chaining

The beauty of using SSS is it's familiar, intuitive chaining syntax:

```
// Perform a select query
select
 .select([
  "ID",
  "name"
 ])
 .from("users")
 .whereEqual("ID", "2")
 .go(result => {
  // Do something with the result
  console.log(JSON.stringify(result));
 });
```


You can chain clauses of an SQL statement in whatever way would be logical and supported in MySQL. You cannot, for example, have two .from() calls in a single chain. The most recent .from() would replace the previous call.

Your query will not execute until you call the go() method. Pass it a callback function and use the query's results as needed.


### What's Available In This Version

This is a proof of concept version so only the Select class is available, and it has only a subset of all possible chaining functions available:


Select


.select( field_array )

field_array is an array of strings representing the table columns you want to select.


.from(table_name)

table_name is a string containing the table name that you want to select from


.innerJoin(field_data)

field_data is a JavaScript object. The following format is expected:

```
{
 table: table_name,
 leftKey: column_name,
 rightKey: columnName
}
```

table is the table to join

leftKey is the key field from the first table 

rightKey is the key field from the second table


.whereEqual(field_to_compare, value_to_check_for)

These arguments are self explanatory. For example: "name", "Sue"


Check back frequently as additional chaining functions and classes representing other SQL commands will be added soon!
