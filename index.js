var zxcvbn = require('zxcvbn');// SLIDER

const slider = document.getElementById("slider");
const labelValue = document.querySelector(".slider-value");
let max = parseInt(slider.getAttribute("max")); 
let min = parseInt(slider.getAttribute("min")); 
let sliderStepAmount = max - min;  
let stepPercent = 100/sliderStepAmount;

slider.addEventListener("input",function (){
    labelValue.innerHTML = slider.value;
    let progress = (slider.value - min) * stepPercent;
    document.documentElement.style.setProperty('--progress', progress + "%");
});


// Check checkboxes
const checkboxUpper = document.getElementById("0");
const checkboxLower = document.getElementById("1");
const checkboxNums = document.getElementById("2");
const checkboxSymb = document.getElementById("3");
const passwordField = document.querySelector(".password");
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
let allTypes = [upperCaseLetters,lowerCaseLetters,numbers,symbols];


function checkCheckbox() {
    let selectedChars = "";
    function returnSelectedChars(){
    if(!checkboxUpper.checked && !checkboxLower.checked && !checkboxNums.checked && !checkboxSymb.checked){
        checkboxUpper.checked = true;
        checkboxLower.checked = true;
        checkboxNums.checked = true;
    }
    if (checkboxUpper.checked) {
        selectedChars+=allTypes[0];
    }
    if (checkboxLower.checked) {
        selectedChars+=allTypes[1];
    } 
    if (checkboxNums.checked) {
        selectedChars+=allTypes[2];
    } 
    if (checkboxSymb.checked) {
        selectedChars+=allTypes[3];
    } 
    return selectedChars;
    }
    return returnSelectedChars;
}
// GENERATE PASSWORD
function generatePassword(){
    const getSelectedChars = checkCheckbox();
    let selectedChars = getSelectedChars();
    const amountOfChars = slider.value;
    let password = "";
    
    for (let i = 0; i < amountOfChars; i++) {
        const randomIndex = Math.floor(Math.random() * selectedChars.length);
        password += selectedChars[randomIndex];
        selectedChars = selectedChars.slice(0, randomIndex) + selectedChars.slice(randomIndex + 1);
    }

    passwordField.textContent = password;
    //password cheker
    const result = zxcvbn(password);
    document.querySelector(".easy").style.backgroundColor = "unset"
    document.querySelector(".medium").style.backgroundColor = "unset"
    document.querySelector(".hard").style.backgroundColor = "unset"
    document.querySelector(".very-hard").style.backgroundColor = "unset"
    let strengthText = document.querySelector(".cheker p");
    strengthText.textContent = "Medium";
    if(result.score <2){
        document.querySelector(".easy").style.backgroundColor = "#EDCA71"
        strengthText.textContent = "Easy";
      }else if(result.score === 2){
        document.querySelector(".easy").style.backgroundColor = "#EDCA71"
        document.querySelector(".medium").style.backgroundColor = "#EDCA71"
        strengthText.textContent = "Medium";
      }
      else if(result.score === 3){
        document.querySelector(".easy").style.backgroundColor = "#EDCA71"
        document.querySelector(".medium").style.backgroundColor = "#EDCA71"
        document.querySelector(".hard").style.backgroundColor = "#EDCA71"
        strengthText.textContent = "Hard";
      }else{
        document.querySelector(".easy").style.backgroundColor = "#EDCA71"
        document.querySelector(".medium").style.backgroundColor = "#EDCA71"
        document.querySelector(".hard").style.backgroundColor = "#EDCA71"
        document.querySelector(".very-hard").style.backgroundColor = "#EDCA71"
        strengthText.textContent = "Very Hard";
      }}

const btn = document.querySelector("button");
btn.addEventListener("click",generatePassword);

//copy to clipboard
const titleSpan = document.querySelector("span");
function copyPasswordToClipboard() {
    navigator.clipboard.writeText(passwordField.textContent)
        .then(() => {
            titleSpan.textContent = "Copied";
            titleSpan.style.color = "#A5FFAF";
            setTimeout(function() {
                titleSpan.textContent = "Generator";
                titleSpan.style.color = "unset";
            }, 1000); 
        })
        .catch(err => {
            titleSpan.textContent = "Not Copied";
            titleSpan.style.color = "red";
            setTimeout(function() {
                titleSpan.textContent = "Generator";
                titleSpan.style.color = "unset";
            }, 1000);
        });
}
const copyIcon = document.querySelector(".fa-copy");
copyIcon.addEventListener("click", copyPasswordToClipboard);
