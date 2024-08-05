import { exec, searchUser } from "./utility/util.js";

document.addEventListener("DOMContentLoaded", async () => {
    let tbody = document.querySelector("tbody");
    let htmlText = "";
    let index = 0;
    try {
        let data = await exec("/DataUser");
        console.log(data);
        for(const x of data){
            index += 1;
            htmlText += `
                <tr data-id=${x.Id}>
                    <td>${index}</td>
                    <td>${x.Nama}</td>
                    <td>${x.Tanggal_Lahir}a</td>
                    <td>${x.Id}</td>
                    <td>${x.Workplace}</td>
                    <td>${x.Role}</td>
                    <td class="btn-fields">
                        <a href="editProfile.html?Id=${x.Id}">
                            <button type="button" id="editUser"><i class="fas fa-pen"></i>Edit</button>
                        </a>
                        <button type="button" class="delete"><i class="fas fa-times"></i>Delete</button>
                    </td>
                </tr>
            `
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

        searchUser()
    } catch(error) {
        console.error(error)
    }
})

