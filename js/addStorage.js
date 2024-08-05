import { exec4 } from "./utility/util.js";

document.addEventListener("DOMContentLoaded", async () => {
    const gedungName = document.querySelector(".Nama_Gedung");
    const alamat = document.querySelector(".alamat");
    const jumlahAisle = document.querySelector(".jumlahAisle");
    const jumlahShelf = document.querySelector(".jumlahShelf");
    const jumlahPallete = document.querySelector(".jumlahPallet");
    const temp = document.querySelector(".temp");
    const category = document.querySelector(".category");
    const kapasitas = document.querySelector(".kapasitas");
    const submitBtn = document.querySelector(".addStorage");

    let array1 = [];
    let data = "";

    submitBtn.addEventListener("click", async () => {
        console.log("nama gedung:", gedungName.value);
        console.log("alamat:", alamat.value)
        console.log("jumlah aisle:", jumlahAisle.value);
        console.log("jumlah shelf:", jumlahShelf.value);
        console.log("jumlah pallet:", jumlahPallete.value);
        console.log("temp:", temp.value);
        console.log("category:", category.value);

        const gedungData = {
            Nama_Gedung: gedungName.value,
            Alamat: alamat.value
        }

        const responseGedung = await exec4("/TambahGedung", gedungData, 'POST');
        console.log("id gedung:", responseGedung);

        for(let i = 1; i <= jumlahAisle.value; i++){
            const aisleData = {
                Gedung_Id: responseGedung,
                Aisle_Name: `${gedungName.value}-${i}`
            }

            const responseAisle = await exec4("/TambahAisle", aisleData, 'POST');
            console.log(responseAisle);

            for(let j = 1; j <= jumlahShelf.value; j++){
                const shelfData = {
                    Aisle_Id: responseAisle,
                    Shelf_Name: `${gedungName.value}-${i}-${j}`,
                    Temperature: temp.value
                }

                const responseShelf = await exec4("/TambahShelf", shelfData, "POST");
                console.log(responseShelf);

                for(let k = 1; k <= jumlahPallete.value; k++){
                    const palletData = {
                        Shelf_Id: responseShelf,
                        Pallete_Name: `${gedungName.value}-${i}-${j}-${k}`,
                        Kategori: category.value,
                        Slot: 1,
                        Kapasitas: kapasitas.value
                    }

                    const responsePallet = await exec4("/TambahPallete", palletData, "POST");
                    console.log(responsePallet);
                }
            }
        }
    })
})