function add() {
    let txL = document.getElementById("txAddL");
    let LV = document.getElementById("barL");
    let ListB = document.createElement("div");
    let ListT = document.createElement("p");
    let btX = document.createElement("button")
    if (txL.value === "") return;
    ListB.classList.add("LisB");
    ListT.classList.add("LisT");
    btX.classList.add("btX");
    LV.appendChild(ListB);
    ListB.appendChild(ListT);
    ListB.appendChild(btX);
    ListT.textContent = txL.value;
    btX.textContent = "x";
    btX.addEventListener('click', function() {
        ListB.remove();
    });
    txL.value = "";
}