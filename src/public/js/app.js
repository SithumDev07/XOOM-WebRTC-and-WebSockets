const socket = io();
const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

const room = document.querySelector("#room");

room.hidden = true;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("room", { payload: input.value }, showRoom);
  input.value = "";
});
