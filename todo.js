const text = document.getElementById("text");
const addTaskButton = document.getElementById("addTaskBtn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

let todoArray = [];

addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    let todo = localStorage.getItem("todo");
    if (todo === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todo);
    }
    todoArray.push(text.value);
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
   });

// Functions

function displayTodo() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todo);
    }

    let htmlCode = "";
    todoArray.forEach((list, ind) => {
      newTask = document.createElement('div')
      newTask.className = "todo draggable";
      newTask.draggable = "true";
      newTask.innerHTML = `<p>${list}</p>
            <button onclick='edit(${ind})' class=''>Edit</button>
            <button onclick='deleteTodo(${ind})' class=''>Delete</button>`
    });
    listBox.append(newTask);
   }

function deleteTodo(ind) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(ind, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
   }

function edit(ind) {
    saveInd.value = ind;
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    text.value = todoArray[ind];
    addTaskButton.style.display = "none";
    saveTaskButton.style.display = "block";
   }

saveTaskButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = saveInd.value;
    todoArray[id] = text.value;
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
   });


   