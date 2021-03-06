const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
// const { captureRejectionSymbol } = require("events");

var employees = [];

var managerQuestions = [
    {
        name: "name",
        type: "input",
        message: "Manager's Name: ",
    },
    {
        name: "id",
        type: "input",
        message: "Manager's ID: ",
        validate: function (id) {
            //Added valid to confirm email and numbers input correctly
    valid = /^\d/.test(id)

            if (valid) {
                return true;
            } else {
                console.log("  Please enter a valid number")
                return false;
            }
        }
    },
    {
        name: "email",
        type: "input",
        message: "Manager's email: ",
        validate: function (email) {

    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log("  Please enter a valid email")
                return false;
            }
        }
    },
    {
        name: "officeNumber",
        type: "input",
        message: "Office Number: ",
        validate: function (id) {

    valid = /^\d/.test(id)

            if (valid) {
                return true;
            } else {
                console.log("  Please enter a valid number")
                return false;
            }
        }

    }]
//array to hold team questions input from user.
var teamQuestions = [
    {
        name: "confirm",
        type: "list",
        message: "Add an employee: (or select Finished if done adding employees) ",
        choices: [
            "Engineer",
            "Intern",
            "Finished"
        ]
    }]

var engiQuestions = [
    {
    name: "name",
    type: "input",
    message: "Engineer's Name: ",
    },
    {
    name: "id",
    type: "input",
    message: "Engineer's ID: ",
    validate: function (id) {

    valid = /^\d/.test(id)

        if (valid) {
            return true;
        } else {
                console.log("  Please enter a valid number")
                return false;
            }
        }
    },
    {
    name: "email",
    type: "input",
    message: "Engineer's email: ",
    validate: function (email) {

    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log("  Please enter a valid email")
                return false;
            }
        }
    },
    {
    name: "github",
    type: "input",
    message: "Github account: ",

    }]

var internQuestions = [

    {
        name: "name",
        type: "input",
        message: "Intern's Name: ",
    },
    {
        name: "id",
        type: "input",
        message: "Intern's ID: ",
        validate: function (id) {

            valid = /^\d/.test(id)

            if (valid) {
                return true;
            } else {
                console.log("  Please enter a valid number")
                return false;
            }
        }
    },
    {
        name: "email",
        type: "input",
        message: "Intern's email: ",
        validate: function (email) {

            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log("  Please enter a valid email")
                return false;
            }
        }
    },
    {
        name: "school",
        type: "input",
        message: "School: ",

    }]

//pushed from array to be implemeneted in html
function init() {
    inquirer.prompt(managerQuestions).then(function ({ name, id, email, officeNumber }) {
        var manager = new Manager(name, id, email, officeNumber);

        employees.push(manager);

        createTeam();

    })
}

function createTeam() {
    inquirer.prompt(teamQuestions).then(function ({ confirm }) {
        if (confirm === "Engineer") {
            createEngineer();
        }
        else if (confirm === "Intern") {
            createIntern();
        }
        else {
            finishTeam();
        }
    })
}

function createEngineer() {
    inquirer.prompt(engiQuestions).then(function ({ name, id, email, github }) {
        var engi = new Engineer(name, id, email, github);

        employees.push(engi);

        createTeam();
    })
}


function createIntern() {
    inquirer.prompt(internQuestions).then(function ({ name, id, email, school }) {
        var intern = new Intern(name, id, email, school);

        employees.push(intern);

        createTeam();
    })
}
//take all user input and render into output
function finishTeam() {
    var htmlData = render(employees);

    fs.writeFile(outputPath, (htmlData), (err) => {
        if (err) throw err;
        console.log("Your Team is Assembled!");

    })
}

init();


