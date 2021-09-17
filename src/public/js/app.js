const socket = io();
const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

const room = document.querySelector("#room");

room.hidden = true;
let roomName;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const title = room.querySelector("h3");
  title.innerText = `Room: ${roomName}`;
}

function addMessage(message) {
  const list = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  list.appendChild(li);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("room", { payload: input.value }, showRoom);
  roomName = input.value;
  input.value = "";
});

socket.on("welcome", () => {
  console.log("it works");
  addMessage("Someone joined");
});
