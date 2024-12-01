import User from "../models/UserClass.js";
window.addEventListener("click",(event) =>{
    if(event.target.getAttribute("action")=="register"){
        let confirm = document.getElementById("confirm-password").value;
        let user = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            email: document.getElementById("email").value
        }
        let res = User.getAllUsers();
        res.then((allUser) =>{
            let userFind = allUser.filter(acc => acc.email==user.email);
            if(userFind.length>0){
                alert("Email đã tồn tại");
                return;
            }
            if(user.password!=confirm){
                alert("Mật khẩu không khớp");
                return;
            }
            User.register(user);
            alert("Đăng ký thành công");
        });
    }
});