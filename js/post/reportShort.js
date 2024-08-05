import { exec } from "../utility/util.js";

document.addEventListener("DOMContentLoaded", async () => {
    let header = document.querySelector(".header");
    let container = document.querySelector(".container");
    let serviceType = document.querySelector(".serviceType");
    let inpLabel = document.querySelector("#inpLabel")
    let addPhotoInp = document.querySelector("#inpLabel-add");
    let createPhotoInp = document.querySelector(".photo-inp");
    let photo = document.querySelector("#photo")

    const urlParams = new URLSearchParams(window.location.search);
    const info = urlParams.get('Id');

    let htmlText = "";
    let htmlText2 = "";

    photo.addEventListener("change", () => {
        // Check if a file is selected
        if (photo.files.length > 0) {
            // Display the selected file name in the label
            inpLabel.innerHTML = 'Selected: ' + photo.files[0].name;
        } else {
            // If no file is selected, revert to the default label
            inpLabel.innerHTML = 'Upload Photo';
        }
    })

    addPhotoInp.addEventListener("click", () => {
        console.log("click")
        const elementDel = addPhotoInp;

        if (elementDel) {
            // Remove the element
            createPhotoInp.removeChild(elementDel);
        } else {
            console.log('Element not found.');
        }

        const photoInp = document.createElement("input");
        photoInp.type = "file";
        photoInp.id = "photo1";
        photoInp.name = "photo";
        photoInp.accept = ".png";
        photoInp.classList.add("photo1")

        const inputLabel = document.createElement("label");
        inputLabel.id = "inpLabel";
        inputLabel.htmlFor = "photo1";
        inputLabel.classList.add("label1");

        //
        const photoInp1 = document.createElement("input");
        photoInp1.type = "file";
        photoInp1.id = "photo2";
        photoInp1.name = "photo";
        photoInp1.accept = ".png";
        photoInp1.classList.add("photo2")

        const inputLabel1 = document.createElement("label");
        inputLabel1.id = "inpLabel";
        inputLabel1.htmlFor = "photo2";
        inputLabel1.classList.add("label2");

        createPhotoInp.appendChild(photoInp)
        createPhotoInp.appendChild(inputLabel)
        createPhotoInp.appendChild(photoInp1)
        createPhotoInp.appendChild(inputLabel1)

        let photo1 = document.querySelector(".photo1");
        let photo2 = document.querySelector(".photo2");
        let label1 = document.querySelector(".label1");
        let label2 = document.querySelector(".label2");
    
        photo1.addEventListener("change", () => {
            
            // Check if a file is selected
            if (photo1.files.length > 0) {
                // Display the selected file name in the label
                label1.innerHTML = 'Selected: ' + photo1.files[0].name;
            } else {
                // If no file is selected, revert to the default label
                label1.innerHTML = 'Upload Photo';
            }
        })
    
        photo2.addEventListener("change", () => {
            
            // Check if a file is selected
            if (photo2.files.length > 0) {
                // Display the selected file name in the label
                label2.innerHTML = 'Selected: ' + photo2.files[0].name;
            } else {
                // If no file is selected, revert to the default label
                label2.innerHTML = 'Upload Photo';
            }
        })
    })

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

        const report = document.querySelector('[name="Report"]');
        const form = document.querySelector('#addReport')
        const submit = document.querySelector(".submit")
    
        submit.addEventListener("click", async (e) => {
            e.preventDefault();
    
            const dataInput = {
                Order_Id: info,
                Report: report.value
            }

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            console.log(object)

            formData.delete("Report")
    
            try {
                const submitData = await exec("/TambahReport", dataInput, "POST");
                console.log(submitData);

                const response = await fetch(`http://116.68.252.201:1945/uploadFoto/${submitData}?id=${submitData}&folder=report`, {
                    method: 'POST',           
                    body: formData
                });
    
                const result = await response.json();
                console.log(result);
    
                if (response.status === 200) {
                    window.alert("Photo Upload Success");
                }
    
                window.location.href = `detailOrder_short.html?Id=${info}`
            }catch(error){
                console.error(error)
            }
        })

    } catch(error) {
        console.error(error)
    }
})