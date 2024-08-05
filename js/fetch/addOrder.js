import { exec } from "../utility/util.js";

export async function fetchClient() {
    document.addEventListener("DOMContentLoaded", async () => {
        let clientName = document.querySelector("#client_name");
        let mobilePhone = document.querySelector('#Mobile_Phone');
        let text = "";
    
        try {
            let client = await exec("/DataClient");
    
            for(const { Nama, Id } of client) {
                text += `
                <option value="${Id}">${Id} - ${Nama}</option>`
            }
    
            clientName.innerHTML = `<option default></option>` + text;
    
            clientName.addEventListener("change", async () => {
                let idClient = clientName.value;
                console.log(idClient);
                let mobile_phone = await exec(`/DataClientWithID/${idClient}`)
                for(const { Phone_Number } of mobile_phone ){
                    console.log(Phone_Number)
                    mobilePhone.value = Phone_Number;
                }
            })
    
        } catch (error) {
            console.error(error)
        }
    })
}

export async function fetchDriver() {
    let user_idInput = document.querySelector('[name="User_Id"]');
    let text = "";

    try {
        let driver = await exec ("/DataUser");

        for(const x of driver) {
            if(x.Role === "driver"){
                text += `<option value="${x.Id}">${x.Id} - ${x.Nama}</option>`
            }
        }

        user_idInput.innerHTML = text

    }catch(error){
        console.error(error)
    }
}

export async function fetchKendaraan() {
    try {
        let kendaraan = await exec("/DataKendaraan");

        const options = document.querySelector(".options");
        let text = "";

        for(const x of kendaraan) {
            text += `
            <div data-value="${x.Id}" class="option">
                <div class="foto"> ${x.Id} </div>
                <div class="detail-1">
                    <p>${x.Type} ${x.Merk}</p>
                    <p>${x.Plat}</p>
                </div>
                <div class="detail-2">
                    <p>Max Weight</p>
                    <p>${x.Max_Weight}</p>
                </div>
            </div>`
        }

        options.innerHTML = text;

        const dropdown = document.querySelector(".dropdown");
        const input = document.querySelector(".textbox");
        const dropdownOptions = document.querySelectorAll(".option");

        dropdown.addEventListener("click", () => {
            options.classList.toggle("hidden"); // Toggle the "hidden" class
        });

        dropdownOptions.forEach(option => {
            option.addEventListener("click", () => {
                const selectedValue = option.getAttribute("data-value");
                const selectedText = option.querySelector("p").textContent;
                input.value = selectedValue;
                options.classList.add("hidden"); // Close the dropdown after an option is selected
            });
        });

        // Close the dropdown if you click outside of it
        document.addEventListener("click", (event) => {
            if (!dropdown.contains(event.target)) {
                options.classList.add("hidden");
            }
        });
      
    } catch (error) {
        console.error(error);
    }
}

export async function fetchGedung() {
    console.log("test");
    console.log("dom loaded")
    let gedungInput = document.querySelector('[name="Gedung"]');
    let aisleInput = document.querySelector('[name="Aisle"]');
    let placeInput = document.querySelector('[name="Place"]');
    const map = document.querySelector(".map");
    let text = "";
    let text2 = "";
    let text3 = "";
    let text4 = "";

    try {
        const gedung = await exec("/DataGedung")

        for(const x of gedung) {
            text += `<option value=${x.Id}>${x.Nama_Gedung}</option>`
        }

        console.log(gedungInput)

        gedungInput.innerHTML = `<option></option>` + text;

        gedungInput.addEventListener("change", async () => {
            let idGedung = gedungInput.value;
            console.log(idGedung);
            text2 = `<a href="/html/testing3.html?Id=${idGedung}">Click here to use map</a>`; // Fix the assignment
            map.innerHTML = text2;

            let aisle = await exec(`/DataAisle`)
            text3 = ""; // Clear the content of text3
            for(const x of aisle ){
                console.log("aisle gedung Id:", x.Gedung_Id)
                if(idGedung == x.Gedung_Id){
                    text3 += `<option value=${x.Id}>${x.Aisle_Name}</option>`
                }
            }

            aisleInput.innerHTML = `<option default></option>` + text3;
        })

        const shelf = await exec(`/DataShelf`);
        const pallet = await exec(`/DataPallete`);
        const barang = await exec(`/DetailBarang`);

        let shelfPalletCombinations = [];

        aisleInput.addEventListener("change", async () => {
            let idAisle = aisleInput.value;
            console.log(idAisle);
            let text4 = '';
        
            for(const x of shelf) {
                if(idAisle == x.Aisle_Id){
                    for(const y of pallet) {
                        for(const z of barang){
                            if(z.Id_Pallete == 0){
                                if(x.Id == y.Shelf_Id) {
                                    let combinationKey = `${x.Shelf_Name}_${y.Pallete_Name}`;
                                    if (!shelfPalletCombinations.includes(combinationKey)) {
                                        text4 += `
                                        <option disabled>Shelf: ${x.Shelf_Name}</option>
                                        <option value="${y.Id}">Pallet: ${y.Pallete_Name}</option>`;
                                        shelfPalletCombinations.push(combinationKey);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        
            placeInput.innerHTML = `<option default></option>` + text4;
            
        })

    } catch(error) {
        console.error(error)
    }
}

export async function fetchPlace(palletId) {
    let gedungInput = document.querySelector('[name="Gedung"]');
    let aisleInput = document.querySelector('[name="Aisle"]');
    let placeInput = document.querySelector('[name="Place"]');
    const map = document.querySelector(".map");

    let text = "";
    let text2  = "";
    let text3 = "";
    let text4 = "";

    const gedung = await exec("/DataGedung");
    const aisle = await exec(`/DataAisle`)
    const shelf = await exec(`/DataShelf`);
    const pallet = await exec(`/DataPallete`);

    for(const x of pallet){
        if(palletId == x.Id) {
            let shelfId = x.Shelf_Id;
            console.log("shelf Id:", shelfId)
            text += `<option value="${x.Id}">Pallet: ${x.Pallete_Name}</option>`

            for(const y of shelf) {
                if(y.Id == shelfId) {
                    let aisleId = y.Aisle_Id;
                    console.log("aisle Id:", aisleId)

                    for(const z of aisle) {
                        if(aisleId == z.Id) {
                            let gedungId = z.Gedung_Id;
                            console.log("gedung Id:", gedungId)
                            text2 += `<option value=${z.Id}>${z.Aisle_Name}</option>`

                            for(const w of gedung) {
                                if(gedungId == w.Id) {
                                    text3 += `<option value=${w.Id}>${w.Nama_Gedung}</option>`
                                    text4 = `<a href="/html/testing3.html?Id=${w.Id}">Click here to use map</a>`; // Fix the assignment
                                    map.innerHTML = text4;
                                }
                            }

                            gedungInput.innerHTML = text3; 
                        }
                    }

                    aisleInput.innerHTML = text2;
                }
            }
        }
    }

    placeInput.innerHTML = text;
}
