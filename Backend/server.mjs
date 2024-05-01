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
    console.log(data);
    socket.join(`${data}`);
    io.to(`${data}`).emit("welcome", `welcome to ${data}`);
    db.run(`create table ${data} (id INTEGER PRIMARY KEY)`);
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
