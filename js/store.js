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