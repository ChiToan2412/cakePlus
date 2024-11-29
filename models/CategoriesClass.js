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
    static handleButtonCategory = async (index = -1) => {
        let button = document.getElementById("btnCategory");
        let res = await fetch(root + "categories");
        let categories = await res.json();
        let category;
        categories.forEach(element => {
                if (element.id == index) {
                    category = element;
                }
        });
        if (index != -1) {
            console.log(category);
            document.getElementById("categoryid").value = category.id;
            document.getElementById("categoryName").value = category.name;
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
}
export default Categories;