<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collecting and sanitizing input data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Validate inputs: Check if all fields are filled
    if (!empty($name) && !empty($email) && !empty($subject) && !empty($message)) {
        // Email settings
        $to = "weijiechen00@gmail.com";
        $headers = "From: " . $email; // Setting the email header
        $body = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message"; // Constructing the email body

        // Send email using the mail function
        if (mail($to, $subject, $body, $headers)) {
            echo "Thank you for contacting me!"; // Success message
        } else {
            echo "Sorry, something went wrong. Please try again later."; // Error message if mail function fails
        }
    } else {
        echo "All fields are required."; // Error message for missing fields
    }
} else {
    echo "Invalid request method."; // Error message for invalid request method
}
?>
