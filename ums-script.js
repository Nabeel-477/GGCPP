// Initialize data from localStorage or set to empty arrays if nothing exists
let studentTeacherData = JSON.parse(localStorage.getItem('studentTeacherData')) || [];
let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
let leaveApplications = JSON.parse(localStorage.getItem('leaveApplications')) || [];
let feeRecords = JSON.parse(localStorage.getItem('feeRecords')) || [];

// Load saved data when the page loads
function loadData() {
  showSavedInfo();
  displayAttendance();
  displayLeaveApplications();
  displayFeeStructure();
}

// Function to start the system (show login screen)
function startSystem() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("loginScreen").style.display = "block";
}

// Function to handle login
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "nabeel" && password === "123456") {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mainSystem").style.display = "block";
    openTab('newInfo');
  } else {
    alert("Incorrect login credentials. Please try again.");
  }
}

// Function to handle tab opening
function openTab(tabId) {
  const tabs = document.querySelectorAll(".tabContent");
  tabs.forEach(tab => tab.style.display = "none");

  document.getElementById(tabId).style.display = "block";
}

// Save new student/teacher information
function saveInfo() {
  let roll = document.getElementById("roll").value.trim();
  let name = document.getElementById("name").value.trim();
  let address = document.getElementById("address").value.trim();
  let dob = document.getElementById("dob").value.trim();
  let cnic = document.getElementById("cnic").value.trim();
  let email = document.getElementById("email").value.trim();
  let role = document.getElementById("role").value;
  let department = document.getElementById("department").value;

  if (!name || !roll || !address || !dob || !cnic || !email) {
    alert("Please fill in all fields.");
    return;
  }

  let duplicate = studentTeacherData.find(item => item.roll === roll);
  if (duplicate) {
    alert("❌ Error: This roll number already exists. Please use a unique one.");
    return;
  }

  studentTeacherData.push({ name, roll, address, dob, cnic, email, role, department });
  localStorage.setItem("studentTeacherData", JSON.stringify(studentTeacherData));

  alert("✅ Information saved successfully!");
  refreshNewInfo();
  showSavedInfo();
}

