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
    .then(function(response) {
        switch(response) {
            case 'View all employees' :
                return 

            case 'Add employee' :
                return AddEmployee();

            case 'Update Employee Role' :
                return 

            case 'View all roles' :
                return

            case 'Add role' :
                return AddRole();

            case 'View all departments' :
                return 

            case 'Add department' :
                return AddDepartment();

            case 'Quit' :
                return

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
        return question1();
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
            name: 'role_salary'
        }
        
        ])
        .then((response) =>  (response))
        return question1();
}

function AddEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the employee you are trying to add?',
            name: 'emp_name'
        },

        ])
        .then((response) =>  (response))
        return question1();
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
        return question1();
}