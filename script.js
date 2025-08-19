const navbar = document.getElementById("navPrincipal");
const navBarBottom = document.getElementById("navPrincipalBottom");
const mainContainerLayout = document.getElementById("mainContainerLayout");
const fabAddBottom = document.getElementById("fabAdd-bottom");

function ajustarNavbar() {
  if (window.innerWidth <= 780) {
    navbar.style.display = "none";
    navBarBottom.style.display = "flex";
    mainContainerLayout.style.paddingLeft = "0px";
    mainContainerLayout.style.paddingBottom = navBarBottom.offsetHeight + "px";
    fabAddBottom.style.bottom = navBarBottom.offsetHeight + 16 + "px"; // Adjust FAB position
    document.body.style.paddingBottom = navBarBottom.offsetHeight + "px";
  } else {
    navbar.style.display = "flex";
    navBarBottom.style.display = "none";
    mainContainerLayout.style.paddingLeft = navbar.offsetWidth + "px";
    mainContainerLayout.style.paddingBottom = "0px";
    document.body.style.paddingBottom = "0px";
  }
}

ajustarNavbar();

window.addEventListener("resize", ajustarNavbar);