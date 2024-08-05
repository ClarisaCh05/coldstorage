import { amount } from "./style/btn.js"
import { modalItems, modalLocations } from "./style/modal.js";
import { addToDataArray, addToDataLocation,  getDataArray, getDataLocation } from "./utility/array.js";  
import { fetchClient, fetchDriver, fetchKendaraan, fetchGedung, fetchPlace } from "./fetch/addOrder.js";
import { exec, deleteStorage } from "./utility/util.js";
amount();
fetchClient();
fetchDriver();
fetchKendaraan();
deleteStorage();

const formDataArray = []
let formatStartDate;
let formatEndDate;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const radioButtons = document.querySelectorAll('input[type="radio"][name="Service_Type"]');
        const checkContract = document.querySelector('#contract');
        const detail = document.querySelector('.pickDetail');
        const distribute = document.querySelector('.distribute');
        const contractPrev = document.querySelector('.contract-field');
        const contractSign = document.querySelector('.contract-signed');
        const mainContainer = document.querySelector(".main");
        const seeItemsBtn = document.querySelector("#checkItems");
        const addItems = document.querySelector("#submitForm");

        checkContract.addEventListener('change', handleCheckBox);
        handleCheckBox();

        $('input[name="Tanggal_Masuk"]').daterangepicker();  

        const urlParams = new URLSearchParams(window.location.search);
        const value = urlParams.get('palletId');
        console.log("pallet id:", value);

        if (value !== null && value !== "") {
            // If the value is not null and not empty, run one function.
            fetchPlace(value);
        } else {
            // If the value is either null or empty, run another function.
            fetchGedung();
        }        

        addItems.addEventListener("click", async (e) => {
            let itemInput = document.querySelector('[name="Nama_Item"]');
            let mobile_phoneInput = document.querySelector('[name="Mobile_Phone"]')
            let beratInput = document.querySelector('[name="Berat"]');
            let jumlahInput = document.querySelector('[name="Jumlah"]');
            let tanggal_masukInput = document.querySelector('[name="Tanggal_Masuk"]');
            let gedungInput = document.querySelector('[name="Gedung"]');
            let aisleInput = document.querySelector('[name="Aisle"]');
            let placeInput = document.querySelector('[name="Place"]');
            let notesInput = document.querySelector('[name="Notes"]');
            let time_targetInput = document.querySelector('[name="Time_Target"]');
            let user_idInput = document.querySelector('[name="User_Id"]');
            let kendaraan_idInput = document.querySelector('[name="Kendaraan_Id"]');
            let client = document.querySelector('[name="Client_Id"]');
            const pengawas_idInput = 0; // Default value for Pengawas_Id

            const dateRangeInput = document.querySelector('input[name="Tanggal_Masuk"]');
            const dateRangeValues = dateRangeInput.value.split(' - '); // Assuming it's in the format "start_date - end_date"
            const start_date = dateRangeValues[0];
            const end_date = dateRangeValues[1];

            const parts = start_date.split('/');
            if (parts.length === 3) {
                const [day, month, year] = parts;
                formatStartDate = `${year}-${month}-${day}`;
                console.log("formated date", formatStartDate)
            }

            const parts2 = end_date.split('/');
            if (parts2.length === 3) {
                const [day, month, year] = parts2;
                formatEndDate = `${year}-${month}-${day}`;
                console.log("formated date", formatEndDate)
            }

            user_idInput.addEventListener('change', function() {
                const selectedUserId = user_idInput.value;
                console.log(`Selected User ID: ${selectedUserId}`);
            });
            
            client.addEventListener('change', function() {
                const selectedClientId = client.value;
                console.log(`Selected Kendaraan ID: ${selectedClientId}`);
            });

            gedungInput.addEventListener('change', function() {
                const selectedGedungId = gedungInput.value;
                console.log(`Selected Gedung ID: ${selectedGedungId}`);
            })
            
            e.preventDefault()

            if (!selectedService) {
                // Handle the case where a service type is not selected.
                return;
            }

            const pallet = await exec("/DataPallete");

            if(selectedService === "Door to Door") {
                for(const x of pallet) {
                    console.log("kapasitas & berat:", x.Kapasitas, "&", beratInput.value )
                    const aisle = aisleInput.value;
                    if(x.Id == aisle){
                        if(x.Kapasitas > beratInput.value) {
                            const data = {
                                Nama_Item: itemInput.value,
                                mobile_phone: mobile_phoneInput.value,
                                Jumlah: jumlahInput.value,
                                Berat: beratInput.value,
                                Tanggal_Masuk: formatStartDate,
                                time_target: time_targetInput.value,
                                Gedung: gedungInput.value,
                                Aisle: aisleInput.value,
                                Place: placeInput.value,
                                Service_Type: selectedService, // Assign the selected service here.
                                Rent_Driver: "No",
                                Tanggal_Ambil: formatEndDate,
                                Notes: notesInput.value,
                                User_Id: "-", // Add User_Id
                                Kendaraan_Id: "-", // Add Kendaraan_Id
                                Client_Id: client.value,
                                Pengawas_Id: pengawas_idInput, // Add Pengawas_Id
                            };

                            addToDataArray(data);

                        } else {
                            throw new Error("The weight is more than the pallet weight capacity");
                        }
                    }
                }

            } else {
                for(const x of pallet) {
                    const aisle = aisleInput.value;
                    console.log("kapasitas & berat:", x.Kapasitas, "&", beratInput.value )
                    if(x.Id == aisle) {
                        if(x.Kapasitas > beratInput.value) {
                            const data = {
                                Nama_Item: itemInput.value,
                                mobile_phone: mobile_phoneInput.value,
                                Jumlah: jumlahInput.value,
                                Berat: beratInput.value,
                                Tanggal_Masuk: formatStartDate,
                                time_target: time_targetInput.value,
                                Gedung: gedungInput.value,
                                Aisle: aisleInput.value,
                                Place: placeInput.value,
                                Service_Type: selectedService, // Assign the selected service here.
                                Rent_Driver: "Yes",
                                Tanggal_Ambil: formatEndDate,
                                Notes: notesInput.value,
                                User_Id: user_idInput.value, // Add User_Id
                                Kendaraan_Id: kendaraan_idInput.value, // Add Kendaraan_Id
                                Pengawas_Id: pengawas_idInput, // Add Pengawas_Id
                            };
            
                            addToDataArray(data);
                        }
                    } else {
                        throw new Error("The weight is more than the pallet weight capacity");
                    }
                }
            }

            itemInput.value = "";
            beratInput.value = "";
            jumlahInput.value = 0;
            tanggal_masukInput.value = "";
            gedungInput.value = "";
            aisleInput.value = "";
            placeInput.value = "";
            notesInput.value = "";
            time_targetInput.value = "";

            console.log(formDataArray); // You can see the data in the console

        })

        seeItemsBtn.addEventListener("click", () => {
            console.log("click")
            const modalContainer = document.querySelector('.modal-items-container');
            if (!modalContainer) return;
            modalItems();
        })

        function removeAllChildren(element) {
            if (element) {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
            }
        }

        let selectedService = "";

        radioButtons.forEach(function (radioButton) {
            radioButton.addEventListener('change', () => {
                selectedService = radioButton.value;
                handleRadioButtonChange(radioButton);
            });
        });

        const orderData = getDataArray();
        const distributeData = getDataLocation();

        const submitAllFormBtn = document.querySelector("#submitAllForm");
        submitAllFormBtn.addEventListener("click", async () => {
            try {
                console.log(distributeData);

                let user_idInput = document.querySelector('[name="User_Id"]');
                let kendaraan_idInput = document.querySelector('[name="Kendaraan_Id"]');
                let client = document.querySelector('[name="Client_Id"]');

                const namaItem = orderData.map(item => item.Nama_Item);
                const namaItemString = namaItem.join(',')
                console.log(namaItemString);

                const jumlah = orderData.map(item => item.Jumlah);
                const jumlahString = jumlah.join(',')
                console.log(jumlahString);

                const berat = orderData.map(item => item.Berat);
                const beratString = berat.join(',')
                console.log(beratString);

                const tanggalMasuk = orderData.map(item => item.Tanggal_Masuk);
                const tanggalMasukString = tanggalMasuk.join(',')
                console.log(tanggalMasukString);

                const gedung = orderData.map(item => item.Gedung);
                const GedungString = gedung.join(',')
                console.log(GedungString);

                const aisle = orderData.map(item => item.Aisle);
                const aisleString = aisle.join(',')
                console.log(aisleString);

                const place = orderData.map(item => item.Place);
                const placeString = place.join(',')
                console.log(placeString);

                const serviceType = orderData.map(item => item.Service_Type);
                const serviceTypeString = serviceType.join(',')
                console.log(serviceTypeString);

                const tanggalAmbil = orderData.map(item => item.Tanggal_Ambil);
                const tanggalAmbilString = tanggalAmbil.join(',')
                console.log(tanggalAmbilString);

                const notes = orderData.map(item => item.Notes);
                const notesString = notes.join(',')
                console.log(notesString);

                const driver = orderData.map(item => item.User_Id);
                const driverString = driver.join(',')
                console.log(driverString);

                const kendaraan = orderData.map(item => item.Kendaraan_Id);
                const kendaraanString = kendaraan.join(',')
                console.log(kendaraanString);                

                const dataInput = {
                    Nama_Item: namaItemString,
                    Jumlah: jumlahString,
                    Berat: beratString,
                    Tanggal_Masuk: tanggalMasukString,
                    Gedung: GedungString,
                    Aisle: aisleString,
                    Place: placeString,
                    Service_Type: serviceTypeString, // Assign the selected service here.
                    Rent_Driver: "Yes",
                    Tanggal_Ambil: tanggalAmbilString,
                    Notes: notesString,
                    User_Id: user_idInput.value, // Add User_Id
                    Kendaraan_Id: kendaraan_idInput.value, // Add Kendaraan_Id
                    Client_Id: client.value,
                    Pengawas_Id: "5", // Add Pengawas_Id
                }

                console.log(dataInput)

                console.log("data array:", dataInput)
                const response = await exec("/TambahOrder", dataInput, "POST");
                console.log(response)

                if(distributeData.length == 0) {
                    const nextPageURL = `payment.html?Id=${response}`;
                    window.location.href = nextPageURL;
                    
                } else {
                    const address = distributeData.map(item => item.Address);
                    const addressString = address.join(',')
                    console.log(addressString);
                    
                    const tanggalPickUp = distributeData.map(item => item.Tanggal_PickUp);
                    const tanggalPickUpString = tanggalPickUp.join(',')
                    console.log(tanggalPickUpString);  
    
                    const time = distributeData.map(item => item.Time);
                    const timeString = time.join(',')
                    console.log(timeString);
    
                    const quantities = distributeData.map(item => item.Quantities);
                    const quantitiesString = quantities.join(',')
                    console.log(quantitiesString);
    
                    const phoneNumber = distributeData.map(item => item.Phone_Number);
                    const phoneNumberString = phoneNumber.join(',')
                    console.log(phoneNumberString);
    
                    const namaToko = distributeData.map(item => item.Nama_Toko);
                    const namaTokoString = namaToko.join(',')
                    console.log(namaTokoString);
    
                    const locationInput = {
                        Item: response,
                        Address: addressString,
                        Tanggal_PickUp: tanggalPickUpString,
                        Time: timeString,
                        Quantities: quantitiesString,
                        Phone_Number: phoneNumberString,
                        Status: "Waiting",
                        Titik_Awal: 0.0,
                        Destination: 0.0,
                        Nama_Toko: namaItemString,
                        Temperature: 0,
                        Notes: "-"
                    }
    
                    console.log(locationInput);
    
                    console.log("data array:", locationInput)
                    const response2 = await exec("/TambahDistribute", locationInput, "POST");
                    console.log(response2);

                    const barang = await exec(`/DetailBarang`);
                    for(const item of barang){
                        if(item.Id_Order == response) {
                            console.log(item.Id_Order, "&", response)
                            const pallet = orderData.map(item => item.Place);
                            for(const i  of pallet){
                                const dataInput = {
                                    Id_Pallete: i
                                }
                                const update = await exec(`/UpdatePalleteBARANG/${item.Id}`, dataInput, 'PUT');
                                console.log("update:", update);
                            }
                        }
                    }

                    const nextPageURL = `payment.html?Id=${response}`;
                    window.location.href = nextPageURL;
                }

            }catch (error) {
                console.error(error)
            }
        })

        function handleRadioButtonChange(radioButton) {
            console.log("Radio button changed:", radioButton.value);

            // Remove all child elements from targetElement2 and targetElement
            removeAllChildren(detail);
            removeAllChildren(distribute)

            // Check if the radio button is checked
            if (radioButton.value === "Door to Port" || radioButton.value === "Port to Door" || radioButton.value === "Port to Door") {
                const dateTime = document.createElement('div');
                dateTime.innerHTML = `
                    <form class="pickUp">
                        <h2>Detail Pickup</h2>
                        <br>
                        <label>Date</label><span class="bits">(Date to pickup by driver)</span>
                        <br>
                        <input type="date" id="date" name="Tanggal_PickUp">
                        <br>
                        <input type="text" id="address" placeholder="Address">
                    </form>
                `;

                const array = getDataArray();
                let textOption = ""

                console.log("array:", array)

                for(const x of array){
                    console.log(x.Nama_Item)
                    if(x.Service_Type === selectedService) {
                        textOption += `<option value="${x.Nama_Item}">${x.Nama_Item}</option>`
                    }
                }

                console.log(textOption)

                distribute.innerHTML = `
                    <div class="header">
                        <h2>Distribute Details</h2>
                        <button type="button" class="review" id="openModalBtn">click to review</button>
                    </div>
                    <div class="modal-loc-container"></div>
                    <form id="addLocationForm">
                        <label>Item</label>
                        <br>
                        <select id="list-item">${textOption}</select>
                        <br>
                        <label>Place</label>
                        <br>
                        <input type="text" id="nama_toko" name="Nama_Toko" placeholder="Place Name">
                        <br>
                        <label>Address</label>
                        <br>
                        <input type="text" id="Address" name="Address" placeholder="Address">
                        <br>
                        <button type="button" id="map">
                            <i class="far fa-map"></i> Select via maps
                        </button>
                        <br>
                        <label>Date</label><span>(Date to pickup by driver)</span>
                        <br>
                        <input type="date" name="Tanggal_PickUp" id="pickUp">
                        <br>
                        <div class="timeQty">
                            <div class="time">
                                <label>Time</label>
                                <br>
                                <input type="time" id="time" name="Time">
                            </div>
                            <div class="qtys">
                                <label>Quantities</label><span id="qtySpan">20 places left</span>
                                <input type="text" id="qty" name="Quantities">Pcs
                            </div>
                        </div>
                        <input type="text" id="phone_number" name="Phone_Number" placeholder="Phone number">
                        <div class="btn-field">
                            <button type="submit" id="add_loc">Add</button>
                        </div>
                    </form>`;

                // Append the dateTime element to targetElement2
                detail.appendChild(dateTime);
            }
        }

        function handleCheckBox() {
            if (checkContract.checked) {
                console.log("checkbox is checked");

                removeAllChildren(contractPrev);
                removeAllChildren(contractSign);
        
                contractPrev.innerHTML = `
                    <h3>Make A Contract</h3>
                    <div class="contract-preview"></div>
                    <label><i class="fas fa-arrow-alt-circle-down"></i>Download contract</label>
                `
        
                contractSign.innerHTML = `
                    <h3>Upload signed contract below</h3>
                    <input type="file" id="signedContract">
                    <label class="uploadContract" for="signedContract">Upload File</label>
                `
            } else {
                console.log("checkbox is unchecked");
                removeAllChildren(contractPrev);
                removeAllChildren(contractSign);
            }
        }

        mainContainer.addEventListener("submit", (e) => {
            e.preventDefault();
            const form = e.target.closest("form");
            console.log("click");
        
            if (form && form.id === "addLocationForm") {
                console.log("Form submitted");
        
                // Now, you can access the form fields by their names
                let nama_tokoInput = form.querySelector('[name="Nama_Toko"]');
                let itemList = form.querySelector('#list-item');
                let addressInput = form.querySelector('[name="Address"]');
                let tanggal_pickupInput = form.querySelector('[name="Tanggal_PickUp"]');
                let timeInput = form.querySelector('[name="Time"]');
                let quantitiesInput = form.querySelector('[name="Quantities"]');
                let phone_numberInput = form.querySelector('[name="Phone_Number"]');
        
                // Create a new item object
                const data = {
                    Nama_Toko: nama_tokoInput.value,
                    item: itemList.value,
                    Address: addressInput.value,
                    Tanggal_PickUp: tanggal_pickupInput.value,
                    Time: timeInput.value,
                    Quantities: quantitiesInput.value,
                    Phone_Number: phone_numberInput.value
                };
        
                // Add the new item to the data array
                addToDataLocation(data);

                nama_tokoInput.value = "";
                addressInput.value = "";
                tanggal_pickupInput.value = "";
                timeInput.value = "";
                quantitiesInput.value = "";
                phone_numberInput.value = "";
            }
        });
        

        mainContainer.addEventListener("click", (e) => {
            if (e.target.id === "openModalBtn"){
                modalLocations();
            }
        });

    }catch (error) {
        console.log(error)
    }
});
