const navbar = document.getElementById("navPrincipal");
const navBarBottom = document.getElementById("navPrincipalBottom");
const mainContainerLayout = document.getElementById("mainContainerLayout");
const fabAddBottom = document.getElementById("fabAdd-bottom");
const divDialogContent = document.querySelectorAll(".dialogContainerContente");
const contentVewerLists = document.getElementById("contentVewerLists");

let configArray = [{
  "darkMode": false
}];

let arrayListItems = [{
  "type": "LS",
  "completed": false,
  "title": "Exemplo",
  "description": "Esta é uma lista de exemplo.",
  "itemsForLC": []
}, {
  "type": "LS",
  "completed": true,
  "title": "Exemplo",
  "description": "Esta é uma lista de exemplo.",
  "itemsForLC": []
}
]

const filterListLS = arrayListItems.filter(item => item.type === "LS");
const filterListLC = arrayListItems.filter(item => item.type === "LC");
const filterListCompleted = arrayListItems.filter(item => item.completed === true);
const filterListInProgress = arrayListItems.filter(item => item.completed === false);

if (localStorage.getItem("configArray")) {
  configArray = JSON.parse(localStorage.getItem("configArray"));
}

function preConfigInterface() {
  // DarkMode config
  const switchDarkMode = document.getElementById("SW-darkMode");
  switchDarkMode.checked = configArray[0].darkMode;
  darkMode(configArray[0].darkMode);
}

function atualizarConfigArray() {
  localStorage.setItem("configArray", JSON.stringify(configArray));
}

function darkMode(status) {
  if (status) {
    document.body.classList.add("mdui-theme-dark");
    configArray[0].darkMode = status;
  } else {
    document.body.classList.remove("mdui-theme-dark");
    configArray[0].darkMode = status;
  }
  atualizarConfigArray();
}

function ajustarLayout() {
  if (window.innerWidth <= 780 || window.innerHeight <= 384) {
    navbar.style.display = "none";
    navBarBottom.style.display = "flex";
    mainContainerLayout.style.paddingLeft = "0px";
    mainContainerLayout.style.paddingBottom = navBarBottom.offsetHeight + "px";
    divDialogContent.forEach((content) => {
      content.style.width = "100%";
    });
    fabAddBottom.style.bottom = navBarBottom.offsetHeight + 16 + "px"; // Adjust FAB position
    document.body.style.paddingBottom = navBarBottom.offsetHeight + "px";
  } else {
    navbar.style.display = "flex";
    navBarBottom.style.display = "none";
    mainContainerLayout.style.paddingLeft = navbar.offsetWidth + "px";
    divDialogContent.forEach((content) => {
      content.style.width = "450px";
    });
    mainContainerLayout.style.paddingBottom = "0px";
    document.body.style.paddingBottom = "0px";
  }
}

function abrirDialogBox(IDdialog) {
  const dialog = document.getElementById(IDdialog);
  dialog.open = true;
}

function fecharDialogBox(IDdialog) {
  const dialog = document.getElementById(IDdialog);
  dialog.open = false;
}

window.addEventListener("DOMContentLoaded", () => {
  preConfigInterface();
  ajustarLayout();
});

window.addEventListener("resize", ajustarLayout);