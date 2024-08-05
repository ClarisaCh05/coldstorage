import { exec } from "./utility/util.js";

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('Id');
    console.log(paramValue);

    let jumlah;
    let sisa;
    let idClient = "";
    let selectedService = "";

    const jumlahInput = document.querySelector(".jumlah");
    const submitBtn = document.querySelector("#submitForm");
    const date = document.querySelector(".jatuh_tempo");
    const radioButtons = document.querySelectorAll('input[type="radio"][name="Jenis"]');
    const dibayar = document.querySelector(".dibayar");
    const nama = document.querySelector(".nama");
    const notes = document.querySelector(".notes")

    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', () => {
            selectedService = radioButton.value;
            console.log("Selected service: " + selectedService);
        });
    });

    try {

        const dataOrder = await exec(`/DataOrderWithID/${paramValue}`);
        
        for(const x of dataOrder) {
            jumlah = x.Berat * 5000;
            idClient = x.Client_Id;
        }

        jumlahInput.value = jumlah; 

        const dataClient = await exec("/DataClient");
        let text = "";

        for(const y of dataClient) {
            if(y.Id == idClient) {
                text = y.Nama;
            }
        }

        nama.value = text;
        
        submitBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            // Get the user's input date from the input element
            const userInputDate = new Date(date.value);

            // Get the current date
            const currentDate = new Date();

            // Calculate the time difference in milliseconds
            const timeDifference = userInputDate - currentDate;

            // Convert milliseconds to daysh (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
            const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            // Display the result
            console.log(`The difference in days is: ${daysDifference} days`);

            if(dibayar.value < jumlah) {
                sisa = jumlah - dibayar.value;

                const inputValue = date.value;
                let formattedDate;
    
                // Convert the value to the desired format (yyyy-mm-dd)
                const parts = inputValue.split('-');
                if (parts.length === 3) {
                    const [year, month, day] = parts;
                    formattedDate = `${year}-${month}-${day}`;
                    date.value = formattedDate;
                }
    
                const dataInput = {
                    Id_Order : paramValue,
                    Jumlah : jumlah,
                    Sisa : sisa,
                    Jenis: selectedService,
                    Dibayar: dibayar.value,
                    Termin: daysDifference,
                    Jatuh_Tempo: formattedDate
                }
    
                console.log(dataInput);
    
                const paymentData = await exec("/TambahPembayaran", dataInput, "POST");
                console.log(paymentData);
    
                const nextPageURL = `home.html`;
                window.location.href = nextPageURL;
            
            } else {
                notes.textContent = "The value of total paid is more than the total" 
            }             

        })

    } catch (error) {
        console.error(error)
    }
})