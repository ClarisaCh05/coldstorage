import { exec } from "../utility/util.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Page 2 - Retrieve data from localStorage
    const userId = localStorage.getItem('userId');

    // Use the retrieved data
    console.log('User: ' + userId);

  const home = document.querySelector(".home");
  home.addEventListener("click", () => {
    window.location.href = "home.html";
  })

    const nama = document.querySelector(".name");
    const tanggal_lahir = document.querySelector(".dateOfBirth");
    const role = document.querySelector(".role");
    const nomor_telepon = document.querySelector(".phoneNum");
    const email = document.querySelector(".email");
    const alamat = document.querySelector(".address");
    const foto = document.querySelector(".foto");
    const btnEdit = document.querySelector(".edit")

    const data = await exec("/DataUser");

    for(const x of data) {
        if(x.Id == userId) {
            nama.innerHTML = x.Nama;
            tanggal_lahir.innerHTML = x.Tanggal_Lahir;
            role.innerHTML = x.Role;
            nomor_telepon.innerHTML = x.Phone_Number;
            email.innerHTML = x.Email;
            alamat.innerHTML = x.Workplace;
        }
    }

    const apiUrl = `http://116.68.252.201:1945/getPhoto?folder=user&id=${userId}`;

    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then(blob => {
      // Create an object URL from the blob
      const imageUrl = URL.createObjectURL(blob);
  
      // Create and append an img element for the photo
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      foto.appendChild(imgElement);
  
      // Optionally, revoke the object URL to free up resources
      // URL.revokeObjectURL(imageUrl);
    })
    .catch(error => console.error('Error fetching photo:', error));


    btnEdit.addEventListener("click", () => {
      window.location.href = `editProfile.html?Id=${userId}`
    })

})