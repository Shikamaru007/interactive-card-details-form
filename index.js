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
