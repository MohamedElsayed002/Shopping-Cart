let userInfo = document.querySelector("#user_info")
let userDom = document.querySelector("#user")
let links = document.querySelector("#links")
let logoutBtn = document.querySelector("#logout")

if (localStorage.getItem("username")) {
    links.remove()
    userInfo.style.display = "flex"
    userDom.innerHTML = localStorage.getItem("username")
}

logoutBtn.addEventListener('click', function() {
    localStorage.clear();
    setTimeout(() => {
        window.location = "register.html"
    }, 1500);
})