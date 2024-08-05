import { deleteStorage } from "./utility/util.js"

document.addEventListener("DOMContentLoaded", () => {
    const yearStat = document.querySelector(".year-stats");
    let data = [{month: "January", qty: "20"},{month: "Febuary", qty: "45"},{month: "March", qty: "80"},{month: "April", qty: "50"},{month: "May", qty: "30"}, {month: "Juni", qty: "10"}]
    let text = "";

    for(const x of data) {
        let index = parseInt(x.qty)
        text += `
        <div class="month">
            <div class="bar" style="height: ${index + 100}px; width: 64px;"></div>
            <p>${x.month}</p>
        </div>`
    }

    yearStat.innerHTML = text;

    //
    const chart2 = document.querySelector(".chart-2");
    let dataCategory = [{category: "Meat", qty: "30"}, {category: "Fish", qty: "50"}, {category: "Others", qty: "80"}]
    let text2 = "";

    for(const y of dataCategory){
        text2 += `
        <div class="horizontal-bar">
            <div class="detail2">
                <label>${y.category}</label><span>${y.qty} items</span>
            </div>
            <div class="background" style="width: 100%; height: 20px;">
                <div class="bar-length" style="width: ${y.qty}%; height: 20px;"></div>
            </div>
        </div>`
    }

    chart2.innerHTML = text2;

    //
    const chart3 = document.querySelector(".chart-3");
    let dataSlot = [{building: "Building A", slots: "20"}, {building: "Building B", slots: "60"}, {building: "Building C", slots: "10"}, {building: "Building A", slots: "9"}]
    let text3 = "";

    for(const z of dataSlot){
        let index2 = parseInt(z.slots)
        text3 += `
        <div class="slots">
            <div class="bar" style="height: ${index2 + 150}px; width: 64px;"></div>
            <p>${z.building}</p>
        </div>`
    }

    chart3.innerHTML = text3;

    const chart6 = document.querySelector(".chart-6");
    let dataWeight = [{weight: "0-20 Kg", total: "20"}, {weight: "20-60 Kg", total: "40"}, {weight: "60-80 Kg", total: "60"}];
    let text4 = "";

    for(const a of dataWeight){
        let index3 = parseInt(a.total)
        text4 += `
        <div class="slots">
            <div class="bar" style="height: ${index3 + 150}px; width: 64px;"></div>
            <p>${a.weight}</p>
        </div>`
    }

    chart6.innerHTML = text4;

    deleteStorage();
})