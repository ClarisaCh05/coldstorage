export const config = {
    api: 'http://116.68.252.201:1945'
}

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
}

export async function exec (url, data = null , method = 'GET') {

    const requsetInit = {
        method: method,
        headers: headers
    }

    if (method === 'GET') {
        const queryParams = new URLSearchParams(data);
        if (!url.includes('?')) url += `?${queryParams.toString()}`
    }

    if (method === 'POST') {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value.toString())
            console.log("formdata:",formData)
        }

        requsetInit.body = formData.toString();
        console.log("formdata:",formData)
    }

    if(method === 'PUT') {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value.toString())
            console.log("formdata:",formData)
        }

        requsetInit.body = formData.toString();
        console.log("formdata:",formData)
    }

    const request = new Request(config.api + url, requsetInit);

    try {
        let response = await fetch(request);

        // Check if the response status is OK (HTTP 200)
        if (!response.ok) {
            let errorData = await response.json();
            console.error(`Server error: `, errorData.message);
            return errorData;
        } else {
            // Successful response
            let responseData = await response.json();
            console.log("response", response);
        
            if (method === 'GET') {
                if (responseData.data === null) responseData.data = [];
                    return responseData.data;
            } else if (method === 'POST') {
                // Check if the response contains getIdLast
                if (responseData.data && responseData.data.getIdLast !== undefined) {
                    return responseData.data.ID;
                } else {
                    return responseData.data.ID;
                }
            } else if (method === 'PUT') {
                if (responseData.data && responseData.data.getIdLast !== undefined) {
                    return responseData.data.ID;
                } else {
                    return responseData.data.ID;
                }
            }
        }

    }catch(error) {
        console.error("error:", error)
        return error.toString();
    }
}

export async function exec3 (url, data = null , method = 'GET') {

    const requsetInit = {
        method: method,
        headers: headers
    }

    if (method === 'GET') {
        const queryParams = new URLSearchParams(data);
        if (!url.includes('?')) url += `?${queryParams.toString()}`
    }

    if (method === 'POST') {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value.toString())
            console.log("formdata:",formData)
        }

        requsetInit.body = formData.toString();
        console.log("formdata:",formData)
    }

    const request = new Request(config.api + url, requsetInit);

    try {
        let response = await fetch(request);

        // Check if the response status is OK (HTTP 200)
        if (!response.ok) {
            let errorData = await response.json();
            console.error(`Server error: `, errorData.message);
            return errorData;
        } else {
            // Successful response
            let responseData = await response.json();
            console.log("response", response);
        
            if (method === 'GET') {
                if (responseData.data === null) responseData.data = [];
                    return responseData.data;
            } else if (method === 'POST') {
                // Check if the response contains getIdLast
                if (responseData.data && responseData.data.getIdLast !== undefined) {
                    return responseData.message;
                } else {
                    return responseData.id;
                }
            }
        }

    }catch(error) {
        console.error("error:", error)
        return error.toString();
    }
}

export async function exec4(url, data = null , method = 'GET') {

    const requsetInit = {
        method: method,
        headers: headers
    }

    if (method === 'GET') {
        const queryParams = new URLSearchParams(data);
        if (!url.includes('?')) url += `?${queryParams.toString()}`
    }

    if (method === 'POST') {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value.toString())
            console.log("formdata:",formData)
        }

        requsetInit.body = formData.toString();
        console.log("formdata:",formData)
    }

    const request = new Request(config.api + url, requsetInit);

    try {
        let response = await fetch(request);

        // Check if the response status is OK (HTTP 200)
        if (!response.ok) {
            let errorData = await response.json();
            console.error(`Server error: `, errorData.message);
            return errorData;
        } else {
            // Successful response
            let responseData = await response.json();
            console.log("response", response);
        
            if (method === 'GET') {
                if (responseData.data === null) responseData.data = [];
                    return responseData.data;
            } else if (method === 'POST') {
                // Check if the response contains getIdLast
                if (responseData.data && responseData.data.getIdLast !== undefined) {
                    return responseData.data.getIdLast;
                } else {
                    return responseData.data.getIdLast;
                }
            }
        }

    }catch(error) {
        console.error("error:", error)
        return error.toString();
    }
}

