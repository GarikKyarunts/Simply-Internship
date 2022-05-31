import { BASE_URL } from "../constants/baseURL.js";
import { Todo } from "../components/Todo.js";

let idForTodos = 0;

export const renderAllTodos = async () => {
  listOfTodos.innerHTML = "";
  let todos;
  try {
    const response = await fetch(`${BASE_URL}/todos`);
    todos = await response.json();
  } catch (error) {
    console.log(error.message);
  }

  todos.forEach((todo) => {
    listOfTodos.append(Todo(todo, idForTodos++));
  });
};

const todoTitleInput = document.getElementById("titleOfTodo");
const todoContentInput = document.getElementById("contentOfTodo");
const todoDueDateInput = document.getElementById("dueDateOfTodo");
const createTodoBtn = document.getElementById("createTodoBtn");
const listOfTodos = document.getElementById("list-of-todos");

let todoTitle = "",
  todoContent = "",
  todoDueDate = "";

todoTitleInput.addEventListener("input", (e) => {
  todoTitle = e.target.value;
});

todoContentInput.addEventListener("input", (e) => {
  todoContent = e.target.value.trim();
});

todoDueDateInput.addEventListener("change", (e) => {
  todoDueDate = "";
  todoDueDate = e.target.value;
});

createTodoBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (
    !todoTitle ||
    !todoContent ||
    todoDueDate < new Date(Date.now() + 1.44e7).toISOString().slice(0, 16)
  ) {
    alert("Please, fill in the form correctly!");
    return;
  }

  const data = {
    title: todoTitle,
    content: todoContent,
    dueDate: todoDueDate,
  };

  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    });

    const message = await response.text();
    console.log(message);

    todoTitleInput.value = "";
    todoContentInput.value = "";
    todoDueDateInput.value = "";

    renderAllTodos();
  } catch (error) {
    console.log(error);
  }
});

window.addEventListener("load", () => {
  renderAllTodos();
});
