import { exec } from "../utility/util.js";

document.addEventListener("DOMContentLoaded", async (e) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("Id");

    const form = document.querySelector(".addVehicle");
    const select = document.querySelector(".form-control");
    const photo = document.querySelector(`#file`);
    const type = document.querySelector('[name="Type"]');
    const merk = document.querySelector("[name='Merk']");
    const maxWeight = document.querySelector("[name='Max_Weight']");
    const color = document.querySelector("[name='Color']");
    const year = document.querySelector("[name='Year']");
    const plat = document.querySelector("[name='Plat']");

    let userid = await exec("/DataUser");
    let dataKendaraan = await exec("/DataKendaraan")
    console.log(userid)
    let text = "";
    let idUser = null;

    for(const y of dataKendaraan) {
        if(y.Id == parseInt(id)){
            type.value = y.Type;
            merk.value = y.Merk;
            maxWeight.value = y.Max_Weight;
            color.value = y.Color;
            year.value = y.Year;
            plat.value = y.Plat;
            idUser = y.User_Id;
        }
    }

    for(const x of userid) {
        if(idUser == x.Id){
            select.innerHTML = `<option value="${x.Id}" default>${x.Id}: ${x.Nama}</option>`
        }
        if(x.Role === "driver"){
            text += `<option value="${x.Id}">${x.Id}: ${x.Nama}</option>`
        }
    }

    select.innerHTML += text;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const objectivies = Object.fromEntries(formData);
        console.log(objectivies);

        const dataPut = await exec(`/EditKendaraan/${id}`, formData, "PUT");
        console.log(dataPut)

        window.location.href = "vehicleManagement.html";
        
    });
})