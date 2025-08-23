const navbar = document.getElementById("navPrincipal");
const navBarBottom = document.getElementById("navPrincipalBottom");
const mainContainerLayout = document.getElementById("mainContainerLayout");
const fabAddBottom = document.getElementById("fabAdd-bottom");
const divDialogContent = document.querySelectorAll(".dialogContainerContente");
const contentVewerLists = document.getElementById("contentVewerLists");
const noContentVewer = document.getElementById("noContentVewer");

const inputTitleLS = document.getElementById("inputTitleLS");
const inputDescriptionLS = document.getElementById("inputDescriptionLS");

const navStatusList = document.getElementById("navStatusList");

let indexItemList = null;

let configArray = [{
  "darkMode": false
}];

let arrayListItems = []

let atualTypeList = arrayListItems;
let type = undefined;

let filterListLS = arrayListItems.filter(item => item.type === "LS");
let filterListLC = arrayListItems.filter(item => item.type === "LC");
let filterListCompleted = atualTypeList.filter(item => item.completed === true);
let filterListInProgress = atualTypeList.filter(item => item.completed === false);

if (localStorage.getItem("configArray")) {
  configArray = JSON.parse(localStorage.getItem("configArray"));
}

if (localStorage.getItem("arrayListItems")) {
  arrayListItems = JSON.parse(localStorage.getItem("arrayListItems"));
}

function saveArrayListItem() {
  localStorage.setItem("arrayListItems", JSON.stringify(arrayListItems));
  atualTypeList = arrayListItems;
}

function arrayListItemsFilterAtualizar() {
  filterListLS = arrayListItems.filter(item => item.type === "LS");
  filterListLC = arrayListItems.filter(item => item.type === "LC");
  filterListCompleted = atualTypeList.filter(item => item.completed === true);
  filterListInProgress = atualTypeList.filter(item => item.completed === false);
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
  IDdialog = "";
}

function fecharDialogBox(IDdialog) {
  const dialog = document.getElementById(IDdialog);
  dialog.open = false;
}

function statusListFilter(arrayItem) {
  if (type === "all" || type === undefined) {
    atualTypeList = arrayListItems;
  } else if (type === "LS") {
    atualTypeList = filterListLS;
  } else if (type === "LC") {
    atualTypeList = filterListLC;
  }
  console.log(arrayItem)
  viewContentLists(arrayItem);
}

function navTypeList(value, arrayList) {
  navStatusList.value = "all-lists";
  type = value;
  navBarBottom.value = value;
  navbar.value = value;
  viewContentLists(arrayList);
}

function viewContentLists(arrayItem) {
  arrayListItemsFilterAtualizar()
  listsCreateContent(arrayItem);
  if (arrayItem.length === 0) {
    noContentVewer.style.display = "flex";
    contentVewerLists.style.display = "none";
  } else {
    noContentVewer.style.display = "none";
    contentVewerLists.style.display = "flex";
  }
}

function checkList(index, element) {
  arrayListItems[index].completed = element;
  arrayListItemsFilterAtualizar();
  saveArrayListItem();
}

function confirmarExcluirLista() {
  arrayListItems.splice(indexItemList, 1);
  fecharDialogBox("excluirLista-dialog");
  indexItemList = null;
  listsCreateContent(arrayListItems);
  viewContentLists(arrayListItems);
}

function cancelarExcluirLista() {
  fecharDialogBox("excluirLista-dialog");
  indexItemList = null;}

function listsCreateContent(arrayList) {
  contentVewerLists.innerHTML = "";

  arrayList.forEach((item, index) => {
    const containerList = document.createElement("mdui-card");
    const containerTopList = document.createElement("div");
    const containerTitleList = document.createElement("div");
    const checkBox = document.createElement("mdui-checkbox");
    const titleList = document.createElement("h4");
    const containerActionList = document.createElement("div");
    const buttonExcluirList = document.createElement("mdui-button-icon");
    const descriptionList = document.createElement("p");

    contentVewerLists.appendChild(containerList);
    containerList.appendChild(containerTopList);
    containerTopList.appendChild(containerTitleList);
    containerTopList.appendChild(descriptionList);
    containerTitleList.appendChild(checkBox);
    containerTitleList.appendChild(titleList);
    containerTitleList.appendChild(containerActionList);
    containerActionList.appendChild(buttonExcluirList);
    buttonExcluirList.innerHTML = `<mdui-icon>delete</mdui-icon>`;

    containerList.classList.add("listItem-card");
    containerTopList.classList.add("listItem-card-top");
    containerTitleList.classList.add("listItem-card-title");
    containerActionList.classList.add("listItem-card-action");
    titleList.classList.add("listItem-title");
    descriptionList.classList.add("listItem-description");

    checkBox.checked = item.completed;
    titleList.textContent = item.title;
    descriptionList.textContent = item.description;

    checkBox.addEventListener("change", function() {
      checkList(index, this.checked)
    });

    buttonExcluirList.addEventListener("click", () => {
      abrirDialogBox("excluirLista-dialog");
      indexItemList = index;
    });
  })

  saveArrayListItem();
  arrayListItemsFilterAtualizar();
}

function createLS() {

  if (inputTitleLS.value === "") {
    mdui.snackbar({
      message: 'O título não pode estar vazio.',
      position: 'top',
      timeout: 2000
    });
    return;
  }

  const newList = {
    "type": "LS",
    "completed": false,
    "title": inputTitleLS.value,
    "description": inputDescriptionLS.value,
    "itemsForLC": []
  };

  arrayListItems.unshift(newList);
  viewContentLists(arrayListItems);
  arrayListItemsFilterAtualizar();

  // Clear input fields
  inputTitleLS.value = "";
  inputDescriptionLS.value = "";
  fecharDialogBox("createLSSecreen");
}

window.addEventListener("DOMContentLoaded", () => {
  preConfigInterface();
  ajustarLayout();
});

viewContentLists(arrayListItems);

window.addEventListener("resize", ajustarLayout);