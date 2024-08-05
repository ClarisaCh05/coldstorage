import { exec, deleteStorage } from "../utility/util.js";

document.addEventListener("DOMContentLoaded", async () => {
    let detail1 = document.querySelector(".detail1");
    let detail2 = document.querySelector(".detail2");
    let paymentLabel = document.querySelector(".payment-label")
    let driver = document.querySelector(".driver");

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let htmlText1 = "";
    let htmlText2 = "";
    let htmlText3 = "";
    let htmlText4 = "";

    try {
        let data = await exec(`/DataOrderWithID/${id}`);
        for(const x of data){
            let data2 = await exec(`/DataClientWithID/${x.Client_Id}`)
            let data3 = await exec(`/DataPembayaranWithORDERID/${x.Id}`)
            for(const { Nama } of data2)
            htmlText1 += `
            <div>
                <p>Invoice</p>
                <label>${x.Id}</label>
            </div>
            <div>
                <p>Date Reservation</p>
                <label>${x.Tanggal_Masuk}</label>
            </div>
            <div>
                <p>Customer</p>
                <label>${Nama}</label>
            </div>
            <div>
                <p>Service</p>
                <label>${x.Service_Type}</label>
            </div>
            `

            htmlText2 += `
                <span>Location</span><a href="#">Edit Location</a>
                <div class="loc-detail">
                    <label>${x.Gedung}</label>
                    <label>${x.Aisle}</label>
                    <label>${x.Place}</label>
                </div>
                <p>Contract</p>
                <label>${x.Tanggal_Masuk} - ${x.Tanggal_Ambil}</label>
            `

            for(const { Jenis, Jumlah } of data3)

            htmlText3 += `
                <label>${Jenis}</label>
                <label>${Jumlah}</label>
            `

            htmlText4 += `
                <h2>Driver</h2>
                <div>
                    <p>Rent Driver</p>
                    <label>${x.Rent_Driver}</label>
                </div>
                <p>Date to Deliver</p>
                <label>${x.Tanggal_Ambil}</label>
            `
        }

        detail1.innerHTML = htmlText1;
        detail2.innerHTML = htmlText2;
        paymentLabel.innerHTML = htmlText3;
        driver.innerHTML = htmlText4;

    } catch (error) {
        console.error(error)
    }

    deleteStorage()

})