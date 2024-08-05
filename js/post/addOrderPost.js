import { exec } from "../utility/util.js";
import { getDataArray, getDataLocation } from "../utility/array.js";

export async function postOrder() {
    document.addEventListener("DOMContentLoaded", () => {
    
        console.log("data:", getDataArray())
        
        console.log("distribusi:", getDataLocation())
    
    })
} 