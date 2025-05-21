// Contentful
import * as contentful from 'contentful'
const client = contentful.createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    environment: 'master', // defaults to 'master' if not set
    accessToken: import.meta.env.VITE_CONTENTFUL_TOKEN
})

// Get service elements
class ServiceSlides{
    async getServiceSlides(){
      try{
          // get contentful content // Contentful documentation: https://contentful.github.io/contentful.js/contentful/7.5.0/
          let service_data = await client.getEntries({
              content_type: "galereyaServices"
          });
          // let service_result = await fetch('/json/service.json');
          // let data = await service_result.json();
          let services = service_data.items;
          services = services.map(item =>{
              const {id, englishTitle, title, icon} = item.fields;
              return {id, englishTitle, title, icon}
          })
          return services
      } catch(error) {
          console.log(error);
      }
    }
  }


// Get promotion elements
class PromotionSlides{
  async getPromotionSlides(){
    try{
        // get contentful content // Contentful documentation: https://contentful.github.io/contentful.js/contentful/7.5.0/
        let promotion_data = await client.getEntries({
            content_type: "galereyaPromotions"
        });
        // let promotion_result = await fetch('/json/promotion.json');
        // let data = await promotion_result.json();
        let promotions = promotion_data.items;
        promotions = promotions.map(item =>{
            const {englishTitle, title, category, id, url} = item.fields;
            const image = item.fields.image.fields.file.url;
            return {englishTitle, title, category, id, url, image}
        })
        return promotions
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
        let carousel_result = await fetch('/json/carousel.json');
        let data = await carousel_result.json();
        let slides = data.items;
        // let slides = contentful.items;
        slides = slides.map(item =>{
            const {pag_id, englishTitle, englishDescription, englishCategory, title, description, category} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            const logo = item.fields.logo.fields.file.url;
            return {pag_id, englishTitle, englishDescription, englishCategory, title, description, category, id, image, logo}
        })
        return slides
    } catch(error) {
        console.log(error);
    }
  }
}

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
                const {englishTitle, englishDescription, englishCategory, title, description, category, id, floor} = item.fields;
                const logo = item.fields.logo.fields.file.url;
                var image;
                try{image = item.fields.image.fields.file.url;}
                catch(e){console.log("У", title, "нет фотки")}
                return {englishTitle, englishDescription, englishCategory, title, description, category, id, floor, image, logo}
            })
            return stores
        } catch(error) {
            console.log(error);
        }
    }
}

export const slides = new Slides();
export const promotion_slides = new PromotionSlides();
export const service_slides = new ServiceSlides();
export const stores = new Stores();