const API = "http://127.0.0.1:5000/Employerdetails";
const tableBody = document.getElementById('tableBody');
const staff = document.getElementById("stat-count");
const staffpayroll = document.getElementById("stat-payroll");



//login code



async function logout() {
    const data = await fetch("http://127.0.0.1:5000/sessionDestroy", {
        method: "POST",
        credentials: "include"
    })
    const resp = await data.json();

    if (resp.loggedOut == true) {
        window.location.href = "http://127.0.0.1:5500/public/login.html";
    }

}











async function fETCHEMPLOYE() {
    const resp = await fetch(API,{
        credentials:"include"
    });
    const EmployeData = await resp.json();
    console.log(EmployeData)
    if (EmployeData.loggedIn == true) {

    tableBody.innerHTML = "";
    staff.textContent = EmployeData.data.length;

    let totalPayroll = 0;
    EmployeData.data.forEach((emp) => {
        totalPayroll += Number(emp.Salary) || 0;
        const row = `
            <tr id="row-${emp._id}"> 
                <td>${emp.EmployeId}</td>
                <td>${emp.Name}</td>
                <td>${emp.Email}</td>
                <td><span class='pass'>${emp.Password}</span></td>
                <td>${emp.Joined}</td>
                <td>${emp.Salary}</td>
                <td>
                    <button class="btn-action btn-delete" onclick="deleteEmploye('${emp._id}')">Delete</button>
                    <button class="btn-action btn-edit" onclick="edit('${emp._id}','${emp.EmployeId}','${emp.Name}','${emp.Email}','${emp.Joined}','${emp.Salary}')">Edit</button>
                    <button class="btn-action btn-cancel" onclick="attendence('${emp.Name}','${emp.Email}')">Attendance</button>
                    <a class='btn-view' href='attendence.html'>View</a>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
    staffpayroll.textContent = totalPayroll;
    } else {
        window.location.href = "http://127.0.0.1:5500/public/login.html";
    }
}


// select by date filter
async function setupAttendancePageDate() {
    const res = await fetch("http://127.0.0.1:5000/attendence");
    const data = await res.json();
    //    data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    data.sort((a, b) => console.log(new Date(b.Date) - new Date(a.Date)));
    let select = document.getElementById("userSelectDate");
    if (!select) return;
    const uniqueDates = [];
    data.forEach(d => {
        if (!uniqueDates.includes(d.Date)) {
            uniqueDates.push(d.Date);
            let v = `<option value="${d.Date}">${d.Date}</option>`;
            select.innerHTML += v;
        }
    });


    renderAttendanceTable(data);
}

async function selectDate() {
    let filter = document.getElementById("userSelectDate").value;
    if (filter === "alldate") {
        const res = await fetch("http://127.0.0.1:5000/attendence");
        const data = await res.json();
        renderAttendanceTable(data);
    } else {
        const response = await fetch(`http://127.0.0.1:5000/atDateDetails/${filter}`);
        const data = await response.json();
        renderAttendanceTable(data);
    }
}



// select by name filter
async function setupAttendancePage() {
    const res = await fetch("http://127.0.0.1:5000/attendence");
    const data = await res.json();
    let select = document.getElementById("userSelect");
    if (!select) return;
    const uniqueEmails = [];
    data.forEach(d => {
        if (!uniqueEmails.includes(d.Email)) {
            uniqueEmails.push(d.Email);
            let v = `<option value="${d.Email}">${d.Name}</option>`;
            select.innerHTML += v;
        }
    });

    renderAttendanceTable(data);
}

function renderAttendanceTable(data) {
    const attendanceTableBody = document.getElementById('attendanceTableBody');
    if (!attendanceTableBody) return;

    attendanceTableBody.innerHTML = "";
    data.forEach(record => {
        const row = `
               <tr>
                <td>${record.Name}</td>
                <td>${record.Email}</td>
                <td>${record.Date}</td>
                <td>
                    <span class="status ${record.Status === 'A' ? 'absent' : 'present'}">
                        ${record.Status === 'A' ? 'Absent' : 'Present'}
                    </span>
                </td>
                <td>
                    <span class='at-btn-update' onclick="attendenceEdit()">update</span>
                    <span class='at-btn-delete' onclick="DeleteAttendence('${record._id}')">Delete</span>
                </td>
                </tr>
            `;
        attendanceTableBody.innerHTML += row;
    });
}











async function selectEmploye() {
    let filter = document.getElementById("userSelect").value;

    if (filter === "alldata") {
        const res = await fetch("http://127.0.0.1:5000/attendence");
        const data = await res.json();
        renderAttendanceTable(data);
    } else {
        const response = await fetch(`http://127.0.0.1:5000/atDetails/${filter}`);
        const data = await response.json();
        renderAttendanceTable(data);
    }
}

async function Getattendence() {
    const res = await fetch("http://127.0.0.1:5000/attendence");
    const data = await res.json();
    renderAttendanceTable(data);
}


async function attendence_data(e) {
    e.preventDefault()
    let name = document.getElementById("Em_name").value;
    let email = document.getElementById("attendence_email").value;
    let status = document.getElementById("UStatus").value;
    let date = document.getElementById("Em_Date").value;

    const response = await fetch("http://127.0.0.1:5000/attendence", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, status, date })
    })

    if (response.ok) {
        alert("Employee Attendance Marked");
        Getattendence();
    }
}

