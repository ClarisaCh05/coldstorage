export function toggleVisibility(){
    const passwordField = document.querySelector('#passwordInp'); // Replace with your input field's ID
    const toggleButton = document.querySelector('#toggleButton');

    toggleButton.addEventListener('click', () => {
        if (passwordField.type === 'password') {
          passwordField.type = 'text';
          toggleButton.classList.remove('fa-eye-slash');
          toggleButton.classList.add('fa-eye');
        } else {
            passwordField.type = 'password';
            toggleButton.classList.remove('fa-eye');
            toggleButton.classList.add('fa-eye-slash');
        }
      });
}

export function amount(){
     var minusButtons = document.querySelectorAll(".minus");
    var plusButtons = document.querySelectorAll(".plus");

    minusButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var input = this.parentElement.querySelector("input");
            var count = parseInt(input.value) - 1;
            count = count < 1 ? 1 : count;
            input.value = count;
            input.dispatchEvent(new Event("change"));
            return false;
        });
    });

    plusButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var input = this.parentElement.querySelector("input");
            input.value = parseInt(input.value) + 1;
            input.dispatchEvent(new Event("change"));
            return false;
        });
    });
}