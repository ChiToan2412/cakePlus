
import User from "../models/UserClass.js";
window.addEventListener("click", (event) => {
    if (event.target.getAttribute("action") == "login") {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let res = User.getAllUsers();
        res.then(result => {

            let user = result.find(item => item.email == email && item.password == password);
            if (user) {
                alert("Đăng nhập thành công!");
                window.location.href = "../index.html";
            } else {
                alert("Tài khoản hoặc mật khẩu không đúng!");
            }
        });
    }
});