import { exec } from "../utility/util.js";

document.addEventListener("DOMContentLoaded", async () => {
    let header = document.querySelector(".header");
    let container = document.querySelector(".container");
    let serviceType = document.querySelector(".serviceType");

    const urlParams = new URLSearchParams(window.location.search);
    const info = urlParams.get('Id');

    let htmlText = "";
    let htmlText2 = "";

    try {
        console.log(info)
        let data = await exec(`/DataOrderWithID/${info}`);
        console.log(data)

        for(const x of data) {
            console.log(data)

            serviceType.innerHTML = x.Service_Type
            
            htmlText += `
            <h2>ID: ${x.Id}</h2>
            <p>${x.Tanggal_Masuk}</p>
            <p class="note">Note: ${x.Notes}</p>
            `

            let dataClient = await exec(`/DataClientWithID/${x.Client_Id}`)

            for(const y of dataClient) {
                htmlText2 += `
                <p class="ta">Client: ${y.Nama}</p>
                <p class="ta">Arrival: ${x.Tanggal_Ambil}</p>
                <div class="items">
                    <p>${x.Nama_Item}</p>
                    <p>${x.Jumlah}</p>
                    <p>${x.Gedung}, ${x.Aisle}, ${x.Place}</p>
                    <label>${x.Berat}</label><span>Kg</span>
                    <p> - </p>
                    <i class="far fa-clone"></i><label>-</label>
                </div>
            `
            }
        }

        header.innerHTML = htmlText;
        container.innerHTML = htmlText2;

    } catch(error) {
        console.error(error)
    }
})