// Show saved student/teacher information
function showSavedInfo() {
  const savedDataContainer = document.getElementById("savedData");
  const selectedDept = document.getElementById("filterDept").value;
  savedDataContainer.innerHTML = "";

  studentTeacherData.forEach(data => {
    if (selectedDept === "" || data.department === selectedDept) {
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>Name:</strong> ${data.name}<br>
        <strong>Roll No:</strong> ${data.roll}<br>
        <strong>Address:</strong> ${data.address}<br>
        <strong>DOB:</strong> ${data.dob}<br>
        <strong>CNIC:</strong> ${data.cnic}<br>
        <strong>Email:</strong> ${data.email}<br>
        <strong>Role:</strong> ${data.role}<br>
        <strong>Department:</strong> ${data.department}
        <hr>
      `;
      savedDataContainer.appendChild(div);
    }
  });
}

// Save attendance records
function saveAttendance() {
  const attDept = document.getElementById("attDept").value;
  const attName = document.getElementById("attName").value;
  const status = document.getElementById("status").value;

  const attendanceEntry = { attDept, attName, status, date: new Date().toLocaleDateString() };
  attendanceRecords.push(attendanceEntry);

  localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));

  alert("✅ Attendance saved successfully!");
  displayAttendance();
}

// Display attendance records
function displayAttendance() {
  const attendanceContainer = document.getElementById("attendanceRecords");
  attendanceContainer.innerHTML = "";

  attendanceRecords.forEach(record => {
    const div = document.createElement("div");
    div.textContent = `${record.attName} (${record.attDept}) - ${record.status} - Date: ${record.date}`;
    attendanceContainer.appendChild(div);
  });
}

// Save leave applications
function saveLeave() {
  const leaveDept = document.getElementById("leaveDept").value;
  const leaveName = document.getElementById("leaveName").value;
  const leaveReason = document.getElementById("leaveReason").value;

  const leaveApplication = { leaveDept, leaveName, leaveReason, date: new Date().toLocaleDateString() };
  leaveApplications.push(leaveApplication);

  localStorage.setItem('leaveApplications', JSON.stringify(leaveApplications));

  alert("✅ Leave application saved successfully!");
  displayLeaveApplications();
}

// Display leave applications
function displayLeaveApplications() {
  const leaveContainer = document.getElementById("leaveRecords");
  leaveContainer.innerHTML = "";

  leaveApplications.forEach(application => {
    const div = document.createElement("div");
    div.textContent = `${application.leaveName} (${application.leaveDept}) - Reason: ${application.leaveReason} - Date: ${application.date}`;
    leaveContainer.appendChild(div);
  });
}



// Function to handle search
function searchInfo() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();

  const filteredData = studentTeacherData.filter(item => 
    item.name.toLowerCase().includes(searchQuery) ||
    item.roll.toLowerCase().includes(searchQuery)
  );

  displayFilteredInfo(filteredData);
}



// Load all data when page loads
window.onload = function() {
  loadData();
};
function clearViewInfo() {
  if (confirm("⚠️ Are you sure you want to permanently delete all student/teacher information?")) {
    localStorage.removeItem("studentTeacherData");
    studentTeacherData = [];
    document.getElementById("savedData").innerHTML = "";
    alert("✅ Student/Teacher info deleted successfully!");
  }
}
function deleteAllAttendance() {
  if (confirm("⚠️ Are you sure you want to delete all attendance records?")) {
    localStorage.removeItem("attendanceRecords");
    attendanceRecords = [];
    document.getElementById("attendanceRecords").innerHTML = "";
    alert("✅ All attendance records deleted!");
  }
}
function deleteAllLeaves() {
  if (confirm("⚠️ Are you sure you want to delete all leave applications?")) {
    localStorage.removeItem("leaveApplications");
    leaveApplications = [];
    document.getElementById("leaveRecords").innerHTML = "";
    alert("✅ All leave applications deleted!");
  }
}
function deleteAllFeeRecords() {
  if (confirm("⚠️ Are you sure you want to delete all fee records?")) {
    localStorage.removeItem("feeRecords");
    feeRecords = [];
    const feeTable = document.getElementById("feeTable").getElementsByTagName('tbody')[0];
    feeTable.innerHTML = "";
    alert("✅ All fee records deleted!");
  }
}
// Display filtered student/teacher info
function displayFilteredInfo(data) {
  const savedDataContainer = document.getElementById("savedData");
  savedDataContainer.innerHTML = "";

  data.forEach(data => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>Name:</strong> ${data.name}<br>
      <strong>Roll No:</strong> ${data.roll}<br>
      <strong>Address:</strong> ${data.address}<br>
      <strong>DOB:</strong> ${data.dob}<br>
      <strong>CNIC:</strong> ${data.cnic}<br>
      <strong>Email:</strong> ${data.email}<br>
      <strong>Role:</strong> ${data.role}<br>
      <strong>Department:</strong> ${data.department}
      <hr>
    `;
    savedDataContainer.appendChild(div);
  });
}

// Refresh "New Information" form
function refreshNewInfo() {
  document.getElementById('name').value = '';
  document.getElementById('roll').value = '';
  document.getElementById('address').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('cnic').value = '';
  document.getElementById('email').value = '';
  document.getElementById('role').selectedIndex = 0;
  document.getElementById('department').selectedIndex = 0;
}

// Exit system
function exitWebsite() {
  document.getElementById("goodbyeMessage").style.display = "block";
  setTimeout(() => {
    window.close();
  }, 3000);
}


// Function to clear ALL info
function clearAllInfo() {
  if (confirm("⚠️ Are you sure you want to permanently delete ALL information?")) {
    // Remove everything from localStorage
    localStorage.removeItem("studentTeacherData");
    localStorage.removeItem("attendanceRecords");
    localStorage.removeItem("leaveApplications");
    localStorage.removeItem("feeRecords");

    // Clear memory arrays
    studentTeacherData = [];
    attendanceRecords = [];
    leaveApplications = [];
    feeRecords = [];

    // Clear displayed data
    document.getElementById("savedData").innerHTML = "";
    document.getElementById("attendanceRecords").innerHTML = "";
    document.getElementById("leaveRecords").innerHTML = "";
    const feeTable = document.getElementById("feeTable").getElementsByTagName('tbody')[0];
    feeTable.innerHTML = "";

    alert("✅ All information has been permanently deleted.");
    location.reload(); // Reload page to reset system
  }
}

// Function to save fee records
function saveFeeRecord(name, department, fee, fines, clear, remaining) {
  const feeRecord = { name, department, fee, fines, clear, remaining };
  feeRecords.push(feeRecord);

  // Save fee records to localStorage
  localStorage.setItem('feeRecords', JSON.stringify(feeRecords));

  alert("Fee record saved successfully!");
  displayFeeStructure();
}

// Function to display fee structure records
function displayFeeStructure() {
  const feeTable = document.getElementById("feeTable").getElementsByTagName('tbody')[0];
  feeTable.innerHTML = "";  // Clear existing rows

  feeRecords.forEach(record => {
    const row = feeTable.insertRow();

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);

    cell1.textContent = record.name;
    cell2.textContent = record.department;
    cell3.textContent = record.fee;
    cell4.textContent = record.fines;
    cell5.textContent = record.clear;
    cell6.textContent = record.remaining;
    cell7.innerHTML = "<button onclick='deleteFeeRecord(" + feeRecords.indexOf(record) + ")'>Delete</button>";
  });
}

