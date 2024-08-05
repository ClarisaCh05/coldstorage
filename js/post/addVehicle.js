import { exec3, exec } from "../utility/util.js";

document.addEventListener("DOMContentLoaded", async (e) => {
    const form = document.querySelector(".addVehicle");
    const select = document.querySelector(".form-control");
    const photo = document.querySelector(`#file`)

    // let userid = await exec("/DataUser");
    // console.log(userid)
    // let text = "";

    // for(const x of userid) {
    //     if(x.Role === "driver"){
    //         text += `<option value="${x.Id}">${x.Id}: ${x.Nama}</option>`
    //         text += `<option>1: Wendy</option>`
    //     }
    // }

    select.innerHTML = `<option>1: Wendy</option>`;

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

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const object = Object.entries(formData);
        console.log(object);

        let data = await exec3("/TambahKendaraan", formData, "POST");
        console.log(data);

        const formDataPhoto = new FormData(photo);

        formDataPhoto.delete("Type"); // Remove the "Role" field
        formDataPhoto.delete("Merk"); // Remove the "Workplace" field
        formDataPhoto.delete("Color");
        formDataPhoto.delete("Plat");
        formDataPhoto.delete("User_Id");
        formDataPhoto.delete("Max_Weight");
        formDataPhoto.delete("Year");

        const response = await fetch(`http://116.68.252.201:1945/uploadFoto/id=${data}&folder=kendaraan`, {
            method: 'POST',
            body: formDataPhoto
        });

        const result = await response.json();
        console.log(result);

    })
})