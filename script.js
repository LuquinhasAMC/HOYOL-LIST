let CLn = 0;
let SList = document.getElementById("SList");
let CXD = document.getElementById("BErro");
let containerP = document.getElementById("barL");
let CL = document.getElementById("titleL");
let txL = document.getElementById("txAddL");
let LV = document.getElementById("barL");

function add() {
    if (txL.value.trim() === "") {
        CXD.style.display = "block";
        CXD.style.display = "flex";
        CXD.style.alignItems = "center";
        CXD.style.justifyContent = "center";
        CXD.classList.add("fI");
        txL.value = "";
        return;
    }

    let ListB = document.createElement("div");

    CLn ++;
    CL.textContent = `Listas criadas: (${CLn})`;
    ListB.classList.add("LisB");
    LV.appendChild(ListB);
    ListB.innerHTML = `<p class="LisT">${txL.value}</p>
    <button class="btX" onclick="remover(this)"><svg class="btsIcon" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>icon/18/icon-delete</title>
    <desc>Created with Sketch.</desc>
    <defs>

</defs>
    <g id="out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <path fill="currentColor" d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 L4.91666667,14.8888889 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 L15,3.46500003 L15,3.46500003 Z" id="path" fill="#000000" sketch:type="MSShapeGroup">

</path>
    </g>
</svg></button>`;

    localStorage.setItem("elementos", JSON.stringify(containerP.innerHTML));
    containerP.innerHTML = JSON.parse(localStorage.getItem("elementos"));
    localStorage.setItem("ListC", CLn);
    CLn = localStorage.getItem("ListC");

    SList.scrollIntoView({behavior: "smooth", block: "end"});
    txL.value = "";

}

function remover(botao) {
    let ListB = botao.parentElement;
    CLn = Math.max(CLn -1, 0);
    ListB.classList.add("fO");
    setTimeout(() => {
        CL.textContent = `Listas criadas: (${CLn})`;
        localStorage.setItem("ListC", CLn);
        ListB.remove();
        localStorage.setItem("elementos", JSON.stringify(containerP.innerHTML));
    }, 300);
}

let BL = document.getElementById("barLateral");

function callBL() {
    BL.classList.add("fI");
    BL.style.display = "block";
}

function fBL() {
    BL.classList.remove("fI")
    BL.classList.add("fO");
    setTimeout(() => {
        BL.style.display = "none";
    }, 280);
}

function atNv() {
    window.location.href = "AtENv.html";
}

function Voltar() {
    window.location.href = "index.html";
}

function OK() {
    CXD.classList.remove("fI");
    CXD.classList.add("fO");
    setTimeout(() => {
        CXD.style.display = "none";
    }, 280);
}

window.onload = function() {
    containerP.innerHTML = JSON.parse(localStorage.getItem("elementos")) || [];
    CLn = localStorage.getItem("ListC");
    CL.textContent = `Listas criadas: (${CLn})`
}