// Delete a fee record
function deleteFeeRecord(index) {
  feeRecords.splice(index, 1);  // Remove the record from the array
  localStorage.setItem('feeRecords', JSON.stringify(feeRecords));  // Update localStorage
  displayFeeStructure();  // Refresh the table
}
// Function to add a new row in Fee Structure
function addRow() {
  const table = document.getElementById('feeTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td><input type="text" placeholder="Enter name" class="fee-name"></td>
    <td><input type="text" placeholder="Enter department" class="fee-department"></td>
    <td><input type="number" value="0" oninput="updateRemaining(this)" class="fee-amount"></td>
    <td><input type="number" value="0" oninput="updateRemaining(this)" class="fee-fines"></td>
    <td><input type="checkbox" onchange="updateRemaining(this)" class="fee-cleared"></td>
    <td>0</td>
    <td><button onclick="deleteRow(this)">Delete</button></td>
  `;
}

// Function to update remaining amount in Fee Structure
function updateRemaining(input) {
  const row = input.closest('tr');
  const fee = parseFloat(row.cells[2].querySelector('input').value) || 0;
  const fine = parseFloat(row.cells[3].querySelector('input').value) || 0;
  const isCleared = row.cells[4].querySelector('input').checked;
  row.cells[5].innerText = isCleared ? 0 : (fee + fine);
}

// Function to delete a row in Fee Structure
function deleteRow(button) {
  button.closest('tr').remove();
}

// Function to export Fee Structure data to Excel
function exportToExcel() {
  const table = document.getElementById('feeTable');
  const wb = XLSX.utils.table_to_book(table, { sheet: "Fee Structure" });
  XLSX.writeFile(wb, "Fee_Structure.xlsx");
}
function saveAllFeeRows() {
  const rows = document.querySelectorAll("#feeTable tbody tr");
  rows.forEach(row => {
    const name = row.cells[0].querySelector('input')?.value || row.cells[0].textContent;
    const department = row.cells[1].querySelector('input')?.value || row.cells[1].textContent;
    const fee = parseFloat(row.cells[2].querySelector('input')?.value || row.cells[2].textContent) || 0;
    const fines = parseFloat(row.cells[3].querySelector('input')?.value || row.cells[3].textContent) || 0;
    const clear = row.cells[4].querySelector('input')?.checked ? "Yes" : "No";
    const remaining = parseFloat(row.cells[5].textContent) || 0;

    // Only save if name and department are filled
    if (name && department) {
      saveFeeRecord(name, department, fee, fines, clear, remaining);
    }
  });
}
// Function to open Excel
function openExcel() {
  if (navigator.userAgent.indexOf("Windows NT") !== -1) {
    window.open('excel:', '_blank');
  } else {
    alert("Excel is only available on Windows.");
  }
}
function refreshNewInfo() {
  document.getElementById('name').value = '';
  document.getElementById('roll').value = '';
  document.getElementById('address').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('cnic').value = '';
  document.getElementById('email').value = '';
  document.getElementById('role').selectedIndex = 0;
  document.getElementById('department').selectedIndex = 0;
}
// Function to open Calculator
function openCalculator() {
  if (navigator.userAgent.indexOf("Windows NT") !== -1) {
    window.open('ms-calculator:', '_blank');
  } else {
    alert("Calculator is only available on Windows.");
  }
}

// Function to open Notepad
function openNotepad() {
  if (navigator.userAgent.indexOf("Windows NT") !== -1) {
    window.open('notepad:', '_blank');
  } else {
    alert("Notepad is only available on Windows.");
  }
}

// Function to open Excel
function openExcel() {
  if (navigator.userAgent.indexOf("Windows NT") !== -1) {
    window.open('excel:', '_blank');
  } else {
    alert("Excel is only available on Windows.");
  }
}
function deleteAllFeeRecords() {
  if (confirm("⚠️ Are you sure you want to delete all fee records?")) {
    localStorage.removeItem("feeRecords");
    feeRecords = [];
    const feeTable = document.getElementById("feeTable").getElementsByTagName('tbody')[0];
    feeTable.innerHTML = "";
    alert("✅ All fee records deleted!");
  }
}
// Function to calculate remaining fee
function calculateRemaining() {
  const fee = parseFloat(document.getElementById("fee").value) || 0;
  const fines = parseFloat(document.getElementById("fines").value) || 0;
  const clear = parseFloat(document.getElementById("clear").value) || 0;
  const remaining = (fee + fines) - clear;
  document.getElementById("remaining").value = remaining;
}

// Function to save student record in localStorage
function saveStudentRecord() {
  const name = document.getElementById("name").value;
  const department = document.getElementById("department").value;
  const fee = document.getElementById("fee").value;
  const fines = document.getElementById("fines").value;
  const clear = document.getElementById("clear").value;
  const remaining = document.getElementById("remaining").value;

  // Calculate remaining fee before saving
  calculateRemaining();

  // Check if all fields are filled
  if (name && department && fee && fines && clear && remaining) {
    const studentRecord = {
      name: name,
      department: department,
      fee: fee,
      fines: fines,
      clear: clear,
      remaining: remaining
    };

    // Get existing records from localStorage or create a new array
    let feeData = JSON.parse(localStorage.getItem("feeData")) || [];
    
    // Push the new student record into the array
    feeData.push(studentRecord);

    // Save the updated array back to localStorage
    localStorage.setItem("feeData", JSON.stringify(feeData));

    alert("Student record saved successfully!");
    document.getElementById("studentForm").reset(); // Reset the form
  } else {
    alert("Please fill in all fields before saving.");
  }
}

