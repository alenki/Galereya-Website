// Loading screen / Экран загрузки
var loadingScreen = document.querySelector(".loadingScreen");
window.addEventListener('load', function() {
    loadingScreen.style.display = 'none';
})
// End of Loading screen / Экран загрузки

// Navbar Menu Button
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});
// End of Navbar Menu Button

// Back to top button
//Get the button
let toTop_button = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTop_button.style.display = "block";
    } 
    else {
        toTop_button.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
toTop_button.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//End of Back to top button

// Categories
const categoryHeading = document.getElementById("categoryHeading");
var category = localStorage.getItem("category")

window.onload = function() {
    categoryHeading.innerHTML = category;
};

// Магазины
document.getElementById("categoryButton-1").onclick = function () { 
    categoryHeading.innerHTML = 'Магазины';
};

// Магазины
document.getElementById("categoryButton-2").onclick = function () { 
    categoryHeading.innerHTML = 'Еда';
};

// Магазины
document.getElementById("categoryButton-3").onclick = function () { 
    categoryHeading.innerHTML = 'Развлечения';
};

// Магазины
document.getElementById("categoryButton-4").onclick = function () { 
    categoryHeading.innerHTML = 'Детям';
};

// Магазины
document.getElementById("categoryButton-5").onclick = function () { 
    categoryHeading.innerHTML = 'Услуги';
};
// End of Categories