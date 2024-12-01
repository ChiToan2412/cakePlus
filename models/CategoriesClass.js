const root = "http://localhost:3000/";
const fetchAPI = async (url, option) => {
    let response = await fetch(url, option);
    return await response.json();
}
class Categories{
    static loadCategories = async () => {
        let response = await fetch(root + "categories");
        let categories = await response.json();
        document.getElementById("allCategories").innerHTML = categories.map(item => {
            return `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>
                    <button class="btn btn-sm btn-warning" category-id="${item.id}" button-name="editCategory">Sửa</button>
                    <button class="btn btn-sm btn-danger" category-id="${item.id}" button-name="deleteCategory">Xóa</button>
                    </td>
                </tr>
            `;
        }).join("");
    }
    static addCategory = async (data) => {
        let url = root + "categories/";
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(url, options);
    }
    static editCategory = async (id, data) => {
        let url = root + "categories/" + id;
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(url, options);
    }
    static deleteCategory = async (id) => {
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
    static categoryById = async (id) => {
        let url = root + "categories/" + id;
        let response = await fetch(url);
        return await response.json();
    }
}
export default Categories;