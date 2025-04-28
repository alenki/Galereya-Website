// Contentful
import * as contentful from 'contentful'
const client = contentful.createClient({
    space: 'ruy22jhhank3',
    environment: 'master', // defaults to 'master' if not set
    accessToken: '0GUZEP5q3E4HSXJ1UXX2W6TRuyRdHPFzaIOECAXA1YA'
})


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
    localStorage.setItem("category", "Магазины");
    window.location.href = "../stores/"; 
};
// Еда
document.getElementById("storeButton-2").onclick = function () { 
    localStorage.setItem("category", "Еда");
    window.location.href = "../stores/"; 
};
// Развлечения
document.getElementById("storeButton-3").onclick = function () { 
    localStorage.setItem("category", "Развлечения");
    window.location.href = "../stores/"; 
};
// Одежда
document.getElementById("storeButton-4").onclick = function () { 
    localStorage.setItem("category", "Одежда");
    window.location.href = "../stores/"; 
};
// Услуги
document.getElementById("storeButton-5").onclick = function () { 
    localStorage.setItem("category", "Услуги");
    window.location.href = "../stores/"; 
};
// End of 6 Buttons below carousel


// // Service buttons
// Get service elements
class ServiceSlides{
    async getServiceSlides(){
      try{
          // get contentful content // Contentful documentation: https://contentful.github.io/contentful.js/contentful/7.5.0/
          // let contentful = await client.getEntries({
          //     content_type: "alenkiStoreContent"
          // });
          let service_result = await fetch('/json/service.json');
          let data = await service_result.json();
          let service_slides = data.items;
          // let service_slides = contentful.items;
          service_slides = service_slides.map(item =>{
              const {title, description, category, icon} = item.fields;
              const {id} = item.sys;
              const image = item.fields.image.fields.file.url;
              const logo = item.fields.logo.fields.file.url;
              return {title, description, category, id, image, logo, icon}
          })
          return service_slides
      } catch(error) {
          console.log(error);
      }
    }
  }


document.onclick = function(e) {
    
    // localStorage.setItem("pagination", pagination_id);
};
// // Магазины
// document.getElementById("serviceButton-1").addEventListener("click", function() { 
//     localStorage.setItem("category", "Магазины");
//     window.location.href = "../stores/"; 
// });
// // Еда
// document.getElementById("serviceButton-2").addEventListener("click", function() { 
//     localStorage.setItem("category", "Еда");
//     window.location.href = "../stores/"; 
// });
// // Развлечения
// document.getElementById("serviceButton-3").addEventListener("click", function() { 
//     localStorage.setItem("category", "Развлечения");
//     window.location.href = "../stores/"; 
// });
// // Одежда
// document.getElementById("serviceButton-4").addEventListener("click", function() { 
//     localStorage.setItem("category", "Одежда");
//     window.location.href = "../stores/"; 
// });
// // Услуги
// document.getElementById("serviceButton-5").addEventListener("click", function() { 
//     localStorage.setItem("category", "Услуги");
//     window.location.href = "../stores/"; 
// });
// // End of Service buttons


// Promotion buttons
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
                const {title, description, category, id} = item.fields;
                return {title, description, category, id}
            })
            return promotions
        } catch(error) {
            console.log(error);
        }
    }
  }

const promotion_slides = new PromotionSlides();
const promotion_title = document.querySelector(".promotionModal-title");
const promotion_description = document.querySelector(".promotionModal-description");

const service_slides = new ServiceSlides();
const service_title = document.querySelector(".serviceModal-title");
const service_description = document.querySelector(".serviceModal-description");

// promotion and service onclick
document.onclick = async function(e) {
    if (e.target.classList.contains("promotion-onclick")) {
        // promotion_slides.getPromotionSlides().then(promotion_slides => {
        //     promotion_slides.forEach(promotion_slides => {
        //         if(e.target.id == promotion_slides.id){
        //             var promotionModal = new bootstrap.Modal(document.getElementById('promotionModal')); 
        //             promotionModal.show(); 
        //             promotion_title.innerHTML = promotion_slides.title;
        //             promotion_description.innerHTML = promotion_slides.description;
        //         }
        //     })
        // })
        await promotion_slides.getPromotionSlides().then(promotion_slides => {
            promotion_slides.forEach(promotion_slides => {
                if(promotion_slides.id == e.target.id) {
                    localStorage.setItem("promotion_id", promotion_slides.id);
                    console.log(localStorage.getItem("promotion_id"))
                    localStorage.setItem("promotion_slide_title", promotion_slides.title);
                    localStorage.setItem("promotion_slide_description", promotion_slides.description);
                    localStorage.setItem("category", promotion_slides.category);
                    localStorage.setItem("promotion", "open");
                }
            });
        })
        window.location.href = "../stores/"; 
    } else if (e.target.classList.contains("service-onclick")) {
        await service_slides.getServiceSlides().then(service_slides => {
            service_slides.forEach(service_slides => {
                if(service_slides.id == e.target.id) {
                    localStorage.setItem("service_slide_title", service_slides.title);
                    localStorage.setItem("service_slide_description", service_slides.description);
                    localStorage.setItem("category", "Услуги");
                    localStorage.setItem("service", "open");
                }
            });
        })
        window.location.href = "../stores/"; 
    }
}