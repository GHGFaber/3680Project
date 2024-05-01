import sqlite3 from "sqlite3";

var db;
console.log("createDb chain");

if (db !== null) {
  db = new sqlite3.Database("./db/trivia.db");
}

// db.run(`create table room (id int primary key, code VARCHAR, members TEXT )`);

export var db;
