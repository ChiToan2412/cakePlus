const root = "http://localhost:3000/";
const loadProducts = async () => {
    let response = await fetch(root + "products");
    let products = await response.json();
    document.getElementById("allProduct").innerHTML = products.map((item) => {
        return `
            <a href="product-detail.html?idProduct=${item.id}">
                <div class="cart">
                    <img src="public/img/${item.image}" alt="">
                    <div class="info">
                        <h3>${item.name}</h3>
                        <h4>Giá: ${item.price} Vnđ</h4>
                    </div>
                </div>
            </a>
                
            `;
    }).join("");
}
const loadCategories = async () => {
    let response = await fetch(root + "categories");
    let categories = await response.json();
    document.getElementById("categories").innerHTML = categories.map(item => {
        return `
            <li><a href="index.html?idCategory=${item.id}">${item.name}</a></li>
        `;
    }).join("") + "<li><a href='index.html'>Tất cả sản phẩm</a></li>";
}
const loadProductsByCategory = async (id) => {
    let response = await fetch(root + "products");
    let products = await response.json();
    let productsByCategory = products.filter((item) => item.category == id);
    document.getElementById("allProduct").innerHTML = productsByCategory.map((item) => {
        return `
            <a href="product-detail.html?idProduct=${item.id}">
                <div class="cart">
                    <img src="public/img/${item.image}" alt="">
                    <div class="info">
                        <h3>${item.name}</h3>
                        <h4>Giá: ${item.price} Vnđ</h4>
                    </div>
                </div>
            </a>
            `;
    });
}
const getParamUrl = () => {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("idCategory")) {
        loadProductsByCategory(urlParams.get("idCategory"));
    } else {
        loadProducts();
    }
}
const loadProductById = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idProduct = urlParams.get("idProduct");
    let response = await fetch(root + "products/" + idProduct);
    let product = await response.json();
    document.getElementById("product-detail").innerHTML = `
          <div class="product-image">
                <img src="public/img/${product.image}" alt="Hình ảnh sản phẩm">
            </div>
            <div class="product-info">
                <h1 class="product-name">${product.name}</h1>
                <p class="product-price">${product.price.toLocaleString()} VNĐ</p>
                <input type="number" id="quantity" value="1" min="1">
                <p class="product-description">
                    ${product.description}
                </p>
                <button class="btn-add-to-cart" button-name="addToCart" item-id="${product.id}" item-img="${product.image}" item-name="${product.name}" item-price="${product.price}">
                    <i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng
                </button>
            </div>
    `;
    countCart();
    displayCart();
}
const loadData = () => {
    getParamUrl();
    loadCategories();
    countCart();
    displayCart();
}
// lấy giỏ hàng
const getCart = function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
// lưu vào giỏ hàng
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// hiển thị giỏ hàng
const renderCart = () => {
    let cart = getCart();
    let cartHtml = document.getElementById("cartItems");
    if (cart.length == 0) {
        cartHtml.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }
    cartHtml.innerHTML = cart.map(item => {
        return `
            <tr>
                    <td><img src="public/img/${item.image}" alt="" class="cart-image"></td>
                    <td>${item.name}</td>
                    <td>${item.price.toLocaleString()} VND</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1" class="form-control text-center quantity">
                    </td>
                    <td>${(item.price * item.quantity).toLocaleString()} VNĐ</td>
                    <td>
                        <button class="btn btn-danger btn-sm remove-item" id-cart="${item.id}" button-name="deleteCart">Xóa</button>
                    </td>
                </tr>
        `;
    }).join("");
}
// thêm sản phẩm vào giỏ hàng 
window.addEventListener("click", (event) => {
    let cart = getCart();
    if (event.target.getAttribute("button-name") == "addToCart") {
        let item = {
            id: event.target.getAttribute("item-id"),
            image: event.target.getAttribute("item-img"),
            name: event.target.getAttribute("item-name"),
            price: Number(event.target.getAttribute("item-price")),
            quantity: Number(document.getElementById("quantity").value)
        }
        const existingProduct = cart.find(product => product.name == item.name);
        if (existingProduct) {
            alert("Đã thêm sản phẩm vào giỏ hàng");
            existingProduct.quantity += item.quantity;
            saveCart(cart);
            countCart();
            displayCart();          
        } else {
            alert("Đã thêm sản phẩm vào giỏ hàng");
            cart.push(item);
            saveCart(cart);
            countCart(); 
            displayCart();
        }
    }
    if (event.target.getAttribute("button-name") == "deleteCart") {
        let cart = getCart();
        let idToDelete = event.target.getAttribute("id-cart");
        let index = cart.findIndex(item => item.id === idToDelete);
        if (index!== -1) {
            cart.splice(index, 1);
        }
        saveCart(cart);
        renderCart();
        countCart();
    }
    if (event.target.getAttribute("button-name") == "deleteAll") {
        let cart = getCart();
        cart = [];
        saveCart(cart);
        localStorage.setItem("countCart", 0);
        renderCart();
        countCart();
    }  
});
function countCart() {
    let cart = getCart();
    let sumQuantity = Object.values(cart).reduce((acc, value)=>{
        return acc + Number(value.quantity);
    },0);
    console.log(sumQuantity);
    localStorage.setItem("countCart", sumQuantity);
}
function displayCart() {
    let count = localStorage.getItem("countCart");
    document.getElementById("displayCart").innerHTML = `<i class="fa-solid fa-cart-shopping">(</i>${count})<br>Giỏ hàng`;
    
}
function loadCheckout() {
    let cart = getCart();
    // console.log(cart);
    document.getElementById("cart").innerHTML = cart.map((item)=>{
        return `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${item.name}
                    <span>Giá: ${item.price} VNĐ</span>
                    <span>Số lượng: ${item.quantity}</span>
                </li>
        `;
    });
    let total = cart.reduce((acc, value)=>{
        return acc + (value.price * value.quantity);
    }, 0);
    document.getElementById("total").innerHTML = `<strong>Tổng cộng: ${total.toLocaleString()} VNĐ</strong>`
}


function loadSuccess(){
    let cart = getCart();
    let total = cart.reduce((acc, value)=>{
        return acc + (value.price * value.quantity);
    }, 0);
    document.getElementById("info-order").innerHTML =  `
                    <tr>
                        <th>Mã Đơn Hàng</th>
                        <td>#123456789</td>
                    </tr>
                    <tr>
                        <th>Ngày Đặt Hàng</th>
                        <td>01/12/2024</td>
                    </tr>
                    <tr>
                        <th>Tổng Thanh Toán</th>
                        <td>${total.toLocaleString()} VND</td>
                    </tr>
    `
}
window.addEventListener("click", (event)=>{
    if(event.target.getAttribute("action")=="quit"){
        let cart = getCart();
        cart = [];
        saveCart(cart);
        window.location.href="index.html";
    }
})