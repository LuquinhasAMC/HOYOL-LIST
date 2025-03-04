let CLn = 0;
let SList = document.getElementById("SList");

function add() {
    let CL = document.getElementById("titleL");
    let txL = document.getElementById("txAddL");
    let LV = document.getElementById("barL");
    let ListB = document.createElement("div");
    let ListT = document.createElement("p");
    let btX = document.createElement("button")
    if (txL.value.trim() === "") {
        alert("Digite algo para criar uma nova lista");
        txL.value = "";
        return;
    }

    SList.scrollIntoView({behavior: "smooth", block: "end"});
    CLn ++;
    CL.textContent = `Listas criadas: (${CLn})`;
    ListB.classList.add("LisB");
    ListT.classList.add("LisT");
    btX.classList.add("btX");
    LV.appendChild(ListB);
    ListB.appendChild(ListT);
    ListB.appendChild(btX);
    ListT.textContent = txL.value;
    btX.innerHTML = `<svg class="btsIcon" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>icon/18/icon-delete</title>
    <desc>Created with Sketch.</desc>
    <defs>

</defs>
    <g id="out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <path fill="currentColor" d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 L4.91666667,14.8888889 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 L15,3.46500003 L15,3.46500003 Z" id="path" fill="#000000" sketch:type="MSShapeGroup">

</path>
    </g>
</svg>`;
    btX.addEventListener('click', function() {
        CLn = Math.max(CLn -1, 0);
        ListB.classList.add("EXA");
        setTimeout(() => {
            CL.textContent = `Listas criadas: (${CLn})`;
            ListB.remove();
        }, 340);
    });
    txL.value = "";
}