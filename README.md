# SimpleSql

SimpleSql provides a simple and intuitive wrapper for MySQL queries that mirrors SQL syntax.

## Example
### SQL Command

```
SELECT ID, name
FROM users
WHERE ID = 2;
```

### Writing it in SimpleSql

```
const Select = require("./lib/select");

const select = new Select();

select.select( [ "ID", "name" ] )
.from("users")
.whereEqual("ID", "2")
.go(result => {
 console.log(result);
});
```
