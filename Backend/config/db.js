// import mysql from "mysql2";

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "K@vipriy@246810", // change this
//   database: "ecommerce",
// });

// db.connect((err) => {
//   if (err) {
//     console.log("DB Error:", err);
//   } else {
//     console.log("MySQL Connected ✅");
//   }
// });

// export default db;

import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "K@vipriy@246810",
  database: process.env.DB_NAME || "ecommerce",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

export default db;