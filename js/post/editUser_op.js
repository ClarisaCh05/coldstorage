import { exec } from "../utility/util.js"

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("Id");

    const form = document.querySelector("#form-addUser");
    const role = document.querySelector('select[name="Role"]');
    const Workplace = document.querySelector('[name="Workplace"]');
    const birth = document.querySelector('[name="Tanggal_Lahir"]');
    const nama = document.querySelector('[name="Nama"]');
    const phone = document.querySelector('[name="Phone_Number"]');
    const email = document.querySelector('[name="Email"]');

    const user = await exec("/DataUser")

    for(const x of user) {
        if(x.Id == id) {
            nama.value = x.Nama;
            role.innerHTML += `<option default>${x.Role}</option>`;
            Workplace.value = x.Workplace;
            birth.value = x.Tanggal_Lahir;
            phone.value = x.Phone_Number;
            email.value = x.Email;
        }
    }
    
    // Add the "submit" event listener only once, outside the "change" event listener
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const objectivies = Object.fromEntries(formData);
        console.log(objectivies);

        for(const x of user) {
            if(x.Id == id) {
                formData.append("Password", x.Password);
            }
        }

        const dataPut = await exec(`/EditUser/${id}`, formData, "PUT");
        console.log(dataPut)

        window.location.href = "userManagement.html";
        
    });
});
