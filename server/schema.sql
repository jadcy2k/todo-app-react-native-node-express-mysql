--- ++++++++++++++++++++++++++++++++++++++++++++++++++++
-- En la terminal, podemos interactuar con MySQL:
--    $ mysql -h localhost -u root -p
-- Nos pedirá el password (en lcal, para el usuario "root" el pw es "root").
-- Ahora el cursor del terminal cambiará a "mysql>".

-- Podemos ejecutar instrucciones SQL (siempre acabadas en ";"), por ejemplo:
---   $ show databases;
---   $ show tables;
---   $ SELECT * from users;   etc...
--- Lea más sobre el tema: https://desarrolloweb.com/articulos/2408.php
--- ++++++++++++++++++++++++++++++++++++++++++++++++++++

-- TUTORIAL "TODO APP CON REACT NATIVE Y MySQL": 
-- https://www.youtube.com/watch?v=YJ_XsBDc8mQ&t=53s
-- -----------------------------------------------------

-- 1) Crear la DB:
CREATE DATABASE todo_tutorial_react_native;

-- 2) Seleccionar la BD:
USE todo_tutorial_react_native;

-- 3) Tabla "USERS":
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255)
);
-- Chequear que está bien construida:
DESCRIBE users;

-- NOTA: Si hay que modificar una tabla, hay 2 formas:
------ A) Eliminarla y luego volver a crearla ==> DROP TABLE users;  (Eso elimina la tabla "USERS").
------ B) Alterando la tabla ==> ALTER TABLE users ADD COLUMN last_name VARCHAR(255);

-- NTA: Add foreign key: 
------ ALTER TABLE todos ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id);

-- NOTA: The "ON DELETE CASCADE" clause ensures that all "todos" belonging to a user will be automatically deleted when the "user" is deleted from the USERS table.

-- 4) tabla "TODOS":
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  completed BOOLEAN DEFAULT false,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);

-- Chequear que está bien construida:
DESCRIBE todos;

-- 5) tabla "SHARED_TODOS"
CREATE TABLE shared_todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  todo_id INT,
  user_id INT,
  shared_with_id INT,
  FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Chequear que está bien construida:
DESCRIBE shared_todos;

-- 6) Insert two users into the "USERS" table:
INSERT INTO users (name, email, password) VALUES ('Beto', 'user1@example.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('Alberto', 'user2@example.com', 'password2');

-- 7) -- Insert todos into the "TODOS" table, associated with the first user:
INSERT INTO todos (title, user_id) 
VALUES 
("Go for a morning run", 1),
("Work on project presentation", 1),
("Go grocery shopping", 1),
("Read 30 pages of book", 1),
("Ride bike to the park", 1),
("Cook dinner for family", 1),
("Practice yoga", 1),
("Listen to a podcast", 1),
("Clean the house", 1),
("Get 8 hours of sleep", 1);

-- 8) Compartir el "todo" 21° del "usuario" 1° con el "usuario" 2°:
INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
VALUES (21, 1, 2);


-- 9) Seleccionar "TODOS" compartidos (ejemplo):
-- Get todos of user 2, using a join
-- Get the shared todos for user 2
SELECT todos.* -- Select all columns from the todos table
FROM todos 
JOIN shared_todos ON todos.id = shared_todos.todo_id -- Join with the shared_todos table using the todo_id
WHERE shared_todos.shared_with_id = 2; -- Filter only the shared todos assigned to user 2