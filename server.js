const mysql = require("mysql2");
const inquirer = require("inquirer")
require("console.table");
const Gamer = require("./db/index.js");
const connection = require("./db/connections");


let videoGamer



 async function init() {
     let newConnection = await connection
     videoGamer = new Gamer(newConnection)
   loadQ()
 }

 async function loadQ() {
     inquirer
         .prompt([
             {
                 type: 'list',
                 name: 'action',
                 message: 'What would you like to do?',
                 choices: ["View all employees", "Add employee", "Update employee role",
                     "View all roles", "Add role", "View all departments", "Add department", "quit"],
             },
         ]).then(async (data) => {
             switch (data.action) {
                 case "View all employees":
                     await videoGamer.viewEmploy()
                     loadQ()
                     break

                 case "Add employee":
                     addEmployee()
                     break

                 case "Update employee role":
                     updateEmpRole()
                     break

                 case "View all roles":
                    await videoGamer.viewRoles()
                     loadQ()
                     break

                 case "Add role":
                     addRole()
                     break

                 case "View all departments":
                    await videoGamer.viewDept()
                     loadQ()
                     break

                 case "Add department":
                     addDepartment()
                     break

                 case "quit":
                     let myConnection = await connection
                     myConnection.end()
           }
      })

 }


 






async function addEmployee() {
    const roletChoice = await videoGamer.getRoles()
    const employChoice = await videoGamer.getEmployees()
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstname",
                message: "What is the first name?"
            },
            {
                type: "input",
                name: "lastname",
                message: "What is the last name?"
            },
            {
                type: "list",
                name: "roleid",
                message: "What is the employees role?", 
                choices: roletChoice
            },
            {
                type: "list",
                name: "managerid",
                message: "Who is their manager?",
                choices: employChoice
            },
        ]).then(async (data) => {
            await videoGamer.addEmplpy(data.firstname, data.lastname, data.roleid, data.managerid)
            console.log("new employee created ")

            loadQ()
        })
}

async function updateEmpRole() {
    const roleChoice = await videoGamer.getRoles()
    const employChoice = await videoGamer.getEmployees()
    inquirer
        .prompt([
            {
                type: "list",
                name: "whichEmployee", 
                message: "Which eployees role do you want to update?",
                choices: employChoice
            },
            {
                type: "list",
                name: "updateRole", 
                message: "What is the employees new role?",
                choices: roleChoice
            },
        ]).then(async (data) => {
           await videoGamer.updateRole(data.whichEmployee, data.updateRole)
            console.log("role updated")

            loadQ()
        })
}

async function addRole() {
    const departmentChoice = await videoGamer.getDepartments()
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the  name of the role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for the role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What is the department for the role?",
                choices: departmentChoice
            },
        ]).then(async (data) => {
           await videoGamer.addRole(data.title, data.salary, data.department_id)
            console.log("new role created ")

            loadQ()
        })

}

async function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department_name",
                message: "What is the  name of the department?"
            },
        ]).then(async (data) => {
            await videoGamer.addDept(data.department_name)
            console.log("new dept created ")

            loadQ()
        })
}

init()
