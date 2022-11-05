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
            case 'View all employees' :
                break;

            case 'Add employee' : AddEmployee();
                break;

            case 'Update Employee Role' : 
                break;

            case 'View all roles' :
                break;

            case 'Add role' : AddRole();
                break;

            case 'View all departments' :
                break;

            case 'Add department' : AddDepartment();
                break;

            case 'Quit' :
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
            db.query(`INSERT INTO department (name) VALUES ('${response.dep_name}')`, function(err, data) {
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
            choices:''
        }
        
        ])
        .then((function (response) {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.role_name}', '${response.role_salary}', '${response.role_dep}')`, function(err, data) {
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
    db.query(`SELECT * FROM role`, function(err, data) {
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
            choices: ['Software developer', 'UX/UI Designer', 'Marketing/Sales', 'Accounting']
        },

        ])
        .then((function (response) {
            db.query('INSERT INTO employee SET ?', response, function (err, result){
                console.log(`${response.first_name} ${response.last_name} added to Employees.`);
            })
            question1();
        }))       
}

function UpdateEmployeeRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the employee you are trying to add?',
            name: 'emp_name'
        }
        ])
        .then((function (response) {
            db.query('INSERT INTO employee SET ?', response, function (err, result){
                console.log(`${response.emp_name} added to Employees.`);
            })
            question1();
        }))
}

question1();