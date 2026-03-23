const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const lsect = document.getElementById("lsect");
const sect = document.getElementById("sect");
const tbl = document.getElementById("tblNumbers");

let total = 0;
let numbersArr = [];

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;
    let regex = /^[0-9]+$/;

    if(txtNumber.match(regex)){
        numbersArr.push(parseInt(txtNumber));
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a positive number");
        document.getElementById("txtNum").value = "";
        return;
    }

    iterateNumbers();
}

btn1.addEventListener("click", insertNumber);

document.getElementById("txtNum").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;

    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    iterateNumbers();
});

btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdLabel = document.createElement("td");
    const tdValue = document.createElement("td");

    tdLabel.style.fontWeight = "bold";
    tdLabel.innerHTML = "TOTAL";
    tdValue.style.textDecoration = "underline";
    tdValue.innerHTML = total;

    trTotal.appendChild(tdLabel);
    trTotal.appendChild(tdValue);
    tbl.appendChild(trTotal);
});

btn5.addEventListener("click", () => {
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    const tdValue = document.createElement("td");

    const highest = Math.max(...numbersArr); 
    const lowest = Math.min(...numbersArr);

    tdLabel.style.fontWeight = "bold";
    tdLabel.textContent = "Result";
    tdValue.textContent = `Highest: ${highest} Lowest: ${lowest}`;

    tr.appendChild(tdLabel);
    tr.appendChild(tdValue);
    tbl.appendChild(tr);
});

sect.addEventListener("change", () => {

    if (sect.value === "Ascending") {
        numbersArr.sort((a, b) => a - b);
    } 
    else if (sect.value === "Descending") {
        numbersArr.sort((a, b) => b - a);
    }

    iterateNumbers();
});

function deleteNumber(i) {
    numbersArr.splice(i,1);
    iterateNumbers();
}

function editNumber(i) {
    const editTxt = prompt("Enter new number: ", numbersArr[i]);
    const regex = /^[0-9]+$/;

    if(editTxt == null || editTxt == "") {
        alert("You did not input a new value!");
    } else {
        if(editTxt.match(regex)) {
            numbersArr[i] = parseInt(editTxt);
            iterateNumbers();
        } else {
            alert("You did not input a valid number!");
        }
    } 
}

function iterateNumbers() {

    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if(numbersArr.length !== 0) {

        total = 0;

        for(let i=0 ; i < numbersArr.length ; i++) {

            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = numbersArr[i];

            td2.style.width = "70px";

            if(numbersArr[i] % 2 == 0) {
                td2.style.color = "green";
                td2.innerHTML = "EVEN";
            } else {
                td2.style.color = "blue";
                td2.innerHTML = "ODD";
            }

            btnDelete.setAttribute("onclick", `deleteNumber(${i})`);
            btnDelete.innerHTML = "Remove";

            btnEdit.setAttribute("onclick", `editNumber(${i})`);
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbl.appendChild(tr);

            total += numbersArr[i];
        }

        btn3.style.display = "inline";
        btn4.style.display = "inline";
        btn5.style.display = "inline";
        lsect.style.display = "inline";
        sect.style.display = "inline";

    } else {

        total = 0;
        btn3.style.display = "none";
        btn4.style.display = "none";
        btn5.style.display = "none";
        lsect.style.display = "none";
        sect.style.display = "none";
    }
  }q
