const root = "http://localhost:3000/";
const fetchAPI = async (url, option) =>{
    let response = await fetch(url, option);
    return await response.json();
}
const loadProducts = async () => {
    let response = await fetch(root + "products");
    let products = await response.json();

    document.getElementById("allProduct").innerHTML = products.map((item)=>{
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
    let product = products.filter((item)=>item.id == index);
    if(index != -1){  
        document.getElementById("productId").value = product[0].id;
        document.getElementById("productName").value = product[0].name;
        document.getElementById("productPrice").value = product[0].price;
        document.getElementById("productCategory").value = product[0].category;
        document.getElementById("productDescription").value = product[0].description;
        document.getElementById("img").src = "../public/img/"+product[0].image;
        // console.log(products);
        console.log(product);
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
        console.log(newProduct);
        if(button.value == "AddProduct"){
            let url = root + "products/";
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            }
            fetchAPI(url, options);
        }else{
            
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
const deleteProduct = async(id) => {
    let url = root + "products/" + id;
    let options = {
        method: 'DELETE',
        headers:{
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
}