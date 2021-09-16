import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
// app.get("/*", (_, res) => res.redirect("home"));

const handleListen = () => console.log("Listening on localhost");

const server = http.createServer(app);
const webss = new WebSocket.Server({ server });

webss.on("connection", (socket) => {
  console.log("Connected to browser");
  socket.on("close", () => console.log("Disconnected from the client"));
  socket.on("message", function incoming(message) {
    console.log(message);
  });
  socket.send("Hello");
});

server.listen(3000, handleListen);
