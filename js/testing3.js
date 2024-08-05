import { exec } from "./utility/util.js";

function closeModal(modal) {
    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", async () => {
    const shelfContainer = document.querySelector(".shelf-container");

    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('Id');
    console.log(paramValue);

    const aisle = await exec("/DataAisle");
    const shelfs = await exec("/DataShelf");
    const pallete = await exec("/DataPallete");
    const barang = await exec("/DetailBarang");
    const order = await exec("/DataOrder");
    const client = await exec("/DataClient")
    const pembayaran = await exec("/DataPembayaran");
    const distribute = await exec("/DataDistribute");

    console.log("aisle:", aisle.length);
    console.log("slefs:", shelfs.length);
    console.log("Pallets:", pallete.length);

    let palletId = []

    for(const z of barang){
        if(z.Id_Pallete > 0) {
            palletId.push(z.Id_Pallete)
        }
    } 

    console.log(palletId)

    for (const x of aisle) {
        if (x.Gedung_Id == paramValue) {
            const aisleDiv = document.createElement("div");
            aisleDiv.classList.add(`${x.Id}`);
            aisleDiv.innerHTML = `<p>${x.Aisle_Name}</p>`;
            shelfContainer.appendChild(aisleDiv);
    
            for (const y of shelfs) {
                if (x.Id == y.Aisle_Id) {
                    const shelfDiv = document.createElement("div");
                    shelfDiv.classList.add("shelf");
                    shelfDiv.dataset.name = `${y.Shelf_Name}`;

                    aisleDiv.appendChild(shelfDiv);
                    
                    //
                    const column1 = document.createElement("div");
                    column1.classList.add("column");

                    shelfDiv.appendChild(column1)
                    
                    //
                    const rows = document.createElement("div");
                    rows.classList.add("rows");

                    shelfDiv.appendChild(rows);

                    //
                    const column2 = document.createElement("div");
                    column2.classList.add("column");

                    shelfDiv.appendChild(column2)

                    // Create a modal for the shelf
                    const modal = document.createElement("div");
                    modal.classList.add("modal");
    
                    // Set a unique identifier for the modal, e.g., data-shelf-id
                    modal.dataset.shelfId = y.Id;

                    //
                    const header = document.createElement("div");
                    header.classList.add("header")
                    header.innerHTML = `<p>Temperature: ${y.Temperature}C</p>`;
                    modal.appendChild(header)

                    //
                    const btnField = document.createElement("div");
                    btnField.classList.add("closeBtn")
                    const closeBtn = document.createElement("button");
                    closeBtn.classList.add("close");
                    closeBtn.textContent = "X";
                    closeBtn.addEventListener("click", () => {
                        closeModal(modal);
                    });
                    modal.appendChild(btnField)
                    btnField.appendChild(closeBtn);

                    //
                    const modalCon = document.createElement("div");
                    modalCon.classList.add("modal-con");

                    modal.appendChild(modalCon);

                    // Add the modal to the DOM but hide it
                    document.body.appendChild(modal);
                    modal.style.display = "none";

                    //
                    const shelfModal = document.createElement("div");
                    shelfModal.classList.add("shelf");
                    shelfModal.dataset.name = `${y.Shelf_Name}`;

                    modalCon.appendChild(shelfModal);

                    //
                    const columnModal1 = document.createElement("div");
                    columnModal1.classList.add("column");

                    shelfModal.appendChild(columnModal1)

                    //
                    const rowsModal = document.createElement("div");
                    rowsModal.classList.add("rows");

                    shelfModal.appendChild(rowsModal);

                    //
                    const columnModal2 = document.createElement("div");
                    columnModal2.classList.add("column");
 
                    shelfModal.appendChild(columnModal2);

                    //
                    const footer = document.createElement("div");
                    footer.classList.add("footer");
                    footer.innerHTML = 
                    `<label>${y.Shelf_Name}</label>
                    <div class="saveBtn">
                        <button type="button" class="saveLoc">Save Location</button>
                    </div>`
                    modal.appendChild(footer);

                    //
                    const modalCon2 = document.createElement("div");
                    modalCon2.classList.add("modal-2");

                    modalCon.appendChild(modalCon2);

                    //
                    const infoCon = document.createElement("div");
                    infoCon.classList.add("info-con");

                    modalCon2.appendChild(infoCon);

                    //
                    const info1 = document.createElement("div");
                    info1.classList.add("info-1");
                    info1.innerHTML = `
                    <div>
                        <p>Invoice</p>
                        <h4 class="invoice"> - </h4>
                        <p>Date Reservation</p>
                        <h4 class="reservation"> - </h4>
                        <p>Customer</p>
                        <h4 class="customer"> - </h4>
                        <p>Service</p>
                        <h4 class="service"> - </h4>
                        <p>Payment Method</p>
                        <h4 class="payment-method"> - </h4>
                        <p>Payment</p>
                        <h4 class="payment"> - </h4>
                        <p>Deadline Payment</p>
                        <h4 class="deadline"> - </h4>
                    </div>
                    <div>
                        <p>Reservation End</p>
                        <h4 class="reserve-end"> - </h4>
                        <p>Date Location</p>
                        <h4 class="aisle">Aisle ${x.Aisle_Name}</h4>
                        <h4 class="shelf-info">Shelf ${y.Shelf_Name}</h4>
                        <h4 class="pallet"></h4>
                        <p>Rent Driver</p>
                        <h4 class="rent"> - </h4>
                        <p>Date to Deliver</p>
                        <h4 class="deliver"> - </h4>
                    </div>
                    `;

                    infoCon.appendChild(info1)

                    //
                    shelfDiv.addEventListener("click", () => {
                        // Show the corresponding modal when the shelfDiv is clicked
                        modal.style.display = "block";
                    });

                    //
                    const saveLoc = document.querySelector(".saveLoc");

                    //
                    for (const pallets of pallete) {
                        if (palletId.includes(`${pallets.Id}`) && pallets.Shelf_Id == y.Id) {
                            // Pallet is filled with barang
                            const palletsRows = document.createElement("div");
                            palletsRows.classList.add("row");
                            palletsRows.style.backgroundColor = "var(--shelf2)";
                            palletsRows.dataset.value = `${pallets.Id}`;
                    
                            rows.appendChild(palletsRows);
                    
                            const palletsModal = document.createElement("div");
                            palletsModal.classList.add("row");
                            palletsModal.style.backgroundColor = "var(--shelf2)";
                            palletsModal.dataset.target = `${pallets.Id}`;
                    
                            rowsModal.appendChild(palletsModal);

                            palletsModal.addEventListener("click",  (event) => {
                                const palletDataTarget = event.currentTarget.dataset.target;

                                const shelfPlace = event.currentTarget.closest(".shelf");
                                console.log(shelfPlace);

                                if (shelfPlace) {
                                    const theRows = shelfPlace.querySelectorAll(".row");
                                    let idOrder = "-";
                                    let custId = "-";
                                    let distributeId = "-";

                                    theRows.forEach((row) => {
                                        const invoice = document.querySelector(".invoice");
                                        const reservation = document.querySelector(".reservation");
                                        const cust = document.querySelector(".customer");
                                        const service = document.querySelector(".service");
                                        const paymentMethod = document.querySelector(".payment-method");
                                        const payment = document.querySelector(".payment");
                                        const deadline = document.querySelector(".deadline");
                                        const reserveEnd = document.querySelector(".reserve-end");
                                        const pallete = document.querySelector(".pallet");
                                        const rentDriver = document.querySelector(".rent");
                                        const deliver = document.querySelector(".deliver");

                                        if (row.style.backgroundColor === "var(--shelf2)") {
                                            for(const item of barang) {
                                                if(item.Id_Pallete == parseInt(palletDataTarget)){
                                                    invoice.textContent = `${item.Id_Order}`
                                                    idOrder = item.Id_Order
                                                    distributeId = item.Id_Distribute;
                                                }

                                                for(const dataOrder of order){
                                                    if(dataOrder.Id === idOrder){
                                                        reservation.textContent = `${dataOrder.Tanggal_Masuk}`;
                                                        service.textContent = `${dataOrder.Service_Type}`;
                                                        reserveEnd.textContent = `${dataOrder.Tanggal_Ambil}`;
                                                        rentDriver.textContent = `${dataOrder.Rent_Driver}`;
                                                        custId = dataOrder.Client_Id;
                                                    }
                                                }

                                                for(const dataClient of client){
                                                    if(custId == dataClient.Id){
                                                        cust.textContent = `${dataClient.Nama}`
                                                    }
                                                }

                                                for(const dataPembayaran of pembayaran){
                                                    if(dataPembayaran.Id_Order === idOrder){
                                                        paymentMethod.textContent = `${dataPembayaran.Jenis}`;
                                                        payment.textContent = `${dataPembayaran.Jumlah}`;
                                                        deadline.textContent = `${dataPembayaran.Jatuh_Tempo}`;
                                                    }
                                                }

                                                for(const dataDistribute of distribute){
                                                    if(dataDistribute.Id === distributeId){
                                                        console.log(dataDistribute.Tanggal_PickUp)
                                                        deliver.textContent = `${dataDistribute.Tanggal_PickUp}`
                                                    }
                                                }

                                                if(pallets.Id == parseInt(palletDataTarget)){
                                                    pallete.textContent = `Pallet ${pallets.Pallete_Name}`
                                                }
                                            }
                                        }

                                    })
                                }

                            })
                        } else if (pallets.Shelf_Id == y.Id) {
                            // Pallet is not filled with barang
                            const palletsRows = document.createElement("div");
                            palletsRows.classList.add("row");
                            palletsRows.dataset.value = `${pallets.Id}`;
                    
                            rows.appendChild(palletsRows);
                    
                            const palletsModal = document.createElement("div");
                            palletsModal.classList.add("row");
                            palletsModal.dataset.target = `${pallets.Id}`;
                    
                            rowsModal.appendChild(palletsModal);
                    
                            palletsModal.addEventListener("click", (event) => {
                                const palletDataTarget = event.currentTarget.dataset.target;
                    
                                const shelfDiv = event.currentTarget.closest(".shelf");
                    
                                if (shelfDiv) {
                                    const shelfRows = shelfDiv.querySelectorAll(".row");
                    
                                    shelfRows.forEach((row) => {
                                        if (row.style.backgroundColor === "var(--cold)") {
                                            // Reset the previously selected pallet back to var(--shelf)
                                            row.style.backgroundColor = "var(--shelf)";
                                        }
                                    });
                    
                                    event.currentTarget.style.backgroundColor = "var(--cold)";
                                }
                    
                                saveLoc.addEventListener("click", () => {
                                    console.log(palletDataTarget);
                                    window.location.href = `./admin/testing.html?palletId=${palletDataTarget}`;
                                });
                            });
                        }
                    }                    
                }
            }
        }
    }
});
