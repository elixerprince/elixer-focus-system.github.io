<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirm-password"];

    // Perform server-side validation
    $errors = [];
    if (empty($fname) || empty($lname) || empty($email) || empty($password) || empty($confirmPassword)) {
        $errors[] = "All fields are required.";
    }
    if ($password !== $confirmPassword) {
        $errors[] = "Passwords do not match.";
    }

    // If there are no validation errors, process the form
    if (empty($errors)) {
        // Perform further processing (e.g., saving user data to a database)

        // Redirect the user to a success page
        header("Location: success.php");
        exit;
    } else {
        // If there are validation errors, display them to the user
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
    }
}
?>