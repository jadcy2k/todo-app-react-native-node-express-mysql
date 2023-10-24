import express from "express"; //  Para levantar un servidor.

// Importamos todos los métodos que interactúan con la MySQL (están en 'database.js'):
import {
  getTodo,
  shareTodo,
  deleteTodo,
  getTodosById,
  createTodo,
  toggleCompleted,
  getUserByEmail,
  getUserByID,
  getSharedTodoByID,
} from "./database.js";
import bodyParser from "body-parser";
import cors from "cors";



// ------------------------------------------------------------------
// Creamos estas 3 constantes que usaremos para configurar el server
// ------------------------------------------------------------------
const corsOptions = {
  origin: "http://127.0.0.1:5173", // specify the allowed origin
  methods: ["POST", "GET"], // specify the allowed methods
  credentials: true, // allow sending credentials (cookies, authentication)
};

const developers = [
  { id: 1, name: "John Doe", apiKey: "abcdef123456" },
  { id: 2, name: "Jane Doe", apiKey: "ghijkl789012" },
];

// const ckeckApiKey = (req, res, next) => {
//   const apiKey = req.headers["x-api-key"];
//   const developer = developers.find((d) => d.apiKey === apiKey); //check if we have a dev with that key
//   if (!developer) {
//     return res.status(401).json({ message: "Unauthorized, invalid Api Key" });
//   }
//   req.developer = developer;
//   next();
// };
// -------------------------------------------------------------



// +++++++++++++++++++++++++++++++++++++
// "app" será la aplicación Express: 
// +++++++++++++++++++++++++++++++++++++
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
//app.use(ckeckApiKey);
// -------------------------------
// Todos los "get()" son peticiones. Pasamos la  URL y un callback. 
app.get("/todos/:id", async (req, res) => {
  const todos = await getTodosById(req.params.id);
  res.status(200).send(todos);
});

app.get("/todos/shared_todos/:id", async (req, res) => {
  const todo = await getSharedTodoByID(req.params.id);
  const author = await getUserByID(todo.user_id);
  const shared_with = await getUserByID(todo.shared_with_id);
  res.status(200).send({ author, shared_with });
});

app.get("/users/:id", async (req, res) => {
  const user = await getUserByID(req.params.id);
  res.status(200).send(user);
});
// -------------------------------
// "put()" permite agregar registros.
app.put("/todos/:id", async (req, res) => {
  const { value } = req.body;
  const todo = await toggleCompleted(req.params.id, value);
  res.status(200).send(todo);
});
// -------------------------------
// "delete()" elimina registros.
app.delete("/todos/:id", async (req, res) => {
  await deleteTodo(req.params.id);
  res.send({ message: "Todo deleted successfully" });
});
// -------------------------------
// "post()" se usa generalmente para modificar registros.
app.post("/todos/shared_todos", async (req, res) => {
  const { todo_id, user_id, email } = req.body;
  // const { todo_id, user_id, shared_with_id } = req.body;
  const userToShare = await getUserByEmail(email);
  const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);
  res.status(201).send(sharedTodo);
});

app.post("/todos", async (req, res) => {
  const { user_id, title } = req.body;
  const todo = await createTodo(user_id, title);
  res.status(201).send(todo);
});
// -------------------------------

// Finalmente, escuchamos todas las peticiones a través del puerto 8080:
app.listen(8080, () => {
  console.log("Server running on port 8080");
});

////////////////////////////////////////////////////////////////////