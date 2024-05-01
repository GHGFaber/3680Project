// import connect from "socket.io-client";
import { connect } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const socket = connect("http://localhost:3000", {
  path: "",
  transports: ["websocket"],
});

async function socketConnect() {
  let code = Math.random().toString(36).slice(2, 6);
  console.log(code);
  socket.connect();
  console.log(socket.id);
  console.log("hello");
  console.log("Successfully connected!");
  socket.emit("room_join", `${code}`);
  socket.on("welcome", (data) => {
    console.log(data);
  });
  try {
    const response = await axios.post("http://localhost:3000/createRoom", {
      code: code,
    });
  } catch (error) {}
}
async function socketJoin() {
  const input = document.getElementById("code");
  socket.connect();
  socket.emit("room_join", `${input.value}`);
  socket.on("welcome", (data) => {
    console.log(data);
  });
}

globalThis.socketConnect = socketConnect;
globalThis.socketJoin = socketJoin;
