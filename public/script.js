// ============================
// API Address
// ============================

let api = "/employees";


// ============================
// Get HTML Elements
// ============================

let form = document.getElementById("employeeForm");

let table = document.getElementById("employeeTable");

let search = document.getElementById("search");

let id = document.getElementById("employeeId");

let name = document.getElementById("name");

let email = document.getElementById("email");

let department = document.getElementById("department");

let salary = document.getElementById("salary");

let button = document.getElementById("submitBtn");


// ============================
// Load Employees
// ============================

window.onload = function () {

    showEmployees();

};


// ============================
// Show Employees
// ============================

async function showEmployees() {

    let response = await fetch(api);

    let result = await response.json();

    table.innerHTML = "";

    for (let i = 0; i < result.data.length; i++) {

        let emp = result.data[i];

        table.innerHTML += `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>

            <td>

                <button onclick="editEmployee(${emp.id})">
                    Edit
                </button>

                <button onclick="deleteEmployee(${emp.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    }

}


// ============================
// Add / Update Employee
// ============================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    let employee = {

        name: name.value,

        email: email.value,

        department: department.value,

        salary: salary.value

    };


    if (id.value == "") {

        await fetch(api, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(employee)

        });

        alert("Employee Added");

    }

    else {

        await fetch(api + "/update/" + id.value, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(employee)

        });

        alert("Employee Updated");

        button.innerHTML = "Add Employee";

    }


    form.reset();

    id.value = "";

    showEmployees();

});


// ============================
// Edit Employee
// ============================

async function editEmployee(employeeId) {

    let response = await fetch(api + "/" + employeeId);

    let result = await response.json();

    let employee = result.data;

    id.value = employee.id;

    name.value = employee.name;

    email.value = employee.email;

    department.value = employee.department;

    salary.value = employee.salary;

    button.innerHTML = "Update Employee";

}


// ============================
// Delete Employee
// ============================

async function deleteEmployee(employeeId) {

    let answer = confirm("Delete this employee?");

    if (answer == false) {

        return;

    }

    await fetch(api + "/delete/" + employeeId, {

        method: "POST"

    });

    alert("Employee Deleted");

    showEmployees();

}


// ============================
// Search Employee
// ============================

search.addEventListener("keyup", async function () {

    let keyword = search.value;

    if (keyword == "") {

        showEmployees();

        return;

    }

    let response = await fetch("/search/" + keyword);

    let result = await response.json();

    table.innerHTML = "";

    for (let i = 0; i < result.data.length; i++) {

        let emp = result.data[i];

        table.innerHTML += `
        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.email}</td>

            <td>${emp.department}</td>

            <td>${emp.salary}</td>

            <td>

                <button onclick="editEmployee(${emp.id})">
                    Edit
                </button>

                <button onclick="deleteEmployee(${emp.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    }

});
