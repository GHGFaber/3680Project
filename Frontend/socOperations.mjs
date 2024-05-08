// import connect from "socket.io-client";
import { connect } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
const socket = connect("http://localhost:3000", {
  path: "",
  transports: ["websocket"],
});

socket.connect();

async function socketConnect() {
  let code;
  do {
    code = Math.random().toString(36).slice(2, 6);
  } while (/^\d/.test(code));
  localStorage.setItem("code", `${code}`);
  let name = document.getElementById("name");
  console.log(code);
  console.log(socket.id);
  console.log("hello");
  console.log("Successfully connected!");
  socket.emit("room_join", { name: name.value, code: code, join: false });
  try {
    const response = await axios.post("http://localhost:3000/createRoom", {
      code: code,
    });
  } catch (error) {}
}
async function socketJoin() {
  const code = document.getElementById("code");
  const name = document.getElementById("name");
  socket.emit("room_join", { name: name.value, code: code.value, join: true });
}
console.log(window.location.href);

let addr = window.location.href;
if (addr == "http://localhost:5500/Frontend/waitingRoom.html") {
  console.log(socket);
  socket.emit("playerInfo", {
    name: localStorage.getItem("name"),
    color: localStorage.getItem("color"),
    code: localStorage.getItem("code"),
  });
  socket.on("info", (data) => {
    console.log(data);
  });
  // console.log("hi");
}
// if (addr == "http://localhost:5500/Frontend/") {
//   socket.on("codePass", (data) => {
//     console.log("WOA");

//   });
//   // console.log("hi");
// }

globalThis.socketConnect = socketConnect;
globalThis.socketJoin = socketJoin;
