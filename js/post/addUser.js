import { exec4 } from "../utility/util.js"

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.querySelector("#form-addUser");
    const role = document.querySelector('select[name="Role"]');
    const Workplace = document.querySelector('[name="Workplace"]');
    // const birth = document.querySelector('[name="Tanggal_Lahir"]');
    const photo = document.querySelector('#photo')
    
    role.addEventListener("change", () => {
        const selectedRole = role.value;
        console.log("Selected Role (on change):", selectedRole);

        if (selectedRole === "client") {
            Workplace.disabled = true;
        } else {
            Workplace.disabled = false;
        }
    });

    photo.addEventListener("change", () => {
        var label = document.getElementById('display');
        
        // Check if a file is selected
        if (photo.files.length > 0) {
            // Display the selected file name in the label
            label.innerHTML = 'Selected: ' + photo.files[0].name;
        } else {
            // If no file is selected, revert to the default label
            label.innerHTML = 'Upload Photo';
        }
    })
    
    // Add the "submit" event listener only once, outside the "change" event listener
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const selectedRole = role.value;
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        console.log(object)
        
        if (selectedRole === "client") {
            formData.delete("Role"); // Remove the "Role" field
            formData.delete("Workplace"); // Remove the "Workplace" field
            formData.delete("Foto");

            const object1 = Object.fromEntries(formData);
            console.log(object1)

            let data = await exec4("/TambahClient", formData, "POST");
            console.log(data);

            const formDataPhoto = new FormData(form);
            formDataPhoto.delete("Role"); // Remove the "Role" field
            formDataPhoto.delete("Workplace"); // Remove the "Workplace" field
            formDataPhoto.delete("Tanggal_Lahir");
            formDataPhoto.delete("Nama");
            formDataPhoto.delete("Phone_Number");
            formDataPhoto.delete("Email");
            formDataPhoto.delete("Password");

            const response = await fetch(`http://116.68.252.201:1945/uploadFoto/id=${data}&folder=client`, {
                method: 'POST',
                body: formDataPhoto
            });

            const result = await response.json();
            console.log(result);

        } else {
            // formData.delete("Tanggal_Lahir");
            formData.delete("Foto");

            const dataObject = Object.fromEntries(formData);
            console.log(dataObject)

            let data = await exec4("/TambahUser", formData, "POST");
            console.log(data);

            const formDataPhoto = new FormData(photo);
            formDataPhoto.delete("Role"); // Remove the "Role" field
            formDataPhoto.delete("Workplace"); // Remove the "Workplace" field
            formDataPhoto.delete("Tanggal_Lahir");
            formDataPhoto.delete("Nama");
            formDataPhoto.delete("Phone_Number");
            formDataPhoto.delete("Email");
            formDataPhoto.delete("Password");

            const response = await fetch(`http://116.68.252.201:1945/uploadFoto/${data}?id=${data}&folder=user`, {
                method: 'POST',
                body: formDataPhoto
            });

            const result = await response.json();
            console.log(result);
        }
    });
});
