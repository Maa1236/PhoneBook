export var db = openDatabase('contacts', '1.0', 'my contacts app', 2 * 1024 * 1024);

export const createTables = () => {
    db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS contacts(id integer primary key autoincrement, image, firstname, lastname, address)');
    });
  }



