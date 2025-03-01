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

// Mobile Nav
/* Set the width of the side navigation to 250px */
function open_sidenav() {
    document.getElementById("sidenav").style.width = "250px";
}
/* Set the width of the side navigation to 0 */
function close_sidenav() {
    document.getElementById("sidenav").style.width = "0";
}
// End of Mobile Nav

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
