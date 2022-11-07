// Import and require mysql2, express, and inquirer
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'management_db'
    },
    console.log(`Connected to the management_db database.`)
);

function question1() {
    inquirer
    .prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit']
    },
    ])
    .then(function (response) {
        switch(response.action) {
            case 'View all employees' : ViewAllEmployees();
                break;

            case 'Add employee' : AddEmployee();
                break;

            case 'Update Employee Role' : UpdateEmployeeRole();
                break;

            case 'View all roles' : ViewAllRoles();
                break;

            case 'Add role' : AddRole();
                break;

            case 'View all departments' : ViewAllDepartments();
                break;

            case 'Add department' : AddDepartment();
                break;

            case 'Quit' : Quit();
                break;
        }
    })
}

function AddDepartment() {

    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'dep_name'
        }
        ])
        .then((function (response) {
            db.query(`INSERT INTO department (dep_name) VALUES ('${response.dep_name}')`, function(err, data) {
                if (err) throw err;
                console.log('Department added!');
                question1();
            })
        }))
}

function AddRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'role_name'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'role_salary'
        },
        {
            type: 'list',
            message: 'What department does the role belong to?',
            name: 'role_dep',
            choices:['Tech', 'Management', 'Marketing/Sales', 'Finance']
        }
        
        ])
        .then((function (response) {
            let dep_id = `${response.role_dep}`;
            switch(dep_id) {
                case 'Tech' :
                    dep_id = 1;
                    break;
                case 'Management' :
                    dep_id = 2;
                    break;
                case 'Marketing/Sales' :
                    dep_id = 3;
                    break;
                case 'Finance' :
                    dep_id = 4;
                    break;
            }
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${response.role_name}', '${response.role_salary}', '${dep_id}')`, function(err, data) {
                if (err) throw err;
                console.log('Role added!');
                question1();
            })
        }))
}
        
function ViewAllEmployees() {
    db.query(`SELECT * FROM employee`, function(err, data) {
        if (err) throw err;
        console.log('All employees:');
        console.table(data);
        question1();
    })
}

function ViewAllRoles() {
    db.query(`SELECT * FROM roles`, function(err, data) {
        if (err) throw err;
        console.log('All roles:');
        console.table(data);
        question1();
    })
}

function ViewAllDepartments() {
    db.query(`SELECT * FROM department`, function(err, data) {
        if (err) throw err;
        console.log('All departments:');
        console.table(data);
        question1();
    })
}

function Quit() {
    console.log('Goodbye!');
    process.exit();
}

function AddEmployee() {
    inquirer
    .prompt([
        {
            message: 'What is the first name of the employee you are trying to add?',
            name: 'first_name'
        },
        {
            message: 'What is the last name of the employee you are trying to add?',
            name: 'last_name'
        },
        {
            type: 'list',
            message: 'What is the role of the employee you are trying to add?',
            name: 'role',
            choices: ['Software developer', 'UX/UI Designer', 'Salesman', 'Accountant', 'CFO', 'CEO', 'CTO', 'HR Manager', 'Marketing Manager']
        },
        {
            type: 'list',
            message: 'What is the manager of the employee you are trying to add?',
            name: 'manager',
            choices: ['John Johnson', 'Jane Johnson', 'John Johnsonson', 'Jane Johnsonson']
        }
        ])
        .then((function (response) {
            let role_id = `${response.role}`;
            switch(role_id) {
                case 'Software developer' :
                    role_id = 1;
                    break;
                case 'UX/UI Designer' :
                    role_id = 2;
                    break;
                case 'Marketing/Sales' :
                    role_id = 3;
                    break;
                case 'Accounting' :
                    role_id = 4;
                    break;
                case 'CFO' :
                    role_id = 5;
                    break;
                case 'CEO' :
                    role_id = 6;
                    break;
                case 'CTO' :
                    role_id = 7;
                    break;
                case 'HR Manager' :
                    role_id = 8;
                    break;
                case 'Marketing Manager' :
                    role_id = 9;
                    break;
            }
            switch(response.manager) {
                case 'John Johnson' :
                    response.manager = 1;
                    break;
                case 'Jane Johnson' :
                    response.manager = 2;
                    break;
                case 'John Johnsonson' :
                    response.manager = 3;
                    break;
                case 'Jane Johnsonson' :
                    response.manager = 4;
                    break;
            }
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${role_id}', '${response.manager}')`, response, function (err, result){
                console.log(`${response.first_name} ${response.last_name} added to Employees.`);
            })
            question1();
        }))       
}

function UpdateEmployeeRole() {
    inquirer
    .prompt([
        {
            message: 'What is the first name of the employee you are trying to update?',
            name: 'first_name'
        },
        {
            message: 'What is the last name of the employee you are trying to update?',
            name: 'last_name'
        },
        {
            type: 'list',
            message: 'What is the new role of the employee you are trying to update?',
            name: 'role',
            choices: ['Software developer', 'UX/UI Designer', 'Marketing/Sales', 'Accounting']
        }
        ])
        .then((function (response) {
            let role_id = `${response.role}`;
            switch(role_id) {
                case 'Software developer' :
                    role_id = 1;
                    break;
                case 'UX/UI Designer' :
                    role_id = 2;
                    break;
                case 'Marketing/Sales' :
                    role_id = 3;
                    break;
                case 'Accounting' :
                    role_id = 4;
                    break;
            }
            db.query(`UPDATE employee SET role_id = '${role_id}' WHERE first_name = '${response.first_name}' AND last_name = '${response.last_name}'`, response, function (err, result){
                console.log(`${response.first_name} ${response.last_name} updated.`);
            })
            question1();
        }
        ))
}

question1();