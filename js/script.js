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


// Navbar Buttons
// Магазины
document.getElementById("menuButton-1").onclick = function () { 
    localStorage.setItem("category", "Магазины");
    window.location.href = "stores.html"; 
};
// Развлечения
document.getElementById("menuButton-2").onclick = function () { 
    localStorage.setItem("category", "Развлечения");
    window.location.href = "stores.html"; 
};
// Еда
document.getElementById("menuButton-3").onclick = function () { 
    localStorage.setItem("category", "Еда");
    window.location.href = "stores.html"; 
};
// Детям
document.getElementById("menuButton-4").onclick = function () { 
    localStorage.setItem("category", "Детям");
    window.location.href = "stores.html"; 
};
// Контакты
document.getElementById("menuButton-5").onclick = function () { 
    var modal = new bootstrap.Modal(document.getElementById('contactsModal'), {
        keyboard: false
    })
    modal.toggle()
};
// Обратная связь
document.getElementById("menuButton-6").onclick = function () { 
    var modal = new bootstrap.Modal(document.getElementById('feedbackModal'), {
        keyboard: false
    })
    modal.toggle()
};
// О ГАЛЕРЕИ
document.getElementById("menuButton-7").onclick = function () { 
    var modal = new bootstrap.Modal(document.getElementById('aboutModal'), {
        keyboard: false
    })
    modal.toggle()
};
// Правила ГАЛЕРЕИ
document.getElementById("menuButton-8").onclick = function () { 
    var modal = new bootstrap.Modal(document.getElementById('rulesModal'), {
        keyboard: false
    })
    modal.toggle()
};
// End of Navbar buttons


// Mobile Nav
/* Set the width of the side navigation to 250px */
function open_sidemenu() {
    document.getElementById("sidemenu").style.width = "250px";
}
/* Set the width of the side navigation to 0 */
function close_sidemenu() {
    document.getElementById("sidemenu").style.width = "0";
}

// Mobile Nav Buttons
// Магазины
document.getElementById("sidemenuButton-1").onclick = function () { 
    localStorage.setItem("category", "Магазины");
    window.location.href = "stores.html"; 
};
// Еда
document.getElementById("sidemenuButton-2").onclick = function () { 
    localStorage.setItem("category", "Еда");
    window.location.href = "stores.html"; 
};
// Развлечения
document.getElementById("sidemenuButton-3").onclick = function () { 
    localStorage.setItem("category", "Развлечения");
    window.location.href = "stores.html"; 
};
// Детям
document.getElementById("sidemenuButton-4").onclick = function () { 
    localStorage.setItem("category", "Детям");
    window.location.href = "stores.html"; 
};
// Контакты
document.getElementById("sidemenuButton-5").onclick = function () { 
    var modal = new bootstrap.Modal(document.getElementById('contactsModal'), {
        keyboard: false
    })
    modal.toggle()
};
// Обратная связь
document.getElementById("sidemenuButton-6").onclick = function () { 
    var modal = new bootstrap.Modal(document.getElementById('feedbackModal'), {
        keyboard: false
    })
    modal.toggle()
};
// О ГАЛЕРЕИ
document.getElementById("sidemenuButton-7").onclick = function () { 
    var modal = new bootstrap.Modal(document.getElementById('aboutModal'), {
        keyboard: false
    })
    modal.toggle()
};
// Правила ГАЛЕРЕИ
document.getElementById("sidemenuButton-8").onclick = function () { 
    var modal = new bootstrap.Modal(document.getElementById('rulesModal'), {
        keyboard: false
    })
    modal.toggle()
};

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



// Плавная анимация навбара
const header = document.querySelector('.custom-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
});

