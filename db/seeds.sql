INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES
( "John", "Doe", '1', '2'),
( "Jane", "Doe", '2', '1'),
( "Luke", "Skywalker", '3', '1'),
( "C3", "Smith", '4', '2')

INSERT INTO roles (title, salary, department_id) VALUES
("UX/UI Designer", "100000", "1"),
("Software Developer", "90000", "2"),
("Sales Manager", "70000", "3"),
("Accountant", "70000", "4"),
("Marketing Manager", "80000", "5"),
("CEO", "300000", "6"),
("HR Manager", "80000", "7"),
("Sales Associate", "60000", "8")

INSERT INTO department (dep_name) VALUES
("Tech"),
("Sales/Marketing"),
("Human Resources"),
("Accounting"),
("Management")