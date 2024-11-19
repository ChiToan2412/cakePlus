const root = "http://localhost:3000/";
const fetchAPI = async (url, option) =>{
    let response = await fetch(url, option);
    return await response.json();
}
const loadProducts = async () => {
    let response = await fetch(root + "products");
    let products = await response.json();

    document.getElementById("allProduct").innerHTML = products.map((item)=>{
        let price = item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        return `
            <tr>
                <td>${item.id}</td>
                <td><img src="../public/img/${item.image}" alt="product-image" class="img-thumbnail" width="75px" height="75px"></td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>${item.category}</td>
                <td>${price}</td>
                <td>
                <button class="btn btn-sm btn-warning" onclick="handleButtonProduct(${item.id})">Sửa</button>
                <button class="btn btn-sm btn-danger">Xóa</button>
                </td>
            </tr>
            `;
    }).join("");
}
const loadCategories = async () => {
    let response = await fetch(root + "categories");
    let categories = await response.json();
    document.getElementById("allCategories").innerHTML = categories.map(item =>{
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>
                <button class="btn btn-sm btn-warning">Sửa</button>
                <button class="btn btn-sm btn-danger">Xóa</button>
                </td>
            </tr>
        `;
    }).join("");
}

const handleButtonProduct = async (index = -1) => {
    let button = document.getElementById("btn");
    let res = await fetch(root + "products");
    let products = await res.json();
    if(index != -1){  
        document.getElementById("productId").value = products[index-1].id;
        document.getElementById("productName").value = products[index-1].name;
        document.getElementById("productPrice").value = products[index-1].price;
        document.getElementById("productCategory").value = products[index-1].category;
        document.getElementById("productDescription").value = products[index-1].description;
        document.getElementById("img").src = "../public/img/"+products[index-1].image;
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
        if(addressImg){
            img = addressImg[addressImg.length-1];
        }
        let newProduct = {
            "id": id,
            "name": name,
            "price": price,
            "category": category,
            "description": description,
            "image": img
        } 
        if(button.value == "AddProduct"){
            let url = root + "products";
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            }
            fetchAPI(url, options);
        }else{
            
        }
    }
}
const startJsProducts = () => {
    loadProducts();
    handleButtonProduct();
}
const startJsCategories = () => {
    loadCategories();
}