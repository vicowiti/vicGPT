import bot from "./public/bot.svg";
import user from "./public/user.svg";

const form = document.querySelector("form");
const chatContainer = document.getElementById("chat-container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setTimeout(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function genRandomId() {
  let timestamp = Date.now();
  let randomNum = Math.random();
  let hexString = randomNum.toString(16);
  return `id-${timestamp}-${hexString}`;
}

function chatStripe(isAI, value, id) {
  return `
    <div class="wrapper ${isAI && "ai"}">
        <div class="chat">
            <div class="profile">
            <img width="30" src="${isAI ? bot : user}" alt="${
    isAI ? "bot" : "user"
  }" />
            </div>
            <div class="message" id=${id}>${value}</div>
        </div>
    </div>
    
    `;
}

async function handleSubmit(e) {
  e.preventDefault();

  const data = new FormData(form);
  //User's stripe

  chatContainer.innerHTML += chatStripe(
    false,
    data.get("prompt"),
    genRandomId()
  );

  form.reset();

  //Bot's stripe
  let botsId = genRandomId();
  chatContainer.innerHTML += chatStripe(true, "hjhjhjhj", botsId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById("botsId");

  loader(messageDiv);
}

form.addEventListener("submit", handleSubmit);
form.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
