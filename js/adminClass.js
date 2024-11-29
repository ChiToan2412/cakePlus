import Products from "../models/ProductClass.js";
import Categories from "../models/CategoriesClass.js";
Products.loadProducts();
Categories.loadCategories();
Products.handleButtonProduct();
Categories.handleButtonCategory();
window.addEventListener("click", function(event){
    if(event.target.getAttribute("button-name")=="deleteProduct"){
        let id = event.target.getAttribute("product-id");
        Products.deleteProduct(id);
        Products.loadProducts();
    }
    if(event.target.getAttribute("button-name")=="editProduct"){
        let id = event.target.getAttribute("product-id");
        Products.handleButtonProduct(id);
        Products.loadProducts();
    }
    if(event.target.getAttribute("button-name")=="addProduct"){
        Products.handleButtonProduct();
        Products.loadProducts();
    }


    if(event.target.getAttribute("button-name")=="deleteCategory"){
        let id = event.target.getAttribute("Category-id");
        Categories.deleteCategory(id);
        Categories.loadCategories();
    }
    if(event.target.getAttribute("button-name")=="editCategory"){
        let id = event.target.getAttribute("Category-id");
        Categories.handleButtonCategory(id);
        Categories.loadCategories();
    }
    if(event.target.getAttribute("button-name")=="addCategory"){
        Categories.handleButtonCategory();
        Categories.loadCategories();
    }

})
