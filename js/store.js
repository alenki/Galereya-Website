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

            let result = await fetch('../json/stores.json');
            let data = await result.json();
            let stores = data.items;
            // let stores = contentful.items;
            stores = stores.map(item =>{
                const {title, description, category} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title, description, category, id, image}
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
                    <article class="store-block storeButton" id="${stores.id}">
                      <div class="img-container storeButton" id="${stores.id}">
                        <div class="img-box">
                              <img
                                  src=${stores.image}
                                  alt="store" 
                                  class="store-img storeButton"
                                  id="${stores.id}"
                                />
                        </div>
                      </div>
                      <!-- <hr style="margin: 0 1.2rem 0 1.2rem; filter: blur(0.5px); opacity: 1px"> -->
                      <div class="store-info">
                        <div class="store-name-box">
                          <h3 class="store-name" id="1">${stores.title}</h3>
                          <p class="store-caption">${stores.description}</p>
                        </div>
                        <div class="">
                          <span class="store-floor">3 этаж</span>
                        </div>
                          
                      </div>
                    </article>
        <!-- end single stores -->
                `;
            }});
        storesDOM.innerHTML = result;
    }
}


// Detailed store info
document.onclick = function(e) {
    if(e.target.classList.contains("storeButton")){
        const storeModalLabel = document.getElementById("storeModalLabel");
        const storeModalInfo = document.getElementById("storeModalInfo");

        var storeModal = new bootstrap.Modal(document.getElementById('storeModal')); 
        storeModal.show(); 

        // get all stores
        const stores = new Stores();
        stores.getStores().then(stores => {
            stores.forEach(stores => {
                if(stores.id == e.target.id) {
                    storeModalLabel.innerHTML = stores.title;
                    storeModalInfo.innerHTML = stores.description;
                }
            });
        })
    }
};


// Loading stores
// document.addEventListener("DOMContentLoaded", ()=>{
//     const ui = new UI();
//     const stores = new Stores();
//     // get all stores
//     stores.getStores().then(stores => {
//         ui.displayStores(stores);
//     })//.then(()=>{});
// });