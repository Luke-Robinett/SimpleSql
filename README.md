# SimpleSql
SimpleSql provides a simple and intuitive wrapper for MySQL queries that mirrors SQL syntax. For example, SELECT ID, NAME FROM USERS WHERE ID = 5 would be expressed as simpleSql.select({"ID", "NAME"}).from("USERS").where("ID = 5");
