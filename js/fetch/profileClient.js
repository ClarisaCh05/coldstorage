import { exec } from "../utility/util.js";

document.addEventListener("DOMContentLoaded", async () => {
  // const urlParams = new URLSearchParams(window.location.search);
  // const paramValue = urlParams.get('Id');

  const userId = localStorage.getItem("clientId")
  console.log(userId);

  console.log('User: ' + userId);

  const icon = document.querySelector(".home");
  console.log(icon)
  icon.addEventListener("click", () => {
    window.location.href = "home.html"
  })

  const nama = document.querySelector(".name");
  const tanggal_lahir = document.querySelector(".dateOfBirth");
  const nomor_telepon = document.querySelector(".phoneNum");
  const email = document.querySelector(".email");
  const foto = document.querySelector(".foto")

  const data = await exec(`/DataClientWithID/${userId}`);

  for(const x of data) {
      nama.innerHTML = x.Nama;
      tanggal_lahir.innerHTML = x.Tanggal_Lahir;
      nomor_telepon.innerHTML = x.Phone_Number;
      email.innerHTML = x.Email;
  }

  const apiUrl = `http://116.68.252.201:1945/getPhoto?folder=client&id=${userId}`;

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
})