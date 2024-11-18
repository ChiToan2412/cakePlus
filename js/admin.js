const root = "http://localhost:3000/";
const fetchAPI = async (url, option) =>{
    let response = await fetch(url, option);
    return await response.json();
}
const loadProducts = async () => {
    let response = await fetch(root + "products");
    let products = await response.json();
    console.log(products);
    document.getElementById("allProduct").innerHTML = products.map((item)=>{
        return `
            <tr>
                <td>1</td>
                <td><img src="https://via.placeholder.com/50" alt="product-image" class="img-thumbnail"></td>
                <td>Bánh Chocolate</td>
                <td>Bánh mềm thơm, vị chocolate đậm đà.</td>
                <td>Bánh ngọt</td>
                <td>100,000 VND</td>
                <td>
                <button class="btn btn-sm btn-warning">Sửa</button>
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
const startJs = () => {
    loadProducts();
    loadCategories();
}