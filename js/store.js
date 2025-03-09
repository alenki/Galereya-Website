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
        // Display stores
        ui.displayStores(stores);

        // open up store if there is need for it
        var pagination_id = localStorage.getItem("pagination");
        if(pagination_id != 0){
            var storeModal = new bootstrap.Modal(document.getElementById('storeModal'));
            var storeModalLabel = document.getElementById("storeModalLabel");
            var storeModalInfo = document.getElementById("storeModalInfo");
            storeModal.show();
            slides.getSlides().then(slides => {
                slides.forEach(slides => {
                    console.log(slides.id);
                    if(slides.id == pagination_id) {
                        storeModalLabel.innerHTML = slides.title;
                        storeModalInfo.innerHTML = slides.description;
                    }
                });
            }).then(()=>{
                localStorage.setItem("pagination", "0");
            });
        }
    })
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
                const logo = item.fields.logo.fields.file.url;
                return {title, description, category, id, image, logo}
            })
            return stores
        } catch(error) {
            console.log(error);
        }
    }
}
// Get carousel elements
class Slides{
    async getSlides(){
      try{
          // get contentful content // Contentful documentation: https://contentful.github.io/contentful.js/contentful/7.5.0/
          // let contentful = await client.getEntries({
          //     content_type: "alenkiStoreContent"
          // });
          let carousel_result = await fetch('../json/carousel.json');
          let data = await carousel_result.json();
          let slides = data.items;
          // let slides = contentful.items;
          slides = slides.map(item =>{
              const {title, description, category} = item.fields;
              const {id} = item.sys;
              const image = item.fields.image.fields.file.url;
              const logo = item.fields.logo.fields.file.url;
              return {title, description, category, id, image, logo}
          })
          return slides
      } catch(error) {
          console.log(error);
      }
    }
  }
  // get all stores
  const slides = new Slides();

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
                        <div class="img-box" id="${stores.id}">
                              <img
                                  src=${stores.logo}
                                  alt="store" 
                                  class="store-img storeButton"
                                  id="${stores.id}"
                                />
                        </div>
                      </div>
                      <!-- <hr style="margin: 0 1.2rem 0 1.2rem; filter: blur(0.5px); opacity: 1px"> -->
                      <div class="store-info storeButton" id="${stores.id}"">
                        <div class="store-name-box storeButton" id="${stores.id}">
                          <h3 class="store-name storeButton" id="${stores.id}">${stores.title}</h3>
                          <p class="store-caption storeButton" id="${stores.id}">${stores.description}</p>
                        </div>
                        <div class="storeButton" id="${stores.id}">
                          <span class="store-floor storeButton" id="${stores.id}">3 этаж</span>
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
// get all stores
const stores = new Stores();
document.onclick = function(e) {
    if(e.target.classList.contains("storeButton")){
        var storeModalLabel = document.getElementById("storeModalLabel");
        var storeModalInfo = document.getElementById("storeModalInfo");

        var storeModal = new bootstrap.Modal(document.getElementById('storeModal'));
        storeModal.show();

        stores.getStores().then(stores => {
            stores.forEach(stores => {
                console.log(stores.id);
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