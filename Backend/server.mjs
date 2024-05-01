import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import { db } from "./database.mjs";
import sqlite3 from "sqlite3";

const app = express();
app.set("trust proxy", 1); // Trust first proxy

const httpServer = app.listen("3000", () => {
  console.log(`🚀 Server ready at http://0.0.0.0:3000`);
});
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

const io = new Server(httpServer, {
  cors: { origin: "http://127.0.0.1:5500" },
});

io.on("connection", (socket) => {
  socket.on("room_join", (data) => {
    console.log(data.code);
    db.all(`select * from room WHERE code = '${data.code}'`, (err, rows) => {
      if (err) throw err;
      console.log(rows);
      if (rows.length <= 0 && data.join == false) {
        console.log("insert");
        db.run(
          `INSERT INTO room (id, code, members) VALUES(NULL, '${data.code}', '${data.name}')`
        );
      } else if (data.join == true && rows.length > 0) {
        console.log("update");
        let currMembers = rows[0].members || "";
        let newMembers =
          currMembers +
          (currMembers !== null && currMembers.length > 0 ? "," : "") +
          data.name;
        console.log(newMembers);
        db.run(
          `UPDATE room SET members = '${newMembers}' WHERE code ='${data.code}'`
        );
      }
    });
  });
});

// app.post("/createRoom", async (req, res) => {
//   const { code } = req.body;

//     newdb.exec(`
//     create table hero (
//         hero_id int primary key not null,
//         hero_name text not null,
//         is_xman text not null,
//         was_snapped text not null
//     );

// });
