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
                const {title} = item.fields;
                const image = item.fields.image.fields.file.url;
                return {title, image}
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
        stores.forEach(stores => {
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
        });
        storesDOM.innerHTML = result;
    }
}


// Loading stores
document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const stores = new Stores();
    // get all stores
    stores.getStores().then(stores => {
        ui.displayStores(stores);
    })//.then(()=>{});
});