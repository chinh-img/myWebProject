let userList = JSON.parse(localStorage.getItem("userList"));
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let changeNameBtn = document.getElementById("changeNameBtn")

function showCurrentUserInfo() {
  if (!userList || !currentUser) {
    console.error("Error: Unable to retrieve user list or current user from local storage.");
  } else {
    let currentUserID = currentUser[0].id;
    if (!currentUserID) {
      console.error("Error: Current user ID is not valid.");
    } else {
      // Find the current user in the user list
      let currentUserData = userList.find(acc => acc.id == currentUserID);
  
      if (!currentUserData) {
        console.error("Error: Current user not found in user list.");
      } else {
        // Update the page with user data
        let nameElement = document.getElementById("name");
        let emailElement = document.getElementById("email");
        let phoneElement = document.getElementById("phone");
        let genderElement = document.getElementById("gender");
        let bDateElement = document.getElementById("bDate");

        if (nameElement && emailElement && phoneElement) {
          nameElement.innerHTML = currentUserData.username;
          emailElement.value = currentUserData.email;
          phoneElement.value = currentUserData.phone;
          genderElement.value = currentUserData.gender;
          // Formate ngày
          let dateOfBirth = new Date(currentUserData.bDate);
          let year = dateOfBirth.getFullYear();
          let month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
          let day = dateOfBirth.getDate().toString().padStart(2, '0');
          bDateElement.value = `${year}-${month}-${day}`;
        } else {
          console.error("Error: Unable to find HTML elements to display user info.");
        }
      }
    }
  }
}
showCurrentUserInfo();

function saveChanges() {
  let nameElement = document.getElementById("name");
  let emailElement = document.getElementById("email");
  let phoneElement = document.getElementById("phone");
  let genderElement = document.getElementById("gender")
  let birthDateElement = document.getElementById("bDate")

  if (nameElement && emailElement && phoneElement) {
    let newUsername = nameElement.innerHTML;
    let newEmail = emailElement.value;
    let newPhone = phoneElement.value;
    let newGender = genderElement.value;
    let newBirthDate = birthDateElement.value;
  
    if (currentUser && userList) {
      let currentUserID = currentUser[0].id;
      let currentUserData = userList.find(acc => acc.id == currentUserID);
  
      if (currentUserData) {
        currentUserData.username = newUsername;
        currentUserData.email = newEmail;
        currentUserData.phone = newPhone;
        currentUserData.gender = newGender;
        currentUserData.bDate = newBirthDate;

        // Update local storage
        localStorage.setItem("userList", JSON.stringify(userList));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
  
        console.log("Changes saved successfully!");
      } else {
          console.error("Error: Current user not found in user list.");
      }
    } else {
        console.error("Error: Unable to retrieve user list or current user from local storage.");
      }
  } else {
      console.error("Error: Unable to find HTML elements to retrieve user info.");
  }
}
let nameElement = document.getElementById("name");
console.log(nameElement);