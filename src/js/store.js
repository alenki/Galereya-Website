// Contentful
import * as contentful from 'contentful'
const client = contentful.createClient({
    space: 'ruy22jhhank3',
    environment: 'master', // defaults to 'master' if not set
    accessToken: '0GUZEP5q3E4HSXJ1UXX2W6TRuyRdHPFzaIOECAXA1YA'
})

// Categories
const categoryHeading = document.getElementById("categoryHeading");

window.onload = function() {
    Load();
};

// Загрузить все в зависимости от фильтра
async function Load() {
    // Загрузить все магазины
    const ui = new UI();
    const stores = new Stores();
    // get all stores
    await stores.getStores().then(stores => {
        // Display stores
        ui.displayStores(stores);
        // open up store if there is need for it
        var pagination_id = localStorage.getItem("pagination");
        if(pagination_id != 0){
            var storeModal = new bootstrap.Modal(document.getElementById('storeModal'));
            var storeModalLabel = document.getElementById("storeModalLabel");
            var storeModalInfo = document.getElementById("storeModalInfo");
            var storeSlide_title = localStorage.getItem("slide_title");
            var storeSlide_description = localStorage.getItem("slide_description");
            var storeSlide_category = localStorage.getItem("slide_category");
            storeModal.show();
                stores.forEach(stores => {
                    storeModalLabel.innerHTML = storeSlide_title;
                    storeModalInfo.innerHTML = storeSlide_description;
                    localStorage.setItem("category", storeSlide_category);
                })
        }
        
        // open up service if there is need for it
        var service_open = localStorage.getItem("service");
        if(service_open == "open"){
                        var serviceModal = new bootstrap.Modal(document.getElementById('serviceModal')); 
                        var serviceModalTitle = document.querySelector(".serviceModal_title");
                        var serviceModalDescription = document.querySelector(".serviceModal_description");
                        var serviceSlide_title = localStorage.getItem("service_slide_title");
                        var serviceSlide_description = localStorage.getItem("service_slide_description");
                        serviceModal.show(); 
                        serviceModalTitle.innerHTML = serviceSlide_title;
                        serviceModalDescription.innerHTML = serviceSlide_description;
        }

        // open up promotion if there is need for it
        var promotion_open = localStorage.getItem("promotion");
        if(promotion_open == "open"){
            openStore(localStorage.getItem("promotion_id"));
        }
        // update category
        var category = localStorage.getItem("category")
        categoryHeading.innerHTML = category;
    })
    localStorage.setItem("promotion", "closed");
    localStorage.setItem("service", "closed");
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

// Одежда
document.getElementById("categoryButton-4").onclick = function () { 
    localStorage.setItem("category", "Одежда");
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
            let store_data = await client.getEntries({
                content_type: "galereyaStores"
            });
            // let result = await fetch('/json/stores.json');
            // let data = await result.json();
            let stores = store_data.items;
            stores = stores.map(item =>{
                const {title, description, category, id, floor, image} = item.fields;
                const logo = item.fields.logo.fields.file.url;
                return {title, description, category, id, floor, image, logo}
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
                          <span class="store-floor storeButton" id="${stores.id}">${stores.floor} этаж</span>
                        </div>
                          
                      </div>
                    </article>
        <!-- end single stores -->
                `;
            }});
        storesDOM.innerHTML = result;
    }
}


// Открытие модального окна
// get all stores
const stores = new Stores();
document.onclick = async function(e) {
    if(e.target.classList.contains("storeButton")){ 
        openStore(e.target.id);
    }
};
async function openStore(storeID) {
        var storeImg = document.getElementById("modal-img");
        var storeLogo = document.getElementById("modal-logo");
        var storeName = document.getElementById("modal-name");
        var storeFloor = document.getElementById("modal-floor");
        var storeAbout = document.getElementById("modal-about-text");
        var storeModal = new bootstrap.Modal(document.getElementById('storeModal'));

        await stores.getStores().then(stores => {
            stores.forEach(stores => {
                if(stores.id == storeID) {
                    storeImg.src = stores.image;
                    storeLogo.src = stores.logo;
                    storeName.innerHTML = stores.title;
                    storeFloor.innerHTML = stores.floor + ' ЭТАЖ';
                    storeAbout.innerHTML = stores.description;
                }
            });
        })

        storeModal.show();
}


// Плавная анимация навбара

let lastScroll = 0;
const defaultOffset = 100;
const header = document.querySelector('.customFiltersSection');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
    if (document.documentElement.clientWidth < 501) {
        if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
            //scroll down
            header.classList.add('hide');
        }
        else if(scrollPosition() < lastScroll && containHide()){
            //scroll up
            header.classList.remove('hide');
        }

        lastScroll = scrollPosition();
    }
})