async function DeleteAttendence(id) {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`http://127.0.0.1:5000/attendence/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        alert("Attendance Deleted");
        Getattendence();
        setupAttendancePage();
        setupAttendancePageDate();
    }
}

async function addEmploye() {
    let id = document.getElementById('empId').value;
    let name = document.getElementById('empName').value;
    let email = document.getElementById('empEmail').value;
    let userpass = document.getElementById('userPass').value;
    let confirmpass = document.getElementById('confirmPass').value;
    let date = document.getElementById('empDate').value;
    let salary = document.getElementById('empSalary').value;

    if (!id || !name || !email || !userpass || !confirmpass || !date || !salary) {
        alert("All feild Are Compulsory");
        return;
    } else {
        if (userpass === confirmpass) {
            const data = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name, email, date, salary, userpass })
            });

            const res = await data.json();
            if (res.msg == "Employe User Inserted") {
                alert("User Signup Successfully");
                fETCHEMPLOYE();

            } else {
                alert("Some Occured error");
            }
        } else {
            alert("Please Enter Same Password !!");
        }

    }

}

async function deleteEmploye(id) {
    if (!confirm("Delete this employee?")) return;
    await fetch(`${API}/delete`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id })
    });
    fETCHEMPLOYE();



}

function edit(uniqueid, id, name, email, date, salary) {
    document.getElementById("add").style.display = "none";
    document.getElementById("attendence-form").style.display = "none";
    document.getElementById("update").style.display = "block";

    document.getElementById("id").value = uniqueid;
    document.getElementById("UId").value = id;
    document.getElementById("UName").value = name;
    document.getElementById("UEmail").value = email;
    document.getElementById("UDate").value = date;
    document.getElementById("USalary").value = salary;
}

async function update() {
    let Uniqueid = document.getElementById("id").value;
    let id = document.getElementById("UId").value;
    let name = document.getElementById("UName").value;
    let email = document.getElementById("UEmail").value;
    let date = document.getElementById("UDate").value;
    let salary = document.getElementById("USalary").value;

    const response = await fetch(API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Uniqueid, id, name, email, date, salary })
    });

    if (response.ok) {
        alert("Updated!");
        fETCHEMPLOYE();
    }
}

function attendence(EMploye_name, EMploye_email) {
    document.getElementById("add").style.display = "none";
    document.getElementById("update").style.display = "none";
    document.getElementById("attendence-form").style.display = "block";

    document.getElementById("Em_name").value = EMploye_name;
    document.getElementById("attendence_email").value = EMploye_email;
}

// --- Execution ---
fETCHEMPLOYE();
setupAttendancePage();
setupAttendancePageDate();
