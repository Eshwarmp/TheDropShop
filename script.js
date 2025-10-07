// STEP 4a: Select the progress bar element using its ID
const progressBar = document.getElementById('progress-bar');

// STEP 4b: The core function that runs every time the user scrolls
function updateProgressBar() {
    // 1. Calculate the total scrollable height of the page
    // (Total document height - the height of the visible window)
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    
    // 2. Get the current scroll position from the top
    const scrollPosition = window.scrollY;

    // 3. Calculate the percentage: (Scrolled distance / Total distance) * 100
    const progressPercent = (scrollPosition / totalHeight) * 100;

    // 4. Update the width of the progress bar
    progressBar.style.width = progressPercent + '%';
}

// STEP 4c: Attach the function to the 'scroll' event
// This tells the browser: "Run updateProgressBar every time the user scrolls"
window.addEventListener('scroll', updateProgressBar);

document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Password Visibility Toggle
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');

    if (togglePassword && password) {
        togglePassword.addEventListener('click', function () {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.textContent = (type === 'password' ? '👁️' : '🔒');
        });
    }


    // 2. Immediate & Submit Password Validation Logic
    // This code now waits until the form is guaranteed to be loaded!
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const passwordInput = document.getElementById('password');
    const errorDisplay = document.getElementById('password-error');

    // Strict Regex for complexity: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    function validatePassword() {
        // Only run validation if elements are found (safety check)
        if (!form || !nameInput || !passwordInput || !errorDisplay) return false;

        const name = nameInput.value;
        const password = passwordInput.value;
        
        errorDisplay.textContent = ''; // Clear previous error
        errorDisplay.style.color = 'red'; // Default to red

        // Check 1: Complexity
        if (!passwordRegex.test(password)) {
            errorDisplay.textContent = "❌ Must be 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special character.";
            return false;
        }

        // Check 2: Must not contain the Name
        if (password.toLowerCase().includes(name.toLowerCase()) && name.length > 0) {
            errorDisplay.textContent = "❌ Password cannot contain your name.";
            return false;
        }

        errorDisplay.textContent = "✅ Password strength is good!";
        errorDisplay.style.color = '#00cc99'; // Success color
        return true;
    }

    // Attach IMMEDIATE validation (when user leaves the password box)
    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePassword);
    }

    // Attach validation before final submission
    if (form) {
        form.addEventListener('submit', function (event) {
            if (!validatePassword()) {
                event.preventDefault(); // Block submission if validation fails
            }
        });
    }
});