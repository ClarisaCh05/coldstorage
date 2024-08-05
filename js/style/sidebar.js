document.querySelector(".sidebar .toggle-btn")
.addEventListener("click", function(){
    document.querySelector(".sidebar").classList.toggle("active")
    console.log("Toggle button clicked");
});