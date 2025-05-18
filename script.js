let CLn = 0;
let SList = document.getElementById("SList");
let CXD = document.getElementById("BErro");
let containerP = document.getElementById("barL");
let CL = document.getElementById("titleL");
let txL = document.getElementById("txAddL");
let listaContent = [];
const iconLixeira = `<svg class="btsIcon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 109.484 122.88" enable-background="new 0 0 109.484 122.88" xml:space="preserve"><g><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/></g></svg>`

if (localStorage.getItem("listas")) {
    listaContent = JSON.parse(localStorage.getItem("listas"));
}

if (localStorage.getItem("quantia")) {
    CLn = parseInt(localStorage.getItem("quantia") || 0);
}

function atualizarLista() {
    containerP.innerHTML ="";

    listaContent.forEach((item, index) => {
        const listaContainer = document.createElement("div");
        const listaText = document.createElement("p");
        const btExcluir = document.createElement("button");

        containerP.appendChild(listaContainer);
        listaContainer.appendChild(listaText);
        listaContainer.appendChild(btExcluir);

        listaContainer.classList.add("LisB");
        listaText.classList.add("LisT");
        btExcluir.classList.add("btX");
        btExcluir.innerHTML = iconLixeira;

        btExcluir.addEventListener("click", () => excluirLista(index));

        listaText.textContent = item.texto;
    })
}

function excluirLista(index) {
    listaContent.splice(index, 1);
    localStorage.setItem("listas", JSON.stringify(listaContent));

    CLn -= 1;
    if (CLn <= 0) {
        CLn = 0;
    }
    localStorage.setItem('quantia', CLn);
    CL.innerHTML = `Listas criadas: (${CLn})`;

    atualizarLista();
}

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

    CLn += 1;
    localStorage.setItem('quantia', CLn);
    CL.innerHTML = `Listas criadas: (${CLn})`;

    listaContent.unshift({
        texto: txL.value
    });

    localStorage.setItem("listas", JSON.stringify(listaContent));
    atualizarLista();

    SList.scrollIntoView({behavior: "smooth", block: "end"});
    txL.value = "";

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

CLn = localStorage.getItem("quantia");
CL.innerHTML = `Listas criadas: (${CLn})`;
atualizarLista();