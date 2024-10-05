import mysql from 'mysql2';

export async function databaseConnection(){

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 25060
  });

// Wrap the creation of connection in a Promise
  return new Promise((resolve, reject) => {
      connection.connect(err => {
          if (err) {
              reject(err); // Connection failed
          } else {
              resolve(connection); // Connection successful
          }
      });
  });

}

export function executeQuery(connection:any, q:string) {
    return new Promise((resolve, reject) => {
        connection.query(q, (error:any, results:any) => {
            if (error) {
                reject(new Error('Error- ' + error.message + ' query: ' + q));
            } else {
                resolve(results);
            }
        });
    });
}