import { exec } from "./utility/util.js"

document.addEventListener("DOMContentLoaded", async () => {
    const history = await exec("/DataHistory");
    console.log(history);

    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('Id');

    const container = document.querySelector(".container");
    let text = "";

    for(const x of history) {
        if(x.Client_Id === paramValue) {
            text += `
            <div class="details" data-info="${x.Id}">
                <div class="type">
                    <p>${x.Service_Type}</p>
                </div>
                <h2>ID: ${x.Order_Id}</h2>
                <p>${x.Tanggal_Ambil} | ${x.Time}</p>
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

            const historyOrder = await exec(`/DataHistoryWithHistoryID/${info}`);

            if(historyOrder === "Door to Door") {
                window.location.href = `historyShort.html?Id=${info}`;    
            } else {
                window.location.href = `historyLong.html?Id=${info}`;
            }
        });
    });


})