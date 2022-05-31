import { BASE_URL } from "../constants/baseURL.js";
import { renderAllTodos } from "../script.js";

const deleteTodo = (deleteBtn, idOfTodo) => {
  deleteBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/todos/${idOfTodo}`, {
      method: "DELETE",
    });
    console.log(await response.text());
    renderAllTodos();
  }); //deleting todo
};

const renderListItem = (labels, values, idOfTodo, reminded, i) => {
  const listItem = document.createElement("li");

  labels.forEach((label, index) => {
    const container = document.createElement("div");
    container.id = label + i;
    const divForTextContent = document.createElement("div");
    const labelForDiv = document.createElement("label");

    if (label === "status" && !values[index]) {
      divForTextContent.innerHTML = "Not Completed";
    } else if (label === "status" && values[index]) {
      divForTextContent.innerHTML = "Completed";
    } else {
      divForTextContent.innerHTML = values[index];
    }

    if (label === "dueDate") {
      labelForDiv.innerHTML = "DUE DATE";
    } else {
      labelForDiv.innerHTML = label.toUpperCase();
    }

    container.append(labelForDiv, divForTextContent);

    container.classList.add("container-of-todo-content");
    listItem.append(container);
  }); //rendering list item with todo's content

  i++;

  const containerForBtns = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const updateBtn = document.createElement("button");
  const commitUpdBtn = document.createElement("button");

  commitUpdBtn.innerHTML = "Commit Updates";
  updateBtn.innerHTML = "Update";
  deleteBtn.innerHTML = "Delete";

  containerForBtns.append(deleteBtn, updateBtn);
  containerForBtns.classList.add("container-for-btns");

  deleteTodo(deleteBtn, idOfTodo);

  updateBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    updateBtn.disabled = true;
    containerForBtns.append(commitUpdBtn);

    const arrayOfLabels = labels.map((label) =>
      document.querySelector(`#${label + (i - 1)}`).querySelector("div")
    );

    arrayOfLabels.forEach((div, index) => {
      if (index === 2) {
        div.innerHTML = `<input id="updateddueDate${
          i - 1
        }" type="datetime-local" value="${values[index]}" />`;
      } else if (index === 3) {
        div.innerHTML = `<input id="updatedstatus${i - 1}" type="checkbox" ${
          values[3] ? "checked" : ""
        } />`;
      } else {
        div.innerHTML = `<input id="updated${labels[index]}${
          i - 1
        }" type="text" value="${values[index]}" />`;
      }
    });

    commitUpdBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      if (
        document.getElementById("updateddueDate" + (i - 1)).value <
        new Date(Date.now() + 1.44e7).toISOString().slice(0, 16)
      ) {
        alert("Please, fill in correct due date.");
        return;
      }

      const data = {
        title: document.getElementById("updatedtitle" + (i - 1)).value,
        content: document.getElementById("updatedcontent" + (i - 1)).value,
        dueDate: document.getElementById("updateddueDate" + (i - 1)).value,
        status: document.getElementById("updatedstatus" + (i - 1)).checked,
      };

      const response = await fetch(`${BASE_URL}/todos/${idOfTodo}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      });

      console.log(await response.text());
      renderAllTodos();
    });
  });

  listItem.append(containerForBtns);

  listItem.classList.add("list-item");
  return listItem;
};

export const Todo = (data, i) => {
  const { id: idOfTodo, reminded, ...dataOfTodo } = data;
  const labels = Object.keys(dataOfTodo);
  const values = Object.values(dataOfTodo);
  return renderListItem(labels, values, idOfTodo, reminded, i);
};
