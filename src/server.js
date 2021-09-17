import express from "express";
import http from "http";
// import WebSocket from "ws";

import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on localhost");

const server = http.createServer(app);
const io = SocketIO(server);

io.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket event: ${event}`);
  });

  socket.on("room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome");
  });
});

// const wss = new WebSocket.Server({ server });

// const sockets = [];
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous";
//   console.log("Connected to browser");
//   socket.on("close", () => console.log("Disconnected from the client"));
//   socket.onmessage = (message) => {
//     const parsed = JSON.parse(message["data"]);
//     switch (parsed.type) {
//       case "new_message":
//         sockets.forEach((eachSocket) =>
//           eachSocket.send(`${socket.nickname}: ${parsed.payload}`)
//         );
//         break;
//       case "nickname":
//         socket["nickname"] = parsed.payload;
//         break;
//       default:
//         break;
//     }
//   };
// });

server.listen(3000, handleListen);
