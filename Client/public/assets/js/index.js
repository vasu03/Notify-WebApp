// handling the navbar actions
const hamburger = document.querySelector(".hamMenu-btn");
const hamIcon = document.querySelector("#ham-icon");
const closeMenu = document.querySelector(".closeMenu-btn");
const nav = document.querySelector(".left-nav");
const header = document.querySelector(".header");
const mainContainer = document.querySelector(".main-container");

hamburger.addEventListener("click", ()=>{
    nav.classList.toggle("active-reveal");
    hamIcon.classList.add("hide");
    header.classList.add("move-up");    
});
closeMenu.addEventListener("click", ()=>{
    nav.classList.remove("active-reveal");
    hamIcon.classList.remove("hide");
    header.classList.remove("move-up");    

});
mainContainer.addEventListener("click", ()=>{
    nav.classList.remove("active-reveal");
    hamIcon.classList.remove("hide");
    header.classList.remove("move-up");
});

//  handling the leftNavbar actions
const topNavVert = document.querySelector(".top-nav-vertical");
if(window.innerWidth <= 480){
    topNavVert.style.display = "flex";
}else{
    topNavVert.style.display = "none";
}