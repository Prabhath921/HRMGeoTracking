import SQLite from "react-native-sqlite-storage";
 
SQLite.DEBUG(true);
SQLite.enablePromise(true)

const database_name = "HRMGeoTracker.db";
const database_version = "1.0";
const database_displayname = "HRM GEO Tracking DB";
const database_size = 200000;

export default class DbConfig {
    initDB(){
        let db;
        return new Promise((resolve) => {
          console.log("Plugin integrity check ...");
          SQLite.echoTest()
            .then(() => {
              console.log("Integrity check passed ...");
              console.log("Opening database ...");
              SQLite.openDatabase(
                database_name,
                database_version,
                database_displayname,
                database_size
              )
                .then(DB => {
                  db = DB;
                  console.log("Database OPEN");
                  db.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='User'").then(() => {
                      console.log("Database is ready ... executing query ...");
                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data");
                      db.transaction((tx) => {
                          //create user table
                          tx.executeSql('CREATE TABLE IF NOT EXISTS User (UserId INTEGER PRIMARY KEY, UserName VARCHAR(150), Password VARCHAR(150), UserType INTEGER)');
                          //create userLocation table
                          tx.executeSql('CREATE TABLE IF NOT EXISTS UserLocation (UserLocationId INTEGER PRIMARY KEY AUTOINCREMENT, UserId INTEGER,Location VARCHAR(150), Latitude FLOAT,Longitude FLOAT, IsSync BOOLEAN');
                      }).then(() => {
                          console.log("Tables created successfully");
                      }).catch(error => {
                          console.log(error);
                      });
                  });
                  resolve(db);
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log("echoTest failed - plugin not functional");
            });
          });

    }

    closeDatabase(db) {
        if (db) {
          console.log("Closing DB");
          db.close()
            .then(status => {
              console.log("Database CLOSED");
            })
            .catch(error => {
              this.errorCB(error);
            });
        } else {
          console.log("Database was not OPENED");
        }
      };
}