

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

  if (username === "nabeel" && password === "57681234") {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mainSystem").style.display = "block";
    openTab('newInfo');
  } else {
    alert("Incorrect login credentials. Please try again.");
  }
}

// Function to handle tab opening
function openTab(tabId) {
  function deleteAllLeaves() {
  if (confirm("⚠️ Are you sure you want to delete all leave applications?")) {
    localStorage.removeItem("leaveApplications");
    leaveApplications = [];
    document.getElementById("leaveRecords").innerHTML = "";
    alert("✅ All leave applications deleted!");
  }
  }
