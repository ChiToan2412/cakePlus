const root = "http://localhost:3000/";
const fetchAPI = async (url, option) => {
    let response = await fetch(url, option);
    return await response.json();
}
class Products{
    static loadProducts = async () => {
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
                    <button class="btn btn-sm btn-warning" product-id="${item.id}" button-name="editProduct">Sửa</button>
                    <button class="btn btn-sm btn-danger" product-id="${item.id}" button-name="deleteProduct">Xóa</button>
                    </td>
                </tr>
                `;
        }).join("");
    }
    
    
    static addProduct = async (data) => {
        let url = root + "products/";
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(url, options);
    }
    static editProduct = async (id, data) => {
        let url = root + "products/" + id;
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(url, options);
    }
    
    
    static deleteProduct = async (id) => {
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
    static productById = async (id) => {
        let url = root + "products/" + id;
        let response = await fetch(url);
        return await response.json();
    }
}
export default Products;