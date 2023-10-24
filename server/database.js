// Importar dependencias:
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Inicializamos 'dotenv':
dotenv.config();

// Creamos la conexión con MySQL:
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();


// Método para hacer una consulta "get todos by id":
export async function getTodoById(id) {
  // Devuelve una 'row' que es un objeto 'pool.query(sql)':
  // Para construir la consulta, se hace una sentencia SQL e inyectamos la variable (p.ej. id) 
  // primero usando un interrogante y luego pasando las variables entre corchetes:
  const [row] = await pool.query( // Desestructuramos el array para obtener solamente 'row' que será la respuesta.
    `SELECT * FROM todos WHERE id = ?`, [id] // Inyectamos la variable 'id', que es el parámetro de la función.
  );
  return row[0];
}
// ---------------------------------------------------------------
// MÉTODOS DE CONSULTA, ESCRITURA Y ELIMINACIÓN:
// ---------------------------------------------------------------
export async function getTodosById(id) {
  const [rows] = await pool.query(
    `
      SELECT todos.*, shared_todos.shared_with_id
      FROM todos
      LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
      WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?
    `,
    [id, id]
  );
  return rows;
}
// ---------------------------------------------------------------
export async function getTodo(id) {
  const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return rows[0];
}
// ---------------------------------------------------------------
export async function getSharedTodoByID(id) {
  const [rows] = await pool.query(
    `SELECT * FROM shared_todos WHERE todo_id = ?`, [id]
  );
  return rows[0];
}
// ---------------------------------------------------------------
export async function getUserByID(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}
// ---------------------------------------------------------------
export async function getUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
}
// ---------------------------------------------------------------
export async function createTodo(user_id, title) {
  const [result] = await pool.query(
    `
    INSERT INTO todos (user_id, title)
    VALUES (?, ?)
  `,
    [user_id, title]
  );
  const todoID = result.insertId;
  return getTodo(todoID);
}
// ---------------------------------------------------------------
export async function deleteTodo(id) {
  const [result] = await pool.query(
    `DELETE FROM todos WHERE id = ?;`,[id]
  );
  return result;
}
// ---------------------------------------------------------------
export async function toggleCompleted(id, value) {
  const newValue = value === true ? "TRUE" : "FALSE";
  const [result] = await pool.query(
    `
    UPDATE todos
    SET completed = ${newValue} 
    WHERE id = ?;
    `,
    [id]
  );
  return result;
}
// ---------------------------------------------------------------
export async function shareTodo(todo_id, user_id, shared_with_id) {
  const [result] = await pool.query(
    `
    INSERT INTO shared_todos (todo_id, user_id, shared_with_id) 
    VALUES (?, ?, ?);
    `,
    [todo_id, user_id, shared_with_id]
  );
  return result.insertId;
}
// ---------------------------------------------------------------
// ---------------------------------------------------------------
/**
 * Tests for development
 */
// console.log(await createTodo("test", "test"));

// const todos = await getTodos();
// console.log(todos);

// const todoByID = await getTodo(2);
// console.log(todoByID);

// await deleteTodo(2);

// await shareTodo(13, 2, 1);