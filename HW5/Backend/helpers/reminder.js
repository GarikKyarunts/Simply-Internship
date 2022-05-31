import fs from "fs/promises";

export const reminder = async () => {
  const todos = JSON.parse(await fs.readFile("./db/todos.json", "utf-8"));

  todos.forEach((todo, index) => {
    if (
      !todo.reminded &&
      0 < new Date(todo.dueDate).getTime() - Date.now() &&
      new Date(todo.dueDate).getTime() - Date.now() <= 120000
    ) {
      console.log(`Todo with ID ${todo.id} soon will be completed.`);
      todo.reminded = true;
      todos[index] = todo;
    }
  });
  await fs.writeFile("./db/todos.json", JSON.stringify(todos, undefined, 2));
};