export function deleteStorage() {
    document.addEventListener("DOMContentLoaded", () => {
        const logout = document.querySelector(".profile");
        logout.addEventListener("click", () => {
            localStorage.clear();
        })
    })
}

export async function search() {
    const apiUrl = 'http://116.68.252.201:1945/DataOrder';
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const search = document.querySelector("#search");
        search.addEventListener("keydown", async function ({ target, key }) {
            if(key !== "Enter") return;
            const keyword = target.value;
            const result = data.data.filter((x) => 
                x.Id.includes(keyword))

            console.log(result)

            let tbody = document.querySelector("tbody");
            let table = document.querySelector("#MyTable");
            let htmlText = "";

            for (var i = 0; i < result.length; i++) {
                let data2 = await exec(`/DataClientWithID/${result[i].Client_Id}`)
                let data3 = await exec(`/DataPembayaranWithORDERID/${result[i].Id}`)

                for (const { Nama } of data2) {
                    for (const { Jenis, Jumlah, Jatuh_Tempo } of data3) {
                        htmlText += `
                            <tr data-id="${result[i].Id}">
                                <td>${result[i].Id}</td>
                                <td>${result[i].Tanggal_Masuk} / ${result[i].Tanggal_Ambil}</td>
                                <td class="name">${Nama}</td>
                                <td>${result[i].Service_Type}</td>
                                <td>${Jenis}</td>
                                <td>${Jumlah}</td>
                                <td>${Jatuh_Tempo}</td>
                                <td>${result[i].Rent_Driver}</td>
                            </tr>
                        `;
                    }
                }

                tbody.innerHTML = htmlText;
                table.addEventListener("click", (event) => {
                    const row = event.target.closest("tr");
            
                    if (row) {
                        // Get the ID from the data-id attribute of the row
                        const id = row.getAttribute("data-id");
            
                        // Redirect to the next page with the ID as a query parameter
                        window.location.href = `orderDetail.html?id=${id}`;
                    }
                })
            }
        })
    })
}

export async function searchUser() {
    const apiUrl = 'http://116.68.252.201:1945/DataUser';
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const search = document.querySelector("#search");
        search.addEventListener("keydown", async function ({ target, key }) {
            if(key !== "Enter") return;
            const keyword = target.value;
            const result = data.data.filter((x) => 
                x.Nama.includes(keyword) + String(x.Id).includes(keyword) + x.Role.includes(keyword) +
                x.Workplace.includes(keyword))

            console.log(result)

            let tbody = document.querySelector("tbody");
            let htmlText = "";
            let index = 0;

            for (var i = 0; i < result.length; i++) {
                index += 1;
                htmlText += `
                    <tr data-id=${result[i].Id}>
                    <td>${index}</td>
                    <td>${result[i].Nama}</td>
                    <td>${result[i].Tanggal_Lahir}</td>
                    <td>${result[i].Id}</td>
                    <td>${result[i].Workplace}</td>
                    <td>${result[i].Role}</td>
                    <td class="btn-fields">
                        <a href="editProfile.html?Id=${result[i].Id}">
                            <button type="button" id="editUser"><i class="fas fa-pen"></i>Edit</button>
                        </a>
                        <button type="button" class="delete"><i class="fas fa-times"></i>Delete</button>
                    </td>
                </tr>
                `;
            }

            tbody.innerHTML = htmlText;
            document.addEventListener('click', function (event) {
                if (event.target.classList.contains('delete')) {
                    // The click event is on a delete button
                    const userIdToDelete = event.target.getAttribute('data-id');
            
                    // Now you can use userIdToDelete to perform the delete operation
                    // For example, you might want to send an AJAX request to the server to delete the user
            
                    // Sample AJAX request (using fetch)
                    fetch(`/HapusUser/${userIdToDelete}`, {
                        method: 'DELETE',
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Handle success response from the server
                        console.log(`User with ID ${userIdToDelete} deleted successfully`);
                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error deleting user:', error);
                    });
                }
            });
        })
    })
}