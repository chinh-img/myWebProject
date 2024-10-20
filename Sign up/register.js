// Khai báo HTML
//Sign Up form
let username = document.getElementById("username");
let pass = document.getElementById("pass");
let email = document.getElementById("email");
let phone = document.getElementById("phoneNum")
let passConfirm = document.getElementById("confirmPass");
let errorAlert = document.getElementById("errorAlert");

function changeMode()  {
    mode =  document.getElementById("btnSwitch");
    errorAlert.innerHTML = '';
    mode.setAttribute('href', '../Sign in/SignIn.html')
}

function register() {
    if (username.value === "" || pass.value === "" || email.value === "" || passConfirm.value === "") {
        errorAlert.innerHTML = "Each field must been filled";
        return false;
    } 
    else if (email.value.indexOf("@") == -1 || email.value.indexOf(".com") == -1){
        errorAlert.innerHTML = "Please enter a valid email";
        return false;
    }
    else if (pass.value.length < 8) {
        errorAlert.innerHTML = "Password must be at least 8 characters long";
        return false;
    }
    else if (pass.value !== passConfirm.value) {
        errorAlert.innerHTML = "Password must be same";
        return false;
    }
    
    else {
        let userList = localStorage.getItem("userList") ? JSON.parse(localStorage.getItem("userList")) : []; // Nếu có key "userList" thì thêm vào key đó, sai thì tạo thành mảng rỗng []
        let usernameExists = false;


        for (let acc of userList) {
            if (acc.username === username.value) {
                usernameExists = true;
                break;
            }
        }
        if (usernameExists) {
            errorAlert.innerHTML = "Username already exists";
            return false;
        } else {
            if (userList.length == 0) {
                userList.push({
                    id: 1,
                    username: username.value,
                    pass: pass.value,
                    email: email.value,
                    phone: phone.value
                });
            } else {
                userList.push({
                    id: userList[userList.length-1].id + 1,
                    username: username.value,
                    pass: pass.value,
                    email: email.value,
                    phone: phone.value
                });
            }
        }

        console.log(userList);
        localStorage.setItem("userList", JSON.stringify(userList)); // Chuyển sang JSON string
        alert("Sign up successfully!");
        errorAlert.innerHTML = "";
        window.location.href = "../Sign in/SignIn.html"
    }

}


// Random password generator
function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    const lowerCasechars = "abcdefghijklmnopqrstuvwxyz";
    const upperCasechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = '`~!@#$%^&*()_+=?/|.';
    
    let allowedChars = '';
    let randomPass = '';

    allowedChars += includeLowercase? lowerCasechars : '';
    allowedChars += includeUppercase? upperCasechars : '';
    allowedChars += includeNumbers? numberChars : '';
    allowedChars += includeSymbols? symbolChars : '';

    for (let index = 0; index < length; index++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        randomPass += allowedChars[randomIndex];
    }

    return randomPass;
}

let password; 
function getPass() {
    password =  generatePassword(8, true, true, true, true);
    pass.value = password;
    window.alert("Make sure no one is there?");
    console.log(`Your generated password: ${password}`);
}