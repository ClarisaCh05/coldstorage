import { exec, deleteStorage, search } from "./utility/util.js";

document.addEventListener("DOMContentLoaded", async () => {
    let tbody = document.querySelector("tbody");
    let table = document.querySelector("#MyTable");
    let profileLink = document.querySelector(".profilePage");
    console.log(profileLink);
    let htmlText = "";

   const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('Id');

    localStorage.setItem('userId', paramValue);

    const userId = localStorage.getItem("userId")
    console.log(userId); 

    try {
        let data = await exec("/DataOrder");
        console.log(data);
        for(const x of data){
            let data2 = await exec(`/DataClientWithID/${x.Client_Id}`)
            let data3 = await exec(`/DataPembayaranWithORDERID/${x.Id}`)

            for (const { Nama } of data2) {
                for (const { Jenis, Jumlah, Jatuh_Tempo } of data3) {
                    htmlText += `
                        <tr data-id="${x.Id}">
                            <td>${x.Id}</td>
                            <td>${x.Tanggal_Masuk} / ${x.Tanggal_Ambil}</td>
                            <td class="name">${Nama}</td>
                            <td>${x.Service_Type}</td>
                            <td>${Jenis}</td>
                            <td>${Jumlah}</td>
                            <td>${Jatuh_Tempo}</td>
                            <td>${x.Rent_Driver}</td>
                        </tr>
                    `;
                }
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

        search()
        
    } catch(error) {
        console.error(error)
    }

    deleteStorage()
})