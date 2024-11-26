const root = "http://localhost:3000/";
const fetchAPI = async (url, option) => {
    let response = await fetch(url, option);
    return await response.json();
}
const loadProducts = async () => {
    let response = await fetch(root + "products");
    let products = await response.json();

    document.getElementById("allProduct").innerHTML = products.map((item) => {
        let price = parseInt(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        return `
            <tr>
                <td>${item.id}</td>
                <td><img src="../public/img/${item.image}" alt="product-image" class="img-thumbnail" width="75px" height="75px"></td>
                <td>${item.name}</td>
                <td id="describe">${item.description}</td>
                <td>${item.category}</td>
                <td>${price}</td>
                <td>
                <button class="btn btn-sm btn-warning" onclick="handleButtonProduct(${item.id})">Sửa</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${item.id})">Xóa</button>
                </td>
            </tr>
            `;
    }).join("");
}

const loadCategories = async () => {
    let response = await fetch(root + "categories");
    let categories = await response.json();
    document.getElementById("allCategories").innerHTML = categories.map(item => {
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>
                <button class="btn btn-sm btn-warning" onclick="handleButtonCategory(${item.id})">Sửa</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCategory(${item.id})">Xóa</button>
                </td>
            </tr>
        `;
    }).join("");
}


const handleButtonProduct = async (index = -1) => {
    let button = document.getElementById("btn");
    let res = await fetch(root + "products");
    let products = await res.json();
    if (index != -1) {
        document.getElementById("productId").value = products.id;
        document.getElementById("productName").value = products.name;
        document.getElementById("productPrice").value = products.price;
        document.getElementById("productCategory").value = products.category;
        document.getElementById("productDescription").value = products.description;
        document.getElementById("img").src = "../public/img/" + products.image;
        // console.log(products);
        button.value = "Sửa";
    }
    button.onclick = () => {
        let id = document.getElementById("productId").value;
        let name = document.getElementById("productName").value;
        let price = document.getElementById("productPrice").value;
        let category = document.getElementById("productCategory").value;
        let description = document.getElementById("productDescription").value;
        let img = "";
        let addressImg = document.getElementById("productImage").value.split("\\");
        if (addressImg) {
            img = addressImg[addressImg.length - 1];
        }
        let newProduct = {
            "id": id,
            "name": name,
            "price": price,
            "category": category,
            "description": description,
            "image": img
        }
        console.log(newProduct);
        if (button.value == "Thêm") {
            console.log("Product");
            let url = root + "products/";
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            }
            fetchAPI(url, options);
        } else {
            let url = root + "products/" + index;
            let options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            }
            fetchAPI(url, options);
        }
        loadProducts();
    }
}
const deleteProduct = async (id) => {
    let url = root + "products/" + id;
    let options = {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json',
        }
    };
    fetchAPI(url, options);
    loadProducts();
}
const handleButtonCategory = async (index = -1) => {
    let button = document.getElementById("btn");
    let res = await fetch(root + "products");
    let products = await res.json();
    if (index != -1) {
        document.getElementById("productId").value = products.id;
        document.getElementById("productName").value = products.name;
        button.value = "Sửa";
    }
    button.onclick = () => {
        let id = document.getElementById("categoryid").value;
        let name = document.getElementById("categoryName").value;
        let newCategory = {
            "id": id,
            "name": name
        }
        console.log(newCategory);
        if (button.value == "Thêm") {
            console.log("Product");
            let url = root + "categories/";
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            }
            fetchAPI(url, options);
        } else {
            let url = root + "categories/" + index;
            let options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            }
            fetchAPI(url, options);
        }
        loadProducts();
    }
}
const deleteCategory = async (id) => {
    let url = root + "categories/" + id;
    let options = {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json',
        }
    };
    fetchAPI(url, options);
    loadProducts();
}
const startJsProducts = () => {
    loadProducts();
    handleButtonProduct();
}
const startJsCategories = () => {
    loadCategories();
    handleButtonCategory();
}