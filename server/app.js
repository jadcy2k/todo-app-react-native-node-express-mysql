import express from "express"; //  Para levantar un servidor.

// Importamos todos los métodos que interactúan con la MySQL (están en 'database.js'):
import {
  getTodo,
  shareTodo,
  deleteTodo,
  getTodosByID,
  createTodo,
  toggleCompleted,
  getUserByEmail,
  getUserByID,
  getSharedTodoByID,
} from "./database.js";
import bodyParser from "body-parser";
import cors from "cors";