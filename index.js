const inputSlider=document.querySelector(".range");
const lenghtDisplay =document.querySelector(".datalengthNumber");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn =document.querySelector("[data-copy]");
const copyMsg =document.querySelector("[data-copyMsg]");

const lowercaseCheck=document.querySelector("#lowercase");
const uppercaseCheck=document.querySelector("#uppercase");
const numbersCheck=document.querySelector("#number");
const symbolsCheck=document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelector("input[type=checkbox]");
var password= "";
var passwordLength = 10;
let checkCount =0;
let symbol = '~!@#$%^&*()_+[]{}\|?/.>,<:;';

console.log("from topr");

//set password
function handleSlider(){
    inputSlider.value = passwordLength;
    lenghtDisplay.innerText=passwordLength;

}  

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}



handleSlider();
 
console.log("starting the journey");

function setIndicator(color){
    indicator.style.backgroundColor =color;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()* (max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}


function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}


function generateSymbol(){
    const rand = getRndInteger(0,symbol.length);
    return symbol.charAt[rand]
}


function calStrength(){
    let hasUpper = false;
    let haslower =false;
    let hasNum = false;
    let hasSym = false;
     
    if(uppercaseCheck.checked) hasUpper= true;

    if(lowercaseCheck.checked) haslower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if (hasUpper && haslower && (hasNum || hasSym) && passwordLength >=8) {
        setIndicator("#0f0");

    } else if(
        (haslower || hasUpper) &&
        (hasNum ||hasSym) &&
        passwordLength >=6
    ){
        setIndicator("#ff0")
    }
    else {
        setIndicator("#f00")
    }
}


async function  copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText ="copied";
    }

    catch(e){
        copyMsg.innerText = "failed";
    }
    //to make the copy span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

console.log("before range bar");

inputSlider.addEventListener("input",(e) => {
passwordLength = e.target.value;
handleSlider();
})
console.log(copyBtn);
copyBtn.addEventListener("click", ( ) => {
    if (passwordDisplay.value)
    copyContent();
     
})
console.log("after copy btn");

function handleCheckBoxChange(){
    checkCount=0;
   Array.from(allCheckBox).forEach(  (checkbox) => {
      if (checkbox.checked) 
      checkCount++;  
    } )
}
 
if (passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
}
console.log(allCheckBox);
Array.from(allCheckBox).forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
} )


console.log("before generating btn");
console.log(generateBtn)


generateBtn.addEventListener('click',( ) => {
    // if(checkCount == 0 ) return
     
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider()
    }
    console.log("inside the genereate btn");

        //remove old password 
        password ="";

        let funcArr = [];

        if (uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

        if (lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

        if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

        if(symbolsCheck.checked)
        {funcArr.push(generateSymbol);
        }

        for (i=0; funcArr.length> i;i++){
            password += funcArr[i]();

            console.log(password);
        }



         //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        console.log(funcArr.length);
        max=funcArr.length;
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex " + randIndex);
        
        password += funcArr[randIndex]();
        console.log(password);
    }


    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calStrength();
})     