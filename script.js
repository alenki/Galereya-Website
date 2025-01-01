
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

// 2 main buttons on top
var worktimes_btn = document.getElementById("worktimesUnlock");
var worktimes_modal = document.getElementById("worktimesHidden");
var worktimes_isopen = false;
var location_btn = document.getElementById("locationUnlock");
var location_modal = document.getElementById("locationHidden");
var location_isopen = false;

document.onclick = function(e) {
    if ((worktimes_isopen) && (e.target.id !== 'worktimesHidden') && (e.target.id !== 'worktimesUnlock')) {
        worktimes_modal.style.display = "none";
        worktimes_isopen = false;
    }
    if ((location_isopen) && (e.target.id !== 'locationHidden') && (e.target.id !== 'locationUnlock')) {
        location_modal.style.display = "none";
        location_isopen = false;
    }
};
worktimes_btn.onclick = function() {
    if (worktimes_isopen === false) {
        worktimes_modal.style.display = "block";
        worktimes_isopen = true;
    } else {
        worktimes_modal.style.display = "none";
        worktimes_isopen = false;
    }
};
location_btn.onclick = function() {
    if (location_isopen === false) {
        location_modal.style.display = "block";
        location_isopen = true;
    } else {
        location_modal.style.display = "none";
        location_isopen = false;
    }
};
// End of 2 main buttons on top

// 6 Buttons below carousel
// Магазины
document.getElementById("storeButton-1").onclick = function () { 
    window.location.href = "stores.html"; 
};
// End of 6 Buttons below carousel