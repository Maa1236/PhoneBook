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

// export function encodeAsBase64(file) {
//     const reader = new FileReader();
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//     return new Promise((resolve, reject) => {
//       reader.onerror = () => {
//         reader.abort();
//         reject(new DOMException("Problem parsing input file."));
//       };
//       reader.onload = () => {
//         resolve(reader.result);
//       }
//     })
//   }

  export const handleChange = ({target}, setter, set) => {
    setter({ ...set, [target.name]: target.value })
  }

  export const handleUpload = (event, setter, set) => {

    var img = event.target.files[0];
    
    try {
      var reader = new FileReader();
      

      reader.onload = () => {
        setter({ ...set, [event.target.name]: reader.result })
      };

      reader.readAsDataURL(img);
      

    } catch (e) {
      console.log(e.message)
    }
   
  }

