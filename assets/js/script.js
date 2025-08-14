var email = document.getElementById("email");
var pass = document.getElementById("pass");
var loginBtn = document.getElementById("loginBtn");
var allUsersData = getUserData(); // Defined in storage.js

loginBtn.addEventListener("click", function () {
  // Add loading states during async operations
  loginBtn.disabled = true;
  loginBtn.innerHTML = 'Logging in...';

  try {
    for (var i = 0; i < allUsersData.length; i++) {
      if (
        allUsersData[i].email == email.value &&
        allUsersData[i].pass == pass.value
      ) {
        setCurrentUser(i);
        window.location.href = "./assets/pages/dashboard.html";
        return; // Exit the function after successful login
      } else {
        document.getElementById("warningDiv").classList.remove("d-none");
      }
    }
    if (allUsersData.length == 0) {
      document.getElementById("warningDiv").classList.remove("d-none");
    }
  } catch (error) {
    console.error("Login error:", error);
    showErrorMessage("An unexpected error occurred");
  } finally {
    // ...after operation
    loginBtn.disabled = false;
    loginBtn.innerHTML = 'Login';
  }
});

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function validateEmail(email) {
    email.addEventListener('input', function() {
        const isValid = email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        email.classList.toggle('is-invalid', !isValid);
    });
}

function validateForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('pass');
    
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    if (password.value.length < 8) {
        showError('Password must be at least 8 characters long');
        return false;
    }
    
    return true;
}
