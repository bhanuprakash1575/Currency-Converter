const BASE_URL =  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdowns = document.querySelectorAll("select");
let getexchange = document.querySelector("#submit");
let swapBtn = document.querySelector("#swapBtn");
let input = document.querySelector("#Amount");
let fromCurr = dropdowns[0];
let toCurr = dropdowns[1];
let formImg = fromCurr.parentElement.querySelector("img");
let toImg = toCurr.parentElement.querySelector("img");
let msg = document.querySelector(".msg-container");
let rotation =0;



function updateFlag(drop,currCode){
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = drop.parentElement.querySelector("img");
    img.src = newSrc;
}

for(drop of dropdowns){
    for(countrycode in countryList){
        let option = document.createElement("option");
        option.innerText = countrycode;
        if(drop.getAttribute("id")=="from-container--countries" && countrycode == "USD"){
            option.selected = "selected";
            updateFlag(drop,"USD");
        }
        if(drop.getAttribute("id")=="to-container--countries" && countrycode == "INR"){
            option.selected = "selected";
            updateFlag(drop,"INR");
        }
        drop.append(option);    

    }
}

dropdowns.forEach((dropdown)=>{
    dropdown.addEventListener("change",()=>{
       updateFlag(dropdown,dropdown.value);
    })
});

swapBtn.addEventListener("click",()=>{
    let tempsrc = formImg.src;
    formImg.src = toImg.src;
    toImg.src = tempsrc;


    let tempval = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempval;

    rotation +=180;
    swapBtn.style.transform = `rotate(${rotation}deg)`

})
getexchange.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    if(input.value<=0){
        input.value=1;
    }
    
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
  
    let finalAmount = input.value * rate;
    msg.innerText = `${input.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})





function handleResize() {
    var windowWidth = window.innerWidth;
    console.log('Window Width: ' + windowWidth);
    if(windowWidth<321){
        var fontSize = windowWidth * 0.04;
        document.documentElement.style.fontSize = fontSize + 'px';  
    }
 
  }
  
  window.addEventListener('resize', handleResize);
  handleResize();
  