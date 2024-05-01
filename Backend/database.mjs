import sqlite3 from "sqlite3";

var db;
console.log("createDb chain");

if (db !== null) {
  db = new sqlite3.Database("./db/trivia.db");
}

export var db;
