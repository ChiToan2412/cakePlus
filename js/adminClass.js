import Products from "../models/ProductClass.js";
import Categories from "../models/CategoriesClass.js";
Products.loadProducts();
Categories.loadCategories();
let btn = document.getElementById("btnCategory")||document.getElementById("btn");
window.addEventListener("click", (event) => {
    let id = event.target.getAttribute("category-id");
    if (event.target.getAttribute("button-name") == "editCategory") {
        btn.value = "Cập nhật";
        let res = Categories.categoryById(id);
        res.then(result => {
            document.getElementById("categoryid").value = result.id;
            document.getElementById("categoryName").value = result.name;
        });
    }
    if (event.target.getAttribute("button-name") == "deleteCategory") {
        Categories.deleteCategory(id);
    }
});
btn.addEventListener("click", () => {
    let category = {
        id: document.getElementById("categoryid").value,
        name: document.getElementById("categoryName").value
    }
    if (btn.value == "Cập nhật") {
        Categories.editCategory(category.id, category);
    } else {
        Categories.addCategory(category);
    }
});


window.addEventListener("click", (event) => {
    let id = event.target.getAttribute("product-id");
    if (event.target.getAttribute("button-name") == "editProduct") {
        btn.value = "Cập nhật";
        let res = Products.productById(id);
        res.then(result => {
            document.getElementById("productId").value = result.id;
            document.getElementById("productName").value = result.name;
            document.getElementById("img").src = "../../public/img/"+result.image;
            document.getElementById("productPrice").value = result.price;
            document.getElementById("productDescription").value = result.description;
            document.getElementById("productCategory").value = result.category;
        });
    }
    if (event.target.getAttribute("button-name") == "deleteProduct") {
        Products.deleteProduct(id);
    }
});

btn.addEventListener("click", () => {
    let img = "";
            let addressImg = document.getElementById("productImage").value.split("\\");
            if (addressImg) {
                img = addressImg[addressImg.length - 1];
            }
    let product = {
        id: document.getElementById("productId").value,
        name: document.getElementById("productName").value,
        image: img,
        price: document.getElementById("productPrice").value,
        description: document.getElementById("productDescription").value,
        category: document.getElementById("productCategory").value
    }
    if (btn.value == "Cập nhật") {
        Products.editProduct(product.id, product);
    } else {
        Products.addProduct(product);
    }
});