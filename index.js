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

  const quesArr = [
    {

    },
    {

    },
    {

    }

];

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
        .then((response) =>  (response))
        
        // return question1();
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
        .then((response) =>  (response))
        
        // return question1();
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
            choices: ['Junior software developer', 'UX/UI Designer', 'Marketing/Sales', 'Accounting']
        },

        ])
        .then((function (response) {
            db.query('INSERT INTO employee SET ?', response, function (err, result){
                console.log(`${response.first_name} ${response.last_name} added to Employees.`);
            })
            question1();
        }))

        // .then(((function (response) {
        //     question1();
        // }))
            
            
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
        .then((response) =>  (response))
        // return question1();
}

question1();