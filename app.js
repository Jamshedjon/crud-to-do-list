const time = document.getElementById("time");
const dateText = document.getElementById("date");
const form = document.getElementById("form");
const formEdit = document.getElementById("form-edit");
const todosList = document.getElementById("todos-list");
const todoText = document.getElementById("todo-text");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");
let editItemId;
function getDate() {
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  let month = date.getMonth();
  let monthDay = date.getDate();
  let year = date.getFullYear();

  if (h < 10) {
    h = `0` + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  time.textContent = `${h}:${m}:${s}`;
  dateText.textContent = ` ${monthDay} ${months[month]}-${year}`;
}
setInterval(() => {
  getDate();
}, 1000);
// check
let todosApl = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todosApl.length) showTodos();
// set todos to local storage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todosApl));
}

// show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  todosList.innerHTML = "";
  todos.forEach((item, i) => {
    todosList.innerHTML += `
    <li class="item">
  <div  >
    <input id="check${i}" type="checkbox" onclick="setComplated(${i})" />
  </div>
  <div class="todo-wrapper">
  <p id="todo-text">${item.text}</p>
    <span>${item.time}</span>
    </div>
  
    <span id="edit" class="material-symbols-outlined" onclick="editTodo(${i})">edit</span>
    <span id="delete" class="material-symbols-outlined" onclick="deleteFunc(${i})">delete</span>
</li>
  `;
  });
  todos.forEach((item, i) => {
    document.getElementById(`check${i}`).checked = todosApl[i].complited;
  });
}

// showError
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

// get todos
form.addEventListener("submit", (elem) => {
  elem.preventDefault();
  const todotext = form.input.value.trim();
  form.reset();
  if (todotext.length) {
    todosApl.push({
      text: todotext,
      time: `${time.textContent},${dateText.textContent}`,
      complited: false,
    });
    setTodos();
    showTodos();
  } else {
    showMessage("error-text", "Please,enter some text...");
  }
});

function deleteFunc(id) {
  console.log(id);
  const deletedTodos = todosApl.filter((item, i) => {
    return i !== id;
  });
  todosApl = deletedTodos;
  setTodos();
  showTodos();
}

// set complated
function setComplated(id) {
  const complatedTodos = todosApl.map((item, i) => {
    if (id == i) {
      return { ...item, complited: item.complited == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todosApl = complatedTodos;

  setTodos();
  showTodos();
}

// edit form
formEdit.addEventListener("submit", (elem) => {
  elem.preventDefault();
  const todotext = formEdit.input.value.trim();
  formEdit.reset();
  if (todotext.length) {
    todosApl.splice(editItemId, 1, {
      text: todotext,
      time: `${time.textContent},${dateText.textContent}`,
      complited: false,
    });
    setTodos();
    showTodos();
    closeFunction();
  } else {
    showMessage("edit-error-text", "Please,enter some text...");
  }
});
//  edit todo

const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

function editTodo(id) {
  open();
  editItemId = id;
}

function open() {
  modal.classList.remove("modal-hidden");
  overlay.classList.remove("overlay-hidden");
}
function closeFunction() {
  modal.classList.add("modal-hidden");
  overlay.classList.add("overlay-hidden");
}
