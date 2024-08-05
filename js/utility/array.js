// inputHandler.js

// Initialize an empty array to store the input data
const dataArray = [];
const dataArray2 = [];

// Function to add data to the array
export function addToDataArray(data) {
    dataArray.push(data);
}

// Function to get the current data array
export function getDataArray() {
    console.log(dataArray)
    return dataArray;
}

// Function to delete an item from the data array by index
export function deleteItemByIndex(index) {
    index -= 1;
    if (index >= 0 && index < dataArray.length) {
        dataArray.splice(index, 1);
    }
}

// Clear the data array (if needed)
export function clearDataArray() {
    dataArray.length = 0;
}

export function addToDataLocation(data) {
    dataArray2.push(data);
}

// Function to get the current data array
export function getDataLocation() {
    console.log(dataArray2)
    return dataArray2;
}

// Function to delete an item from the data array by index
export function deleteLocationByIndex(index) {
    index -= 1;
    if (index >= 0 && index < dataArray2.length) {
        dataArray2.splice(index, 1);
    }
}

// Clear the data array (if needed)
export function clearLocationArray() {
    dataArray2.length = 0;
}

