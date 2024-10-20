currentUser = JSON.parse(localStorage.getItem("currentUser"))
check_currentUser();
//Upload game Image
const imgUploadBtn = document.getElementById("imgUploadBtn");
const imgInput = document.createElement("input")
imgInput.type = "file";
imgInput.accept = "image/*";
imgInput.style.display = "none"
document.body.appendChild(imgInput)

imgUploadBtn.addEventListener("click", function() {
    imgInput.click()
})
imgInput.addEventListener("change", function() {
    const selectedFile = imgInput.files[0];
    console.log(selectedFile);
    if (selectedFile) {
        const fileReader = new FileReader();
        fileReader.onload = function(file) {
            document.querySelector("#imgGame").src = file.target.result;
        };
        fileReader.readAsDataURL(selectedFile);
        imgUploadBtn.textContent = "Change Image"
    }
 });
 // Upload game to gameList
 let gameList = JSON.parse(localStorage.getItem("gameList"))

 const sumbitBtn = document.getElementById("btnSubmit")
 sumbitBtn.addEventListener("click", function() {
    let gameTitle = document.getElementById("gameTitle").value;
    let gameDescription = document.getElementById("gameDesc").value;
    let gameTags = document.getElementById("gameGenre").value;
    let uploadedImageData = document.querySelector("#imgGame").src;
    let gamePrice = document.getElementById("gamePrice").value;
    let gameDevice = document.getElementById("gameDevice").value;

    if (gameTitle && uploadedImageData) {
        const newGame = {
            name: gameTitle,
            id: gameList.length, // Using timestamp as a simple unique id
            description: gameDescription,
            image: uploadedImageData,
            tags: `#${gameTags}`,
            price: gamePrice,
            device: gameDevice,
            user: currentUser[0].name
        };

        gameList.push(newGame);
        localStorage.setItem("gameList", JSON.stringify(gameList));

        alert("Game saved successfully!");

        // Clear the form
        gameTitle.value = "";
        document.getElementById("gameDescription").textContent = "";
        document.querySelector("#imgGame").src = "";
        imgUploadBtn.textContent = "Upload Image";
        uploadedImageData = null;
    } else {
        alert("Please enter a game name and upload an image.");
    }
 })