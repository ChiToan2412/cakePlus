const root = "http://localhost:3000/";
class Users {
    static register(data) {
        let url = root + "users";
        let option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        return fetch(url, option);
    }
    static async getAllUsers() {
        let url = root + "users";
        let response = await fetch(url);
        return await response.json();
    }
}
export default Users;