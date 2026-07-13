const apiUrl = "/employees";

const employeeForm = document.getElementById("employeeForm");
const employeeTable = document.getElementById("employeeTable");
const searchInput = document.getElementById("search");

const employeeId = document.getElementById("employeeId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const submitBtn = document.getElementById("submitBtn");

// Load Employees
window.onload = () => {
    loadEmployees();
};

// Get All Employees
async function loadEmployees() {

    const response = await fetch(apiUrl);
    const result = await response.json();

    employeeTable.innerHTML = "";

    result.data.forEach(emp => {

        employeeTable.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>
                    <button class="edit-btn" onclick="editEmployee(${emp.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>
        `;

    });

}

// Add or Update Employee
employeeForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const employee = {
        name: nameInput.value,
        email: emailInput.value,
        department: departmentInput.value,
        salary: salaryInput.value
    };

    if (employeeId.value === "") {

        await fetch(apiUrl, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

    } else {

        await fetch(`${apiUrl}/${employeeId.value}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

        submitBtn.innerText = "Add Employee";

    }

    employeeForm.reset();
    employeeId.value = "";

    loadEmployees();

});

// Edit Employee
async function editEmployee(id) {

    const response = await fetch(`${apiUrl}/${id}`);

    const result = await response.json();

    const emp = result.data;

    employeeId.value = emp.id;
    nameInput.value = emp.name;
    emailInput.value = emp.email;
    departmentInput.value = emp.department;
    salaryInput.value = emp.salary;

    submitBtn.innerText = "Update Employee";

}

// Delete Employee
async function deleteEmployee(id) {

    if (!confirm("Delete this employee?")) return;

    await fetch(`${apiUrl}/${id}`, {

        method: "DELETE"

    });

    loadEmployees();

}

// Search Employee
searchInput.addEventListener("keyup", async () => {

    const keyword = searchInput.value.trim();

    if (keyword === "") {

        loadEmployees();

        return;

    }

    const response = await fetch(`/search/${keyword}`);

    const result = await response.json();

    employeeTable.innerHTML = "";

    result.data.forEach(emp => {

        employeeTable.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>
                    <button class="edit-btn" onclick="editEmployee(${emp.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>
        `;

    });

});
