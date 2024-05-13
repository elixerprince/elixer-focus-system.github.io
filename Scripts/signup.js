document.addEventListener('DOMContentLoaded', function() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const signupForm = document.querySelector('form');

    signupForm.addEventListener('submit', function(event) {
        if (password.value !== confirmPassword.value) {
            alert('Passwords do not match!');
            event.preventDefault(); // Prevent form submission
        }
    });
});