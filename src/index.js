const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  request.user = user;
  return next();
}


app.post("/users", (request, response) => {
  const { name, username } = request.body;
  const user = users.find((user) => user.username === username);

  if (user) {
    return response.status(400).json({ error: "User already exists." });
  }

  if (!name || !username) {
    return response.status(400).json({ error: "Missing name or username" });
  }

  const newUser = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };
  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
});

app.put("/todos/:id", checksExistsUserAccount, checksExistsTodo, (request, response) => {
});

app.patch("/todos/:id/done", checksExistsUserAccount, checksExistsTodo, (request, response) => {
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
});

module.exports = app;
