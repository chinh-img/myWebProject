let currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : []
let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : []
gameList = JSON.parse(localStorage.getItem("gameList"))
currentUserID = currentUser[currentUser.length - 1].id

function checkForCart(productID) {
    if (currentUser.length < 1) {
        alert("Bạn cần đăng nhập để thêm giỏ hàng!")
        return 0
    }
    if (currentUserID > 0) {
        addToCart(currentUserID, productID)
    } else {
        alert("Thêm giỏ hàng lỗi, bạn cần đăng nhập lại!")
    }
}

function addToCart(userID, productID) {
    let count = 0
    if (cart.length < 1) {
        cart.push({
            userID: userID,
            id: productID,
            quantity: 1,
        })
    } else {
        for (let item of cart) {
            if (productID == item.id && userID == item.userID) {
                count = 1
                break
            }
        }
        if (count == 1) {
            for (let item of cart) {
                if (productID == item.id && userID == item.userID) {
                    item.quantity += 1
                    alert("Sản phẩm đã có trước đó, đã tăng số lượng!")
                    break
                }
            }
        } else {
            cart.push({
                userID: userID,
                id: productID,
                quantity: 1
            })
        }
    }
    console.log("Add to cart", cart)
    localStorage.setItem("cart", JSON.stringify(cart))
    update_noti_cart()
    cart_show()
}

function update_noti_cart() {
    let quantity = 0
    if (cart.length > 0 && currentUser.length > 0) { //Kiểm tra giỏ hàng, hiện những mặt hàng của người đang đăng nhập ra thông báo.
        for (let item of cart) {
            if (item.userID == currentUser[currentUser.length - 1].id) {
                quantity += 1
            }
        }
        document.getElementById("cart").innerHTML = quantity
    }
}
update_noti_cart()

let total = 0
function cart_show() {
    for (let game of gameList) {
        for (let item of cart) {
            if (item.id == game.id && item.userID == currentUser[currentUser.length - 1].id) {
                let cart_item = `
                    <tr>
                        <td class="col-sm-8 col-md-6">
                            <div class="media">
                                <a class="thumbnail pull-left" href="#"> <img class="media-object" src="${game.image}" style="width: 72px; height: 72px;"> </a>
                                <div class="media-body">
                                    <h4 class="media-heading"><a href="#">${game.name}</a></h4>
                                    <h5 class="media-heading"> by <a href="#">${game.user}</a></h5>
                                    <span>Status: </span><span class="text-success"><strong>In Stock</strong></span>
                                </div>
                            </div>
                        </td>
                        <td class="col-sm-1 col-md-1" style="text-align: center">
                            <input type="email" class="form-control" value=${item.quantity}>
                        </td>
                        <td class="col-sm-1 col-md-1 text-center"><strong>$${game.price}</strong></td>
                        <td class="col-sm-1 col-md-1 text-center"><strong>$${(game.price * item.quantity).toFixed(2)}</strong></td>
                        <td class="col-sm-1 col-md-1">
                            <button type="button" class="btn btn-danger" onclick="delete_cart(${item.userID}, ${item.id})">
                                <span class="glyphicon glyphicon-remove"></span> Remove
                            </button>
                        </td>
                    </tr>
                `
                document.getElementById("tablebody").innerHTML += cart_item;
                total += game.price * item.quantity
            }
        }
    }
    console.log(total)
    totalShow()
}
cart_show()
function totalShow() {
    let cart_total = `
    <tr>
        <td>   </td>
        <td>   </td>
        <td>   </td>
        <td><h3>Total</h3></td>
        <td class="text-right"><h3><strong>$${total.toFixed(2)}</strong></h3></td>
    </tr>
    <tr>
        <td>   </td>
        <td>   </td>
        <td>   </td>
        <td>
        <button type="button" class="btn btn-default">
            <span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
        </button></td>
        <td>

        <button class='order'>
            <span class='default'>Complete Order ▶</span></span>
            <span class='success'> Order Placed
                <svg viewbox='0 0 12 10'>
                    <polyline points='1.5 6 4.5 9 10.5 1'></polyline
                </svg>
            </span>
            <div class='box'></div>
            <div class='truck'>
                <div class='back'></div>
                <div class='front'></div>
                    <div class='window'></div>
                <div class='light top'></div>
                <div class='light bottom'></div>
            </div>
            <div class='lines'></div>
        </button>
        </td>
    </tr>
    `
    document.getElementById("tablebody").innerHTML += cart_total
}

function update_cart(userID, productID, value) {
    for (i in cart) {
        if (cart[i].userID == userID && cart[i].id == productID) {
            if (cart[i].quantity == 1 && value == -1) {
                cart.splice(i, 1);
                break;
            } else {
                cart[i].quantity += value
            }
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    update_noti_cart()
    location.reload()
}

function delete_cart(userID, productID) {
    let existingItem = cart.find((item) => item.userID == userID && item.id == productID)
    if (existingItem) {
        cart_delete = cart.filter((item) => item.userID == userID && item.id == productID)
        cart = cart.filter((new_item) => !cart_delete.includes(new_item))
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    update_noti_cart()
    location.reload()
}

// Thanh toán
function checkout() {
    // Kiểm tra đã có sản phẩm trong cart hoặc người dùng đã đăng nhập
    if (!currentUser || cart.length === 0) {
        alert("Your cart is empty or you're not logged in.");
        return;
    }

    // Hiệu ứng đặt hàng
    let orderButton = document.querySelector('.order');
    if (!orderButton.classList.contains('animate')) {
        orderButton.classList.add('animate');

        setTimeout(() => {
            orderButton.classList.remove('animate');
            alert(`Order placed successfully! Total: $${total.toFixed(2)}`); // total: đã tính tổng ở trên
            clearCart(); // Clear cart after checkout
        }, 10000);
    }
}

// Clear the cart after checkout
function clearCart() {
    // Filter out items for the current user and save updated cart to localStorage
    cart = cart.filter(item => item.userID !== currentUser[currentUser.length - 1].id);
    localStorage.setItem("cart", JSON.stringify(cart));
    update_noti_cart();
    location.reload(); 
}

document.querySelector('.order').addEventListener('click', checkout);