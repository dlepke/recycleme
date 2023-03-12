function getData() {
  console.log("hello!");
  fetch("/classification")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
    });
}

getData();

function addUserMessage() {
  const input = document.getElementById("chatEntry");
  const msg = input.value.trim();
  if (msg !== "") {
    console.log(msg);
    input.value = "";
    // add usr msg
    const messageList = document.getElementById("messageList");
    const newMessage = document.createElement("p");
    newMessage.classList.add("userMsg");
    const textNode = document.createTextNode(msg);
    newMessage.append(textNode);
    messageList.append(newMessage);
    getBotReply();
  }
}

function getBotReply() {
  console.log("I'm from bot!");
  const msg = "hello, banana";
  const messageList = document.getElementById("messageList");
  const newMessage = document.createElement("p");
  newMessage.classList.add("botMsg");
  const textNode = document.createTextNode(msg);
  newMessage.append(textNode);
  messageList.append(newMessage);
}
