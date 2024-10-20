//Sign In form
let userSignIn = document.getElementById("userSignIn");
let passwordSignIn = document.getElementById("passSignIn");

document.getElementById("homePage").addEventListener("click", () => {
    document.getElementById("homePage").setAttribute('href', '../Main page/main.html')
});

function changeMode()  {
    mode =  document.getElementById("btnSwitch");
    errorAlert.innerHTML = '';
    mode.setAttribute('href', '../Sign up/Register.html')
}

function signIn() {
    let userId = null;

    if (userSignIn.value === "" || passwordSignIn.value === "") {
        errorAlert.innerHTML = "Each field must been filled";
        return false;
    } 
    else {
        errorAlert.innerHTML = "";
        let admin = false;

        let existAcc = 0;
        let userList = JSON.parse(localStorage.getItem("userList")); //Đổi từ kiểu JSON thành object
        if (userList == null) {
            errorAlert.innerHTML = "No account exists";
            return false
        }
        let accountExists = false;
        for (let acc of userList) {
            if (acc.username == userSignIn.value && acc.pass === passwordSignIn.value ) {
                accountExists = true;
                userId = acc.id;
                existAcc = 1;
                console.log(userList);
                break;
            } else {
                existAcc = 0;
            }
        }
        if (existAcc == 1) {
            alert("Sign in successfully");
            let currentUser = [{id: userId, name:userSignIn.value,}];
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            window.location.href = "../Loading page/loading.html"
        } else {
            alert("Sign in fail");
        } 
        if (!accountExists) {
            errorAlert.innerHTML = "Account does not exist";
        }
    }
}
