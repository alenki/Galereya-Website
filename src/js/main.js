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

// carousel
document.querySelector(".about-post-button").addEventListener("click", () => {
    localStorage.setItem("pagination", pagination_id);
    window.location.href = "stores.html"; 
})

// 6 Buttons below carousel
// Магазины
document.getElementById("storeButton-1").onclick = function () { 
    localStorage.setItem("category", "Магазины");
    window.location.href = "stores.html"; 
};
// Еда
document.getElementById("storeButton-2").onclick = function () { 
    localStorage.setItem("category", "Еда");
    window.location.href = "stores.html"; 
};
// Развлечения
document.getElementById("storeButton-3").onclick = function () { 
    localStorage.setItem("category", "Развлечения");
    window.location.href = "stores.html"; 
};
// Одежда
document.getElementById("storeButton-4").onclick = function () { 
    localStorage.setItem("category", "Одежда");
    window.location.href = "stores.html"; 
};
// Услуги
document.getElementById("storeButton-5").onclick = function () { 
    localStorage.setItem("category", "Услуги");
    window.location.href = "stores.html"; 
};
// End of 6 Buttons below carousel


// // Service buttons
// // Магазины
// document.getElementById("serviceButton-1").addEventListener("click", function() { 
//     localStorage.setItem("category", "Магазины");
//     window.location.href = "stores.html"; 
// });
// // Еда
// document.getElementById("serviceButton-2").addEventListener("click", function() { 
//     localStorage.setItem("category", "Еда");
//     window.location.href = "stores.html"; 
// });
// // Развлечения
// document.getElementById("serviceButton-3").addEventListener("click", function() { 
//     localStorage.setItem("category", "Развлечения");
//     window.location.href = "stores.html"; 
// });
// // Одежда
// document.getElementById("serviceButton-4").addEventListener("click", function() { 
//     localStorage.setItem("category", "Одежда");
//     window.location.href = "stores.html"; 
// });
// // Услуги
// document.getElementById("serviceButton-5").addEventListener("click", function() { 
//     localStorage.setItem("category", "Услуги");
//     window.location.href = "stores.html"; 
// });
// // End of Service buttons


// // Promotion buttons
// // Магазины
// document.getElementById("promotionButton-1").addEventListener("click", function() { 
//     var promotionModal = new bootstrap.Modal(document.getElementById('promotionModal-1')); 
//     promotionModal.show(); 
// });
// // Еда
// document.getElementById("promotionButton-2").addEventListener("click", function() { 
//     var promotionModal = new bootstrap.Modal(document.getElementById('promotionModal-2')); 
//     promotionModal.show(); 
// });
// // Развлечения
// document.getElementById("promotionButton-3").addEventListener("click", function() { 
//     var promotionModal = new bootstrap.Modal(document.getElementById('promotionModal-3')); 
//     promotionModal.show(); 
// });
// // Одежда
// document.getElementById("promotionButton-4").addEventListener("click", function() { 
//     var promotionModal = new bootstrap.Modal(document.getElementById('promotionModal-4')); 
//     promotionModal.show(); 
// });
// // Услуги
// document.getElementById("promotionButton-5").addEventListener("click", function() { 
//     var promotionModal = new bootstrap.Modal(document.getElementById('promotionModal-5')); 
//     promotionModal.show(); 
// });
// // End of Promotion buttons