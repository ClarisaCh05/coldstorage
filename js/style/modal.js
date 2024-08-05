import { getDataArray, deleteItemByIndex, getDataLocation, deleteLocationByIndex } from "../utility/array.js";

export function modalItems() {
    const dataArray = getDataArray();

    const modalContainer = document.querySelector(".modal-items-container");

    function openModal() {
        modalContainer.innerHTML = `
            <div class="modal">
                <div class="list">
                    <h2>Items Detail</h2>
                    <button type="button" id="closeModalBtn">X</button>
                    <div class="line"></div>
                    <div class="items-container" id="items-container"></div>
                </div>
            </div>
        `;
    
        const itemsContainer = document.querySelector(".items-container");
    
        dataArray.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("item");
    
            index += 1;
            itemDiv.innerHTML = `
                <button class="deleteItem" data-target="${index}"><i class="far fa-trash-alt"></i></button>
                <p>Item ${index}</p>
                <p>Item: ${item.Nama_Item}</p>
                <label>Amount: ${item.Jumlah}</label><span>Weight: ${item.Berat}kg</span>
                <br>
                <label class="date-p">Date: ${item.Tanggal_Masuk} - ${item.Tanggal_Ambil}</label>
                <p>Storage ${item.Gedung} ${item.Aisle} ${item.Place}</p>
                <p>Time Target: ${item.time_target}</p>
                <p>Mobile Phone: ${item.mobile_phone}</p>
            `;
    
            itemsContainer.appendChild(itemDiv);
    
            // Attach the event listener for deleting this item
            itemDiv.querySelector(".deleteItem").addEventListener("click", handleDeleteItemClick);
        });
    
        modalContainer.classList.remove("hidden");
    }
    

    function closeModal() {
        modalContainer.innerHTML = "";
        modalContainer.classList.add("hidden");
    }

    // Event listener to open the modal
    document.addEventListener("click", (e) => {
        if (e.target.id === "checkItems") {
            openModal();
        }
    });

    // Event listener to close the modal
    modalContainer.addEventListener("click", (e) => {
        if (e.target.id === "closeModalBtn") {
            closeModal();
        }
    });

    function handleDeleteItemClick(e) {
        const indexToDelete = parseInt(e.currentTarget.getAttribute("data-target"));
        console.log(indexToDelete)
        deleteItemByIndex(indexToDelete);
        
        // After deletion, update the modal content
        openModal();
    }
}

export function modalLocations () {
    const dataArray = getDataLocation();

    const modalContainerLoc = document.querySelector('.modal-loc-container');

    function openModal() {
        modalContainerLoc.innerHTML = `
        <div class="modal-loc">
            <div class="list">
                <h2>Distribute Detail</h2>
                <button type="button" id="closeModalBtn">X</button>
                <div class="line"></div>
                <div class="location-container" id="location-container"></div>                   
            </div>
        </div>`

        const locationsContainer = document.querySelector(".location-container");

        dataArray.forEach((location, index) => {
            const locationDiv = document.createElement("div");
            locationDiv.classList.add("location");

            index += 1;
            locationDiv.innerHTML = `
            <button class="deleteItem" data-target="${index}"><i class="far fa-trash-alt"></i></button>
            <p>Location ${index}</p>
            <p>Name: ${location.Nama_Toko}</p>
            <p>Item: ${location.item}</p>
            <p>Address: ${location.Address}</p>
            <p>Date: ${location.Tanggal_PickUp}</p>
            <p>Qts: ${location.Quantities} Pcs</p>
            <p>Time: ${location.Time} AM</p>`
            locationsContainer.appendChild(locationDiv);

            locationDiv.querySelector(".deleteItem").addEventListener("click", handleDeleteItemClick);
        })

        modalContainerLoc.classList.remove("hidden");
    }

    function closeModal() {
        modalContainerLoc.innerHTML = "";
        modalContainerLoc.classList.add("hidden");
    }

    document.addEventListener("click", (e) => {
        if (e.target.id === "openModalBtn") {
            console.log("click")
            openModal();
        }
    });

    // Event listener to close the modal using event delegation
    modalContainerLoc.addEventListener("click", (e) => {
        if (e.target.id === "closeModalBtn") {
            closeModal();
        }
    });

    function handleDeleteItemClick(e) {
        const indexToDelete = parseInt(e.currentTarget.getAttribute("data-target"));
        console.log(indexToDelete)
        deleteLocationByIndex(indexToDelete);
        
        // After deletion, update the modal content
        openModal();
    }
}

export function previewModal(previewBox) {
    document.querySelectorAll(".shelf").forEach(shelf => {
        shelf.onclick = () => {
            console.log(shelf)
            let name = shelf.getAttribute('data-name');
            previewBox.forEach(preview => {
                let target = preview.getAttribute("data-target");
                if (name === target) {
                    preview.classList.add("active");
                }
            });
        };
    });

    previewBox.forEach(close => {
        close.querySelector(".fa-times").onclick = () => {
            close.classList.remove("active")

        }
    })
}

export function previewSales() {
    document.addEventListener("DOMContentLoaded", function () {
        // Your code for attaching the event listener goes here
        function openModal() {
            const container = document.querySelector(".modal-container");
            container.classList.remove("hidden");
        }

        function closeModal() {
            const container = document.querySelector(".modal-container");
            container.classList.add("hidden");
        }
    
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("week")) {
                console.log("Event listener triggered");
                openModal();
            }
        });

        document.addEventListener("click", (e) => {
            const container = document.querySelector(".modal-place");
            if (!container.contains(e.target) && !e.target.classList.contains("week")) {
                closeModal();
            }
        });
    });    
}

export function previewSlot() {
    document.addEventListener("DOMContentLoaded", () => {
        const modalContainer = document.querySelector(".modal-container");
        console.log("modal container", modalContainer)
        const rowElements = document.querySelectorAll(".row-p");
        console.log("row element:", rowElements)
        // Event listener for each .row-p element
        rowElements.forEach((row) => {
            row.addEventListener("click", () => {
                console.log("row")
                if (row.classList.contains('selected')) {
                    const content = document.createElement("div");
                    content.classList.add("content");
                    content.innerHTML = `
                    <p id="closeModalBtn">x<p>
                    <h2>Owner Details</h2>
                    <div class="line"></div>
                    <div class="info">
                        <div>
                            <p>Invoice</p>
                            <h3>BJE290012KLOP</h3>
                            <br>
                            <p>Customer</p>
                            <h3>Budiyanto</h3>
                            <br>
                            <p>Service</p>
                            <h3>Door to Door</h3>
                            <br>
                            <p>Payment</p>
                            <h3>Rp 100.000</h3>
                            <br>
                            <p>Deadline Payment</p>
                            <h3>-</h3>
                        </div>
                        <div>
                            <p>Contract</p>
                            <h3>July, 18 2023 - July 20 2023</h3>
                            <br>
                            <p>Location</p>
                            <h3>Storage A</h3>
                            <h3>Aisle A-3</h3>
                            <h3>A-3-0</h3>
                            <br>
                            <p>Rent Driver</p>
                            <h3>Yes</h3>
                            <br>
                            <p>Date to Deliver<p>
                            <h3>July, 20 2023</h3>
                        </div>
                    </div>
                    `;

                    modalContainer.innerHTML = "";
                    modalContainer.appendChild(content);

                    modalContainer.classList.remove("hidden");
                }
            });
        });

        const closeModalButton = document.querySelector("#closeModalBtn");
        closeModalButton.addEventListener("click", () => {
            modalContainer.classList.add("hidden");
        });
    });
}


