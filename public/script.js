// ==========================================
// Employee Management Script
// ==========================================

// Backend URL
const api = "/employees";

// Get HTML Elements
const form = document.getElementById("employeeForm");
const table = document.getElementById("employeeTable");
const search = document.getElementById("search");

const id = document.getElementById("employeeId");
const name = document.getElementById("name");
const email = document.getElementById("email");
const department = document.getElementById("department");
const salary = document.getElementById("salary");

const button = document.getElementById("submitBtn");

// ==========================================
// Page Load
// ==========================================

window.onload = function () {
    showEmployees();
};

// ==========================================
// Show All Employees
// ==========================================

async function showEmployees() {

    // Ask server for employees
    const response = await fetch(api);

    // Convert JSON into JavaScript object
    const result = await response.json();

    // Clear table
    table.innerHTML = "";

    // Loop through every employee
    result.data.forEach(function(emp) {

        table.innerHTML += `
        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.email}</td>

            <td>${emp.department}</td>

            <td>${emp.salary}</td>

            <td>

                <button class="edit-btn" onclick="editEmployee(${emp.id})">

                    Edit

                </button>

                <button class="delete-btn" onclick="deleteEmployee(${emp.id})">

                    Delete

                </button>

            </td>

        </tr>
        `;

    });

}

// ==========================================
// Add or Update Employee
// ==========================================

form.addEventListener("submit", async function(e){

    // Stop page refresh
    e.preventDefault();

    // Create employee object
    const employee = {

        name: name.value,

        email: email.value,

        department: department.value,

        salary: salary.value

    };

    // -----------------------
    // ADD NEW EMPLOYEE
    // -----------------------

    if(id.value == ""){

        await fetch(api,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(employee)

        });

        alert("Employee Added");

    }

    // -----------------------
    // UPDATE EMPLOYEE
    // -----------------------

    else{

        await fetch(api+"/update/"+id.value,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(employee)

        });

        alert("Employee Updated");

        button.innerHTML="Add Employee";

    }

    // Clear form

    form.reset();

    id.value="";

    showEmployees();

});

// ==========================================
// Edit Employee
// ==========================================

async function editEmployee(employeeId){

    const response = await fetch(api+"/"+employeeId);

    const result = await response.json();

    const emp = result.data;

    id.value = emp.id;

    name.value = emp.name;

    email.value = emp.email;

    department.value = emp.department;

    salary.value = emp.salary;

    button.innerHTML = "Update Employee";

}

// ==========================================
// Delete Employee
// ==========================================

async function deleteEmployee(employeeId){

    const ok = confirm("Delete this employee?");

    if(!ok){

        return;

    }

    await fetch(api+"/delete/"+employeeId,{

        method:"POST"

    });

    alert("Employee Deleted");

    showEmployees();

}

// ==========================================
// Search Employee
// ==========================================

search.addEventListener("keyup", async function(){

    // Get search text
    const keyword = search.value;

    // Empty search
    if(keyword==""){

        showEmployees();

        return;

    }

    const response = await fetch("/search/"+keyword);

    const result = await response.json();

    table.innerHTML="";

    result.data.forEach(function(emp){

        table.innerHTML += `
        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.email}</td>

            <td>${emp.department}</td>

            <td>${emp.salary}</td>

            <td>

                <button class="edit-btn" onclick="editEmployee(${emp.id})">

                    Edit

                </button>

                <button class="delete-btn" onclick="deleteEmployee(${emp.id})">

                    Delete

                </button>

            </td>

        </tr>
        `;

    });

});
