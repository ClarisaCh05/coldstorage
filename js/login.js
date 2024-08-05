import { toggleVisibility } from "./style/btn.js";
import { exec3 } from "./utility/util.js"; 
toggleVisibility()

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.querySelector("#form-login");
    const email = document.querySelector("[name='Email']");
    const password = document.querySelector("[name='Password']")

    const userId = localStorage.getItem("userId");
    console.log(userId);

    document.addEventListener("submit", async (e) => {
        e.preventDefault()

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        console.log(object)

        const dataInput = {
            Email: email.value,
            Password: password.value
        }

        try {
            let data = await exec3("/loginAdmin", dataInput, "POST");
            console.log("data", data);
          
            // Check if the response has a successful status code (e.g., 2xx)
            if (data > 0) {
              // Successful login
              window.location.href = `home.html?Id=${data}`; // Adjust as needed
              console.log("Login successful");
            } else {
                console.log("Login failed");
                window.alert("Login failed")
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Error during login:", error);
        }
          
    })
})

