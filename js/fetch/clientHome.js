import { exec } from "../utility/util.js"

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('Id');

    localStorage.setItem("clientId", paramValue);
    const clientId = localStorage.getItem("clientId");
    console.log(clientId);

    const dataOrder = await exec("/DataOrder");
    console.log(dataOrder);

    const container = document.querySelector(".container");
    let text = "";

    for(const x of dataOrder) {
        if(x.Client_Id == paramValue) {
            text += `
            <div class="details" data-info="${x.Id}">
                <div class="type">
                    <p>${x.Service_Type}</p>
                </div>
                <h2>ID: ${x.Id}</h2>
                <p>${x.Tanggal_Masuk} / ${x.Tanggal_Ambil}</p>
                <p class="note">Note: ${x.Notes}</p>
                <table>
                    <tbody>
                        <tr>
                            <td>Items</td>
                            <td>Weights</td>
                            <td>Price</td>
                            <td>Amount Left</td>
                        </tr>
                        <tr>
                            <td>${x.Jumlah}</td>
                            <td>${x.Berat}<span>Kg</span></td>
                            <td>Rp - </td>
                            <td>Rp - </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            `
        }
    }

    container.innerHTML = text;

    const infoDivs = document.querySelectorAll('.details');

    infoDivs.forEach(infoDiv => {
        infoDiv.addEventListener('click', async function() {
            const info = this.getAttribute('data-info');

            const historyOrder = await exec(`/DataOrderWithID/${info}`);

            for(const x of historyOrder) {
                if(x.Service_Type === "Door to Door") {
                    console.log(x.Service_Type)
                    console.log("door to door")
                    window.location.href = `detailOrder_short.html?Id=${info}`;    
                } else {
                    console.log(x.Service_Type)
                    console.log("other")
                    window.location.href = `detailOrder_long.html?Id=${info}`;
                }
            }
        });
    });


})