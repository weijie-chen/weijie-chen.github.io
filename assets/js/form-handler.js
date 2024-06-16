document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".php-email-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const loading = document.querySelector(".loading");
    const errorMessage = document.querySelector(".error-message");
    const sentMessage = document.querySelector(".sent-message");

    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(data => {
          throw new Error(data.errors ? data.errors.map(error => error.message).join(", ") : "Oops! There was a problem submitting your form");
        });
      }
    })
    .then(data => {
      loading.style.display = "none";
      if (data.ok) {
        sentMessage.style.display = "block";
        form.reset();
        // Optionally, redirect to the thank you page
        // window.location.href = data.next;
      } else {
        throw new Error("Oops! There was a problem submitting your form");
      }
    })
    .catch(error => {
      loading.style.display = "none";
      errorMessage.innerText = error.message;
      errorMessage.style.display = "block";
    });
  });
});
