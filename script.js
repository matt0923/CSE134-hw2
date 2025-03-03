document.addEventListener("DOMContentLoaded", () => {
    const name = document.getElementById("name");
    const errorMessage = document.getElementById("error-message");
    const email = document.getElementById("email");
    const comments = document.getElementById("comments");
    const maxChars = 500;
    const charCount = document.getElementById("char-count")
    let form_errors = [];
    const formErrorsInput = document.getElementById("form-errors");
    const form = document.getElementById("contact");

    name.addEventListener("input", (event) => {
        const regex = /[A-Za-z\s]/;
        if (event.data && !regex.test(event.data)) {
            errorMessage.textContent = `Non-alphabetic character in name: "${event.data}"`;
            errorMessage.style.display = "block";
            errorMessage.style.opacity = "1";
            errorMessage.style.animation = "none";
            void errorMessage.offsetWidth;
            errorMessage.style.animation = "fadeOut 2s forwards";
            name.value = name.value.slice(0, -1);
            form_errors.push("Non-alphabetic character in name: " + event.data + " ");
        }
    });

    email.addEventListener("input", (event) => {
        const emailRegex = /[A-Za-z0-9@._-]/;
        if (event.data && !emailRegex.test(event.data)) {
            errorMessage.textContent = `Non-valid character in email: "${event.data}"`;
            errorMessage.style.display = "block";
            errorMessage.style.opacity = "1";
            errorMessage.style.animation = "none";
            void errorMessage.offsetWidth;
            errorMessage.style.animation = "fadeOut 4s forwards";
            email.value = email.value.slice(0, -1);
            form_errors.push("Non-valid character in email: " + event.data + " ");
        }
    });

    comments.addEventListener("input", (event) => {
        const currentLength = comments.value.length;
        const remaining = maxChars - currentLength;
        charCount.textContent = `${remaining} character(s) left`;
        
        if (remaining >= 200 && remaining <= 400) {
          charCount.style.color = "yellow";
        } else if (remaining < 200 && remaining >= 100) {
            charCount.style.color = "orange";
        }
        else if (remaining < 100) {
            charCount.style.color = "red";
        }
        else {
            charCount.style.color = "black";
        }
        if (comments.value.length > 500 && event.data) {
            charCount.textContent = "0 characters left";
            comments.value = comments.value.slice(0, -1);
            errorMessage.textContent = "Exceeded Character limit";
            errorMessage.style.display = "block";
            errorMessage.style.opacity = "1";
            errorMessage.style.animation = "none";
            void errorMessage.offsetWidth;
            errorMessage.style.animation = "fadeOut 2s forwards";
            form_errors.push("Exceeded Character limit");
        }
    });

    form.addEventListener("submit", () => {
        formErrorsInput.value = form_errors;
    });

    const toggle = document.getElementById("toggle");
    const root = document.documentElement; 

    toggle.addEventListener('change', function(event) {
        if (event.target.checked) {
            root.style.setProperty("--bg-color", "#1e1e1e");
            root.style.setProperty("--text-color", "white");
            root.style.setProperty("--primary-color", "white");
            localStorage.setItem("theme", "dark");
          } else {
            root.style.setProperty("--bg-color", "#ffffff");
            root.style.setProperty("--text-color", "black");
            root.style.setProperty("--primary-color", "black");
            localStorage.setItem("theme", "light");
          }
      });

    const theme = localStorage.getItem("theme");

    if (theme == "dark") {
        root.style.setProperty("--bg-color", "#1e1e1e");
        root.style.setProperty("--text-color", "white");
        root.style.setProperty("--primary-color", "white");
        toggle.checked = true;
    } else {
        root.style.setProperty("--bg-color", "#ffffff");
        root.style.setProperty("--text-color", "black");
        root.style.setProperty("--primary-color", "black");
        toggle.checked = false;
      }
});