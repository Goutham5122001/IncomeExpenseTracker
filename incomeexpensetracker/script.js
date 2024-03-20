const balance = document.getElementById("balance");
const description= document.getElementById("desc");
const amount = document.getElementById("amount");
const inc_amt = document.getElementById("inc-amt");
const exp_amt = document.getElementById("exp-amt");
const trans = document.querySelector("#trans");
const form = document.getElementById("form");

// const dummyData =[
//     {id :1, description: "flowers", amount: -20},
//     {id :2, description: "salary", amount: 35000},
//     {id :3, description: "book", amount: -10},
//     {id :4, description: "camera", amount: -150},
//     {id :5, description: "petrol", amount: -250},
// ];

// let transactions = dummyData;

const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !==null?localStorageTrans :[];

function loadTransactonDetails(transactions){
    // console.log(transactions)
    const sign = transactions.amount<0 ? "-" : "+";
    const item =document.createElement("li");
    item.classList.add(transactions.amount<0?"exp":"inc");
    item.innerHTML=`
    ${transactions.description}
    <span>${sign} ${Math.abs(transactions.amount)}</span>
    <button class="btn-del" onclick = "removeTrans(${transactions.id})">X</button>
    `;
    trans.appendChild(item);
}

function removeTrans(id){
    // console.log(id)
    if(confirm("Are you sure you want to delete transcations?")){
        transactions=transactions.filter((transaction) => transaction.id != id);
        config();
        updateLocalStorage();
    }
    else{
        return;
    }
}
function updateAmount(){
    const amounts = transactions.map((transaction) => transaction.amount);
    console.log(amounts)
    const total = amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);
    balance.innerHTML=`₹ ${ total}`

    const income = amounts.filter((item) => item>0).reduce((acc,item)=>(acc += item),0).toFixed(2);
    inc_amt.innerHTML=`₹ ${income}`;

    const expense = Math.abs(amounts.filter((items) => items<0).reduce((acc,items) => (acc +=items
        ),0)).toFixed(2);
    exp_amt.innerHTML =`₹ ${expense}`;



}
function config(){
    trans.innerHTML="";
    transactions.forEach(loadTransactonDetails);
    updateAmount();
}

function addTransaction(e){
    e.preventDefault();
    if(description.value.trim()==""||amount.value .trim()==""){
        alert("Enter All fields")
    }else{
        const transaction ={
            id : uniqueId(),
            description : description.value,
            amount : parseInt(amount.value)
        };
        transactions.push(transaction);
        loadTransactonDetails(transaction);
        amount.value="",
        description.value="",
        updateAmount();
        updateLocalStorage();
    }
}
function uniqueId(){
    return Math.floor(Math.random()*10000000);
}

form.addEventListener("submit", addTransaction);


window.addEventListener("load", function(){
    config();
});

function updateLocalStorage(){
    localStorage.setItem("trans",JSON.stringify(transactions));
}