import { exec } from "./utility/util.js";

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const info = urlParams.get('Id');

    // Use the 'info' variable as needed on the new page
    console.log(`Received info: ${info}`);

    const data = await exec(`/DataOrderWithID/${info}`);

    const orderId = document.querySelector(".order_id");
    const tanggalMasuk = document.querySelector(".dateTime");
    const notes = document.querySelector(".note");
    const clientName = document.querySelector("#client_name");
    const eta = document.querySelector('#eta');
    const items = document.querySelector(".itemsList");
    const jumlah = document.querySelector(".jumlah");
    const gedung = document.querySelector(".gedung");
    const indexRow = document.querySelector(".index");
    const shopRow = document.querySelector(".shopName");
    const addressRow = document.querySelector(".address");
    const dateRow = document.querySelector(".date");
    const quantitiesRow = document.querySelector(".quantities");
    const timeRow = document.querySelector(".time");
    const weight = document.querySelector(".berat");
    const price = document.querySelector(".paid");
    const rentDriver = document.querySelector(".rentDriver");
    const driver = document.querySelector(".driver");
    const plat = document.querySelector(".plat");
    const serviceType = document.querySelector(".serviceType")

    for(const x of data) {
        orderId.innerHTML = `ID: ${x.Id}`;
        const data2 = await exec("/DataDistribute")
        for(const distribute of data2) {
            if (x.Id == distribute.Order_Id) {
                tanggalMasuk.innerHTML = `${x.Tanggal_Masuk} | ${distribute.Time}`;
                notes.innerHTML = `Note: ${x.Notes}`;
                
                const client = await exec(`/DataClientWithID/${x.Client_Id}`)
                for(const namaClient of client) {
                    clientName.innerHTML = `Client: ${namaClient.Nama}`;
                }

                eta.innerHTML = `Arrival: ${x.Tanggal_Ambil}`;
        
                let itemString = [];
                let item = x.Nama_Item;
                const splitItem = item.split(',');
                itemString.push(...splitItem);
                let text = "";
        
                for(const y of itemString) {
                    text += `<p>${y}</p>`
                }
        
                items.innerHTML = text;
        
                let jumlahString = [];
                let jumlahItem = x.Jumlah;
                const splitJumlah = jumlahItem.split(',');
                jumlahString.push(...splitJumlah);
                let total = 0;
                let text1 = "";
                let text7 = "";
        
                for(const y of jumlahString) {
                    let temp = parseInt(y)
                    total += temp;
                    text1 += `<p>${total}</p>`;
                    text7 += `<td>${y}</td>`
                }
        
                jumlah.innerHTML = text1;
                quantitiesRow.innerHTML = `<th>Qts</th>` + text7
        
                let gedungString = [];
                let aisleString = [];
                let placeString = [];
        
                let building = x.Gedung;
                let lorong = x.Aisle;
                let tempat = x.Place;
        
                const splitGedung = building.split(',');
                const splitLorong = lorong.split(',');
                const splitTempat = tempat.split(',');
        
                gedungString.push(...splitGedung);
                aisleString.push(...splitLorong);
                placeString.push(...splitTempat);
        
                let text2 = "";
        
                for(const x of gedungString) {
                    for(const y of aisleString) {
                        for(const z of placeString) {
                            text2 += `<p>${x}, ${y}, ${z}</p>`
                        }
                    }
                }
        
                gedung.innerHTML = text2;
        
                let tokoString = [];
                let toko = distribute.Nama_Toko;
                const splitToko = toko.split(',');
                tokoString.push(...splitToko);
                
                let text3 = "";
                let text4 = ""
                let index = tokoString.length; // Initialize index with the length of tokoString
                
                for (const location of tokoString) {
                    text3 += `<td>Location ${index}</td>`;
                    text4 += `<td>${location}</td>`
                    index--; // Decrement the index for each location
                }
                
                indexRow.innerHTML = `<th></th>` + text3;
                shopRow.innerHTML = `<th>Name</th>` + text4;
        
                let addressString = [];
                let alamat = distribute.Address;
                const splitAlamat = alamat.split(',');
                addressString.push(...splitAlamat);
        
                let text5 ="";
        
                for (const address of addressString) {
                    text5 += `<td>${address}</td>`
                }
        
                addressRow.innerHTML = `<th>Address</th>`+ text5
                
                let dateString = [];
                let tanggal = distribute.Tanggal_PickUp;
                const splitTanggal = tanggal.split(',');
                dateString.push(...splitTanggal);
        
                let text6 ="";
        
                for (const pickUp of dateString) {
                    text6 += `<td>${pickUp}</td>`
                }
        
                dateRow.innerHTML = `<th>Date</th>`+ text6;
        
                let timeString = [];
                let waktu = distribute.Time;
                const splitTime = waktu.split(',');
                timeString.push(...splitTime);
        
                let text8 ="";
        
                for (const waktu of timeString) {
                    text8 += `<td>${waktu}</td>`
                }
        
                timeRow.innerHTML = `<th>Time</th>`+ text8
        
                let beratString = [];
                let beratItem = x.Berat;
                const splitBerat = beratItem.split(',');
                beratString.push(...splitBerat);
                let total1 = 0;
                let text9 = "";
        
                for(const y of beratString) {
                    let temp = parseInt(y)
                    total1 += temp;
                    text9 += total1;
                }
        
                weight.innerHTML = text9;
        
                price.innerHTML = " - ";

                rentDriver.innerHTML = x.Rent_Driver;

                const driverData = await exec(`/DataUser`)
                for(const supir of driverData){
                    if(x.User_Id == supir.Id){
                        driver.innerHTML = supir.Nama;
                    }
                }

                const vehicleData = await exec("/DataKendaraan")
                for(const vehicle of vehicleData){
                    if(x.Kendaraan_Id == vehicle.Id) {
                        plat.innerHTML = vehicle.Plat;
                    }
                }
            }
        }

        serviceType.innerHTML = x.Service_Type
    }

})