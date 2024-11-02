const nameInput = document.getElementById("cardName");
const numberInput = document.getElementById("cardNumber");
const expiryMonthInput = document.getElementById("expiryDateMonth");
const expiryYearInput = document.getElementById("expiryDateYear");
const cvcInput = document.getElementById("cvc");
const cardNameDisplay = document.getElementById("cardNameDisplay");
const cardNumberDisplay = document.getElementById("cardNumberDisplay");
const cardExpiryMonthDisplay = document.getElementById("cardMonthDisplay");
const cardExpiryYearDisplay = document.getElementById("cardYearDisplay");
const cvcDisplay = document.getElementById("cardCvcDisplay");


nameInput.addEventListener("input", () => {
    cardNameDisplay.textContent = nameInput.value || "JANE APPLESEED";    
});

numberInput.addEventListener('input', () => {
    const onlyNumbers = numberInput.value.replace(/\D/g, '');
    const withCardFormat = onlyNumbers.replace(/(\d{4})(?=\d)/g, "$1 ");
    numberInput.value = withCardFormat.trim();
    let displayNumber = '0000 0000 0000 0000';

    for (let i = 0; i < onlyNumbers.length; i++){
        displayNumber = displayNumber.replace('0', onlyNumbers[i]);
    }

    cardNumberDisplay.textContent = displayNumber;
    cardNumberDisplay.value = displayNumber.trim();
});

expiryMonthInput.addEventListener("input", () => {
    const onlyNumbers = expiryMonthInput.value.replace(/\D/g, '');
    expiryMonthInput.value = onlyNumbers;
    cardExpiryMonthDisplay.textContent = (expiryMonthInput.value).padStart(2, 0) || "00";
});

expiryYearInput.addEventListener("input", () => {
    const onlyNumbers = expiryYearInput.value.replace(/\D/g, '');
    expiryYearInput.value = onlyNumbers;
    cardExpiryYearDisplay.textContent = (expiryYearInput.value).padStart(2, 0) || "00";
});

cvcInput.addEventListener("input", () => {
    const onlyNumbers = cvcInput.value.replace(/\D/g, '');
    cvcInput.value = onlyNumbers;
    cvcDisplay.textContent = (cvcInput.value).padStart(3, 0) || "000";
});

// Function to listen to when the button is clicked to submit the form.
document.getElementById("cardForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true; // This helps us check if the whole form is valid before submitting.

    // Validating the  name input field.
    if(nameInput.value === ""){
        nameInput.parentElement.classList.add("error");
        isValid = false;
    }else {
        nameInput.parentElement.classList.remove("error");
    }

    // Validating the card number input field.
    if(numberInput.value === ""){
        numberInput.parentElement.classList.add("error");
        numberInput.parentElement.nextElementSibling.textContent = "Can't be blank";
        isValid = false;
    }else {
        numberInput.parentElement.classList.remove("error");
    }

    // Validating the expiry date fields.
    if(expiryMonthInput.value === "" || expiryYearInput.value === ""){
        isValid = false;
        expiryMonthInput.parentElement.parentElement.classList.add("error");
        expiryYearInput.parentElement.parentElement.classList.add("error");
        expiryMonthInput.parentElement.parentElement.nextElementSibling.textContent = "Can't be blank";
    }
    else if(!validateExpiryDate(parseInt(expiryYearInput.value), parseInt(expiryMonthInput.value))){
        isValid = false;
        expiryMonthInput.parentElement.parentElement.classList.add("error");
        expiryYearInput.parentElement.parentElement.classList.add("error");
        expiryMonthInput.parentElement.parentElement.nextElementSibling.textContent = "Incorrect Date";
    }
    else {
        expiryMonthInput.parentElement.parentElement.classList.remove("error");
        expiryYearInput.parentElement.parentElement.classList.remove("error");
    }

    // Validating the CVC input field.
    if(cvcInput.value === ""){
        cvcInput.parentElement.classList.add("error");
        isValid = false;
    }else {
        cvcInput.parentElement.classList.remove("error");
    }
    
    // Check if the input fields on the page are valid and proceed to success message.
    if(!isValid){
        document.getElementById("details").classList.remove("success");
        return
    }else {
        document.getElementById("details").classList.add("success");
        document.getElementById("continue").addEventListener("click", () => {
            document.getElementById("details").classList.remove("success");
            document.getElementById("cardForm").reset();
            resetCardDisplay();
        });
    }

});

// Function to validate the date input by the user if its a valid calender date.
function validateExpiryDate(year, month){
    year+= 2000;

    const userExpiryDate = new Date(year, month - 1);

    if(year !== userExpiryDate.getFullYear() || month - 1 !== userExpiryDate.getMonth()){
        return false;
    }else {
        return true;
    }
}

// Function to reset the card display values to their default.
function resetCardDisplay(){
    cardNumberDisplay.textContent = "0000 0000 0000 0000";
    cardNameDisplay.textContent = "JANE APPLESEED";
    cardExpiryYearDisplay.textContent = "00";
    cardExpiryMonthDisplay.textContent = "00";
    cvcDisplay.textContent = "000"
}
