// Categories
const categoryHeading = document.getElementById("categoryHeading");

window.onload = function() {
    Load();
};

// Загрузить все в зависимости от фильтра
function Load() {
    var category = localStorage.getItem("category")
    categoryHeading.innerHTML = category;

    // Загрузить все магазины
    const ui = new UI();
    const stores = new Stores();
    // get all stores
    stores.getStores().then(stores => {
        ui.displayStores(stores);
    })//.then(()=>{});
}

// Магазины
document.getElementById("categoryButton-1").onclick = function () { 
    localStorage.setItem("category", "Магазины");
    Load();
};

// Еда
document.getElementById("categoryButton-2").onclick = function () { 
    localStorage.setItem("category", "Еда");
    Load();
};

// Развлечения
document.getElementById("categoryButton-3").onclick = function () { 
    localStorage.setItem("category", "Развлечения");
    Load();
};

// Детям
document.getElementById("categoryButton-4").onclick = function () { 
    localStorage.setItem("category", "Детям");
    Load();
};

// Услуги
document.getElementById("categoryButton-5").onclick = function () { 
    localStorage.setItem("category", "Услуги");
    Load();
};
// End of Categories


// getting the stores
class Stores{
    async getStores(){
        try{

            // get contentful content // Contentful documentation: https://contentful.github.io/contentful.js/contentful/7.5.0/
            // let contentful = await client.getEntries({
            //     content_type: "alenkiStoreContent"
            // });

            let result = await fetch('stores.json');
            let data = await result.json();
            let stores = data.items;
            // let stores = contentful.items;
            stores = stores.map(item =>{
                const {title, category} = item.fields;
                const image = item.fields.image.fields.file.url;
                return {title, category, image}
            })
            return stores
        } catch(error) {
            console.log(error);
        }
    }
}

//display stores
const storesDOM = document.querySelector('.stores-center');
class UI {
    displayStores(stores){
        let result = '';
        var category = localStorage.getItem("category");
        stores.forEach(stores => {
            if(stores.category == category){
                result += `                            
        <!-- single stores -->
        <article class="store_block">
            <div class="img-container">
            <img 
                src=${stores.image}
                alt="store" 
                class="store-img"
            />
            </div>
            <h3>${stores.title}</h3>
        </article>
        <!-- end single stores -->
                `;
            }});
        storesDOM.innerHTML = result;
    }
}


// Loading stores
// document.addEventListener("DOMContentLoaded", ()=>{
//     const ui = new UI();
//     const stores = new Stores();
//     // get all stores
//     stores.getStores().then(stores => {
//         ui.displayStores(stores);
//     })//.then(()=>{});
// });