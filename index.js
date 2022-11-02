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
        choices: ['View all Employees', 'Add Employee', 'Update Employee Role', 'View all roles', 'Add role', 'View all departments', 'Add Department', 'Quit']
    },
    ])
    .then((response) =>  (response))
    return AddRole();
}

function AddRole() {
    
}