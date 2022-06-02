// Regsiter User 

let userName = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let register_btn = document.querySelector("#signup");

register_btn.addEventListener("click", register());

function register(e) {
    register_btn.addEventListener("click", function(e) {
        e.preventDefault();
        if (userName.value === "" || email.value === "" || password.value === "") {
            alert("Please Fill Data");
        } else {
            localStorage.setItem("username", userName.value);
            localStorage.setItem("email", email.value)
            localStorage.setItem("password", password.value)

            setTimeout(() => {
                window.location = "login.html"
            }, 1500)
        }
    });
}