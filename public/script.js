// ======================================
// API URL
// ======================================

var apiUrl = "/employees";


// ======================================
// Get HTML Elements
// ======================================

var employeeForm = document.getElementById("employeeForm");

var employeeTable = document.getElementById("employeeTable");

var searchInput = document.getElementById("search");

var employeeId = document.getElementById("employeeId");

var nameInput = document.getElementById("name");

var emailInput = document.getElementById("email");

var departmentInput = document.getElementById("department");

var salaryInput = document.getElementById("salary");

var submitBtn = document.getElementById("submitBtn");


// ======================================
// Load Employees When Page Opens
// ======================================

window.onload = function () {

    loadEmployees();

};


// ======================================
// Get All Employees
// ======================================

async function loadEmployees() {

    var response = await fetch(apiUrl);

    var result = await response.json();

    employeeTable.innerHTML = "";

    for (var i = 0; i < result.data.length; i++) {

        var emp = result.data[i];

        employeeTable.innerHTML +=

        "<tr>" +

        "<td>" + emp.id + "</td>" +

        "<td>" + emp.name + "</td>" +

        "<td>" + emp.email + "</td>" +

        "<td>" + emp.department + "</td>" +

        "<td>" + emp.salary + "</td>" +

        "<td>" +

        "<button class='edit-btn' onclick='editEmployee(" + emp.id + ")'>Edit</button> " +

        "<button class='delete-btn' onclick='deleteEmployee(" + emp.id + ")'>Delete</button>" +

        "</td>" +

        "</tr>";

    }

}
// ======================================
// Add Employee / Update Employee
// ======================================

employeeForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    var employee = {

        name: nameInput.value,

        email: emailInput.value,

        department: departmentInput.value,

        salary: salaryInput.value

    };

    if (employeeId.value == "") {

        await fetch(apiUrl, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(employee)

        });

        alert("Employee Added Successfully");

    }

    else {

        await fetch(apiUrl + "/update/" + employeeId.value, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(employee)

        });

        alert("Employee Updated Successfully");

        submitBtn.innerHTML = "Add Employee";

    }

    employeeForm.reset();

    employeeId.value = "";

    loadEmployees();

});
// ======================================
// Edit Employee
// ======================================

async function editEmployee(id) {

    var response = await fetch(apiUrl + "/" + id);

    var result = await response.json();

    var employee = result.data;

    employeeId.value = employee.id;

    nameInput.value = employee.name;

    emailInput.value = employee.email;

    departmentInput.value = employee.department;

    salaryInput.value = employee.salary;

    submitBtn.innerHTML = "Update Employee";

}



// ======================================
// Delete Employee
// ======================================

async function deleteEmployee(id) {

    var answer = confirm("Do you want to delete this employee?");

    if (answer == false) {

        return;

    }

    await fetch(apiUrl + "/delete/" + id, {

        method: "POST"

    });

    alert("Employee Deleted Successfully");

    loadEmployees();

}



// ======================================
// Search Employee
// ======================================

searchInput.addEventListener("keyup", async function () {

    var keyword = searchInput.value;

    if (keyword == "") {

        loadEmployees();

        return;

    }

    var response = await fetch("/search/" + keyword);

    var result = await response.json();

    employeeTable.innerHTML = "";

    var employees = result.data;

    for (var i = 0; i < employees.length; i++) {

        var employee = employees[i];

        employeeTable.innerHTML +=

        "<tr>" +

        "<td>" + employee.id + "</td>" +

        "<td>" + employee.name + "</td>" +

        "<td>" + employee.email + "</td>" +

        "<td>" + employee.department + "</td>" +

        "<td>" + employee.salary + "</td>" +

        "<td>" +

        "<button class='edit-btn' onclick='editEmployee(" + employee.id + ")'>Edit</button> " +

        "<button class='delete-btn' onclick='deleteEmployee(" + employee.id + ")'>Delete</button>" +

        "</td>" +

        "</tr>";

    }

});
