// Ở đây là nơ dành cho các hiệu ứng css và những tương tác với nút đơn giản
    //CSS Snow effects
const snowflakesContainer = document.querySelector('.snowflakes');
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.textContent = Math.random() > 0.5 ? '❅' : '❆';

  snowflake.style.left = `${Math.random() * 100}vw`;
  snowflake.style.animationDuration = `${Math.random() * 3 + 8}s`; // Thời gian rơi
  snowflake.style.fontSize = `${Math.random() * 1 + 1.5}em`; // Kích thước khác nhau

  snowflakesContainer.appendChild(snowflake);

  // Xóa bông tuyết khi đã rơi hết
  setTimeout(() => {
    snowflake.remove();
  }, 10000); // Thời gian tồn tại của bông tuyết
}
setInterval(createSnowflake, 500);

    //Interact with buttons
        // Login && Signup part
const logInBtn = document.getElementById("logInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const logOutBtn = document.getElementById("logOutBtn")

logInBtn.addEventListener("click", () => {
    logInBtn.setAttribute("href", "../Sign in/SignIn.html");
});

signUpBtn.addEventListener("click", () => {
    signUpBtn.setAttribute("href", "../Sign up/Register.html");
})
        // Sidebar
const checkbox = document.getElementById('sidebar-active');
const sidebar = document.querySelector('.sideBar');

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        sidebar.style.left = `-100%`;
    } else {
        sidebar.style.left = '0';
    }
});
    // Games list
let gameList = localStorage.getItem("gameList")? JSON.parse(localStorage.getItem("gameList"))
:[
    {
        name: "Snake",
        price: 0,
        device: "Web",
        image: "https://s3-sgn10.fptcloud.com/teky-prod/teky-edu-vn/media/project_medias/2024/9/29/CWNHmM2TpyApSkAE_202492915419.png",
        tags: "#Classical",
        details: "blah blah blah",
        user: "admin",
        date: new Date(),
        id: 0
    }
];
localStorage.setItem("gameList",JSON.stringify(gameList))