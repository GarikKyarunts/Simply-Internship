import dotenv from "dotenv";
import express from "express";
import fs from "fs/promises";
import cors from "cors";
import { reminder } from "./helpers/reminder.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const todos = await fs.readFile("./db/todos.json", "utf-8");
    res.status(200).send(JSON.parse(todos));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const todos = JSON.parse(await fs.readFile("./db/todos.json", "utf-8"));
    const nextId = todos.length ? Number(todos[todos.length - 1].id) + 1 : 1;
    const todo = {
      id: nextId,
      ...req.body,
      status: false,
      reminded: false,
    };
    todos.push(todo);
    await fs.writeFile("./db/todos.json", JSON.stringify(todos, undefined, 2));
    res
      .status(200)
      .send(
        `The ${JSON.stringify(
          todo,
          undefined,
          2
        )} was successfully added to your all todos.`
      );
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const idToBeDeleted = +req.params.id;

  try {
    const todos = JSON.parse(await fs.readFile("./db/todos.json", "utf-8"));
    const todosAfterDeletion = todos.filter(
      (todo) => todo.id !== idToBeDeleted
    );
    console.log(todosAfterDeletion);

    await fs.writeFile(
      "./db/todos.json",
      JSON.stringify(todosAfterDeletion, undefined, 2)
    );

    res.send("Deleted!");
  } catch (error) {
    res.send(error.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  const idToBeUpdated = +req.params.id;

  try {
    const todos = JSON.parse(await fs.readFile("./db/todos.json", "utf-8"));
    let todoToBeUpdated = todos.find((todo) => todo.id == idToBeUpdated);
    const updatedAlready = todoToBeUpdated;
    todoToBeUpdated = { ...todoToBeUpdated, ...req.body };
    todos.forEach((todo, index) => {
      if (todo.id === todoToBeUpdated.id) {
        todos[index] = todoToBeUpdated;
      }
    });

    await fs.writeFile("./db/todos.json", JSON.stringify(todos, undefined, 2));
    res
      .status(200)
      .send(
        `The ${JSON.stringify(
          updatedAlready,
          undefined,
          2
        )} was successfully updated.`
      );
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

app.listen(PORT, async () => {
  console.log(`Server is being listened on port ${PORT}.`);
  setInterval(reminder, 60000);
});
