const root = "http://localhost:3000/";
const fetchAPI = async (url, option) =>{
    let response = await fetch(url, option);
    return await response.json();
}
const loadProducts = async () => {
    let response = await fetch(root + "products");
    let products = await response.json();
    document.getElementById("allProduct").innerHTML = products.map((item)=>{
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
    document.getElementById("categories").innerHTML = categories.map(item =>{
        return `
            <li><a href="index.html?idCategory=${item.id}">${item.name}</a></li>
        `;
    }).join("")+"<li><a href='index.html'>Tất cả sản phẩm</a></li>";
}
const loadProductsByCategory = async (id) => {
    let response = await fetch(root + "products");
    let products = await response.json();
    let productsByCategory = products.filter((item)=>item.category == id);
    document.getElementById("allProduct").innerHTML = productsByCategory.map((item)=>{
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
    if(urlParams.has("idCategory")){
        loadProductsByCategory(urlParams.get("idCategory"));
    }else{
        loadProducts();
    }
}                     
const loadData = ()=>{
    getParamUrl();
    loadCategories();
}