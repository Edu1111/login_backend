CREATE DATABASE logintask ; 

USE logintask;

--tabla de usuarios
CREATE TABLE users(
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  email VARCHAR (100) NOT NULL
);

ALTER TABLE users 
 ADD PRIMARY KEY (id);

 ALTER TABLE users 
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


DESCRIBE users;

--Tabla de tareas
CREATE TABLE tasks (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE tasks 
 ADD PRIMARY KEY (id);

 ALTER TABLE tasks 
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

  DESCRIBE tasks 

  ALTER TABLE tasks
  ADD task VARCHAR(20);