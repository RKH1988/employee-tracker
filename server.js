// Import and require mysql2
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to the employee database.`)
);

// show error if an error results after connection attempt
db.connect(function (err) {
  if (err) throw err;
  showOptions();
});

function showOptions() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "What would you like to do?",
          choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Remove Employee",
            "Quit",
          ],
        },
      ])
      .then(({ choice }) => {
        switch (choice) {
          case "View All Employees":
            showEmployees();
            break;
          case "View All Departments":
            showDepartments();
            break;
          case "View All Roles":
            showRoles();
            break;
          case "Add Department":
            addDepartment();
            break;
          case "Add Role":
            addRole();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "Remove Employee":
            deleteEmployee();
            break;
          default:
            process.exit();
        }
      });
  }

// Query database to show all employees
function showEmployees() {
  db.execute(
    "SELECT employee.id AS 'ID', CONCAT(employee.first_name,' ',employee.last_name) AS 'Employee Name', role.title AS 'Title', concat('$',FORMAT(role.salary,0)) AS 'Salary', department.name AS 'Department', CONCAT(e.first_name,' ',e.last_name) AS 'Manager Name' FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id",
    function (err, results) {
      console.table(results);
      showOptions();
    }
  );
}

// Query database to show all departments
function showDepartments() {
  db.execute("SELECT * FROM department", function (err, results) {
    console.table(results);
    showOptions();
  });
}

// Query database to show all roles
function showRoles() {
  db.execute("SELECT role.title, concat('$',FORMAT(role.salary,0)) AS 'Salary', department.name AS 'Department' FROM role INNER JOIN department ON department.id = role.department_id", function (err, results) {
    console.table(results);
    showOptions();
  });
}

// update database to add department
function addDepartment() {
    inquirer   
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What Department would you like to add?"
            }
        ]).then(function(answers){
            db.query("INSERT INTO department SET ? ", 
                {
                    name: answers.name
                },
                function(err) {
                    if (err) throw err
                    console.log(`The department has been added.`)
                    showOptions();
                }
            )
        })
}

// update database to add role
function addRole() {
    db.query("SELECT * FROM department", function (err, results) {
        const deptChoices = results.map(({id,name})=> {
            return {
                name: `${name}`,
                value: `${id}`,
            };
        });  
        inquirer   
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of this role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of this role?"
            },
            {
                name: "id",
                type: "list",
                message: "What is the department for this role?",
                choices: deptChoices,
            }
        ]).then(function(answers){
            db.query("INSERT INTO role SET ? ", 
            {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.id
            },
            function(err) {
                if (err) throw err
                console.log(`The role has been added.`)
                showOptions();
            }
            )
        })
    })
}

// update database to add employee
function addEmployee() {
    db.query("SELECT * FROM role", function (err, results) {
        const roleChoices = results.map(({id,title})=> {
            return {
                name: `${title}`,
                value: `${id}`,
            };
        });  
        inquirer   
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "roleId",
                type: "list",
                message: "What is the role of this employee?",
                choices: roleChoices
            },
            {
                name: "mgrId",
                type: "input",
                message: "What is the ID of the employee's manager?"
            }     
        ]).then(function(answers){
            db.query("INSERT INTO employee SET ? ", 
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.roleId,
                manager_id: answers.mgrId
            },
            function(err) {
                if (err) throw err
                console.log(`The employee has been added.`)
                showOptions();
            }
            )
        })
    })
}

// Append database to update employee role
function updateEmployeeRole() {
    db.query("SELECT * FROM employee", function (err,results) {
        const employeeChoices = results.map(({id,first_name,last_name})=> {
            return{
                name: `${first_name} ${last_name}`,
                value: `${id}`,
            };
        });
        inquirer   
        .prompt([
            {
                name: "employeeId",
                type: "list",
                message: "Which Employee needs a role change?",
                choices: employeeChoices
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the ID of the employee's new role?"
            }     
        ]).then(function(answers){
            db.query("UPDATE employee SET role_id = ? WHERE id = ? ", 
            [role_id=answers.roleId,id= answers.employeeId],
            function(err) {
                if (err) throw err
                console.log(`The employee has been updated.`)
                showOptions();
            }
            )
        })
    })
}

  function deleteEmployee() {
    db.query("SELECT * FROM employee", function (err, results) {
      const choices = results.map(({ id, first_name, last_name }) => {
        return {
          name: `${first_name} ${last_name}`,
          value: id,
        };
      });
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Which employee would you like to remove?",
            choices: choices,
          },
        ])
        .then(({ employeeId }) => {
          db.query(
            `DELETE FROM employee WHERE id = ?`,
            employeeId,
            (err, result) => {
              if (err) {
                console.log(err);
              }
              console.log(`The employee has been removed.`)
              showOptions();
            }
          );
        });
    });
  }