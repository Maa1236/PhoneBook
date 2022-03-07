

export var db = openDatabase('contacts', '1.0', 'my contacts app', 2 * 1024 * 1024);

export const createTables = () => {
    db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS contacts(id integer primary key autoincrement, image, firstname, lastname, address)');
    });
  }


 export function listContacts(setFunc) {

    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM contacts', [], function (tx, results) {
        var len = results.rows.length;
        var i;
        var res = [];
        for (i = 0; i < len; i++) {
          var item = results.rows[i];
          res.push({ id: item.id, image: item.image, firstname: item.firstname, lastname: item.lastname, address: item.address })
        }
        setFunc(res)
      });
    });
  }

