// tic tac toe game query
let boxes=document.querySelectorAll(".box");
let rstBtn=document.querySelector(".rstBtn");
let newMsg=document.querySelector("#newMsg");
let newBtn=document.querySelector(".newBtn");
let msgContainer=document.querySelector(".msgContainer");
let turno=true;
const winpattern = [
    [0,3,6],
    [0,4,8],
    [0,1,2],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const resetGame= ()=>{
    turno=true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turno){
            box.innerText=("O");
            turno=false;
        }
        else{
            box.innerText=("X");
            turno=true;
        }
        box.disabled=true;
        checkWinner();
    });
});
let disableBoxes =()=>{
    for(box of boxes){
        box.disabled=true;
    }}
    let enableBoxes =()=>{
        for(box of boxes){
            box.disabled=false;
            box.innerText="";
        }
}
const showWinner =(Winner)=>{
newMsg.innerText=`Congratulations the winner is ${Winner}`;
msgContainer.classList.remove("hide");
disableBoxes();
}
const checkWinner =() =>{
for (let patterns of winpattern){
    let post1=boxes[patterns[0]].innerText;
    let post2=boxes[patterns[1]].innerText;
    let post3=boxes[patterns[2]].innerText;
    if(post1 != "",post2 != "",post3 != ""){
        if(post1===post2 && post2===post3){
            console.log("winner", post1);
            showWinner(post1);
        }
    }
}
}
newBtn.addEventListener("click", resetGame);
rstBtn.addEventListener("click", resetGame);

// counter starts

const counts = document.querySelectorAll('.count')
const speed = 97

counts.forEach((counter) => {
    function upDate(){
        const target = Number(counter.getAttribute('data-target'))
        const count = Number(counter.innerText)
        const inc = target / speed        
        if(count < target){
            counter.innerText = Math.floor(inc + count) 
            setTimeout(upDate, 15)
        }else{
            counter.innerText = target
        }
    }
    upDate()
})
// counter ends
// currency converter queries
const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form formbtn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};



btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});