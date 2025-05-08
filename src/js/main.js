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
document.getElementById("storeButton-1").onclick = function () { 
    localStorage.setItem("category", "Магазины");
    window.location.href = "../stores/"; 
};
document.getElementById("storeButton-2").onclick = function () { 
    localStorage.setItem("category", "Еда");
    window.location.href = "../stores/"; 
};
document.getElementById("storeButton-3").onclick = function () { 
    localStorage.setItem("category", "Развлечения");
    window.location.href = "../stores/"; 
};
document.getElementById("storeButton-4").onclick = function () { 
    localStorage.setItem("category", "Одежда");
    window.location.href = "../stores/"; 
};
document.getElementById("storeButton-5").onclick = function () { 
    localStorage.setItem("category", "Услуги");
    window.location.href = "../stores/"; 
};
document.getElementById("storeButton-6").onclick = function () { 
    localStorage.setItem("category", "Электроника");
    window.location.href = "../stores/"; 
};
// End of 6 Buttons below carousel


// // Service buttons
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
              const {id, title, icon} = item.fields;
              return {id, title, icon}
          })
          return services
      } catch(error) {
          console.log(error);
      }
    }
  }

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
                const {category, id} = item.fields;
                return {category, id}
            })
            return promotions
        } catch(error) {
            console.log(error);
        }
    }
  }

const promotion_slides = new PromotionSlides();
const service_slides = new ServiceSlides();

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
                    localStorage.setItem("service_id", service_slides.id);
                    localStorage.setItem("category", "Услуги");
                    localStorage.setItem("service", "open");
                }
            });
        })
        window.location.href = "../stores/"; 
    }
}