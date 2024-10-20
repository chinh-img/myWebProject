const gameContainer = document.getElementById("gameSell")
const searchInput = document.getElementById("search-input")
const searchButton = document.querySelector(".search-button")

gameList = JSON.parse(localStorage.getItem("gameList"))
function check_currentUser() {
    let currentUser = localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser"))
        : [];

    if (currentUser.length > 0) {
        let user = document.getElementById("users");
        user.innerHTML = currentUser[0].name;

        signUpBtn.style.display = `none`;
        logInBtn.style.display = `none`;
    }
    else {
        logOutBtn.style.display = `none`;
        document.getElementById("users").style.display = "none"
    }
}
logOutBtn.addEventListener("click", logOut)
function logOut() {
    localStorage.removeItem("currentUser")
    location.reload();

    signUpBtn.style.display = `block`;
    logInBtn.style.display = `block`;
}
check_currentUser(); // Chạy hàm để kiểm tra người dùng

// Hiển thị games
function createGameCard(game) {
    let gameCard = document.createElement("div");
    gameCard.classList.add("gameCard");

    let template = `
        <img class="gameImg" src="${game.image}" />
        <div class="container">
            <span class="gameName">${game.name}</span>
            <span class="gamePrice">$${game.price}</span>
        </div>
        <a href="#" class="gameTags">${game.tags}</a><br>
        <div class="container">
            <span class="userGame">By ${game.user}</span>
            <span class="gameDevice">${game.device}</span>
        </div>
        <p class="gameDetails">${game.details}</p>
    `;
    gameCard.innerHTML = template;
    return gameCard;
}

for (let game of gameList) {    
    let gameCard = createGameCard(game);
    let addCartBtn = document.createElement("button");
    addCartBtn.classList.add("addCartBtn");
    addCartBtn.textContent = "Add to Cart";
    addCartBtn.onclick = () => checkForCart(game.id);

    gameCard.appendChild(addCartBtn)
    gameContainer.appendChild(gameCard);
}

// Đếm ngược tới giáng sinh
function countdownToChristmas() {
    const countdownElement = document.getElementById('countdown');
    
    // Lấy ngày hiện tại và ngày Giáng sinh năm nay
    const currentDate = new Date();
    let christmasDate = new Date(currentDate.getFullYear(), 11, 25); // 11 là tháng 12 (tính từ 0)
  
    // Nếu ngày Giáng sinh đã qua trong năm nay, đếm ngược tới Giáng sinh năm sau
    if (currentDate > christmasDate) {
      christmasDate = new Date(currentDate.getFullYear() + 1, 11, 25);
    }
  
    // Tính toán thời gian chênh lệch
    const timeDifference = christmasDate - currentDate;
  
    // Chuyển đổi thời gian chênh lệch thành ngày, giờ, phút và giây
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    // Hiển thị kết quả
    countdownElement.innerHTML = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds until Christmas`;
  
    // Gọi lại hàm sau mỗi giây để cập nhật thời gian
    setTimeout(countdownToChristmas, 1000);
}
    // Khởi chạy hàm đếm ngược
countdownToChristmas();

// Search games

function searchGames() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Clear previous search results
    gameContainer.innerHTML = '';

    // Filter games based on search term
    const filteredGames = gameList.filter(game => 
        game.name.toLowerCase().includes(searchTerm) ||
        game.tags.toLowerCase().includes(searchTerm) ||
        game.user.toLowerCase().includes(searchTerm)
    );

    // Display filtered games
    for (let game of filteredGames) {    
        let gameCard = createGameCard(game);
        let addCartBtn = document.createElement("button");
        addCartBtn.classList.add("addCartBtn");
        addCartBtn.textContent = "Add to Cart";
        addCartBtn.onclick = () => checkForCart(game.id);

        gameCard.appendChild(addCartBtn);
        gameContainer.appendChild(gameCard);
    }
}

searchButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    searchGames();
});
