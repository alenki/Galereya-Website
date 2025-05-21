// Imports
import { slides } from "/src/js/contentful.js"

// Service slider
const swiper_wrapper = document.querySelector(".swiper-wrapper");
const swiper_container = document.querySelector(".swiper-main-window");

//These are empty for now, they get updated later
var swiper_boxes = gsap.utils.toArray(".swiper-slide");
var swiper_post = gsap.utils.toArray(".swiper-post");

const swiper_pagination_1 = document.getElementById("swiper-pagination-ball-1");
const swiper_pagination_2 = document.getElementById("swiper-pagination-ball-2");
const swiper_pagination_3 = document.getElementById("swiper-pagination-ball-3");

// Window load
var swiper_loop;
window.addEventListener("load", () => carousel_window_load(), false);
async function carousel_window_load() {
  localStorage.setItem("pagination", 0);
  // Update elements
  await update_carousel();
  update_info_panel();
  // Loop
  let swiper_activeElement;
  swiper_loop = horizontalLoop_swiper(swiper_boxes, {
    paused: true, 
    draggable: true, // make it draggable
    center: true, // active element is the one in the center of the container rather than th left edge
    onChange: (element, index) => { // when the active element changes, this function gets called.
        swiper_activeElement && swiper_activeElement.classList.remove("active");
        element.classList.add("active");
        swiper_activeElement = element;
    }
  });
  // Blur
  setTimeout(() => {
    blur_overflown_elements_swiper();
  }, "100");
  // Autoplay
  autoplay();
}

//Update carousel
const progress_bar = document.querySelector(".progress-panel");
const panel_title = document.querySelector(".swiper-post-name");
function update_info_panel() {
  // update progress animation
  progress_bar.classList.remove("progress-panel-animation")
  progress_bar.offsetWidth
  progress_bar.classList.add("progress-panel-animation")
  // get all slides
  slides.getSlides().then(slides => {
    slides.forEach(slides => {
        if(slides.pag_id == pagination_id) {
            // update info panel title
            panel_title.innerHTML = slides.title;
            // update swiper background (::before)
            document.documentElement.style.setProperty("--carousel_bg", `url(${slides.image})`);
        }
    });
  })
}
async function update_carousel() {
    await slides.getSlides().then(async slides => {
      let carousel_result = '';
      await slides.forEach(slides => {
        // Add sliders
        carousel_result+=`
        <div class="swiper-slide">
        <div class="swiper-post swiper-overflown">
        <a href="" class="slide-img" aria-label="${slides.title}">
          <picture>
            <source type="image/webp" srcset="${slides.image}">
            <img class="swiper-img-block" src="${slides.image}" alt="${slides.title}">
          </picture>
        </a>
        </div>
        </div>
        `
      });
      async function update_swiper_wrapper(){
        swiper_wrapper.innerHTML = carousel_result + carousel_result
      }
      await update_swiper_wrapper();
        // Put sliders in variables
        swiper_boxes = gsap.utils.toArray(".swiper-slide");
        swiper_post = gsap.utils.toArray(".swiper-post");
    })
}

// Set class to overflown elements
async function blur_overflown_elements_swiper() {
    swiper_wrapper.querySelectorAll('.swiper-slide').forEach(function(element){
        var swiper_container_startX = swiper_container.getBoundingClientRect()['x'];
        var swiper_container_endX = swiper_container_startX + swiper_container.getBoundingClientRect()['width'];
        var main_width = element.getBoundingClientRect()['width'];
        var startX = element.getBoundingClientRect()['x'];
        var endX = startX + main_width;
        if(startX < swiper_container_startX-15 || endX > swiper_container_endX+15) {
            element.children.item(0).classList.add('swiper-overflown');
            element.classList.remove('swiper-visible');
        }
        else {
            element.children.item(0).classList.remove('swiper-overflown');
            element.classList.add('swiper-visible');
        }
    });
}
// check on changing viewport size
// window.addEventListener("resize", function() { 
//   setTimeout(() => {
//     blur_overflown_elements_swiper();
//   }, "100");
// })
function blur_overflown_elements_left_swiper() {
  swiper_wrapper.querySelectorAll('.swiper-slide').forEach(function(element){
      var swiper_container_startX = swiper_container.getBoundingClientRect()['x'];
      var swiper_container_endX = swiper_container_startX + swiper_container.getBoundingClientRect()['width'];
      var main_width = element.getBoundingClientRect()['width'];
      var startX = element.getBoundingClientRect()['x'];
      var endX = startX + main_width;
      if(startX < swiper_container_startX - main_width-50 || endX > swiper_container_endX - main_width+50) {
          element.children.item(0).classList.add('swiper-overflown');
          element.classList.remove('swiper-visible');
      }
      else {
          element.children.item(0).classList.remove('swiper-overflown');
          element.classList.add('swiper-visible');
      }
  });
}
function blur_overflown_elements_right_swiper() {
  swiper_wrapper.querySelectorAll('.swiper-slide').forEach(function(element){
      var swiper_container_startX = swiper_container.getBoundingClientRect()['x'];
      var swiper_container_endX = swiper_container_startX + swiper_container.getBoundingClientRect()['width'];
      var main_width = element.getBoundingClientRect()['width'];
      var startX = element.getBoundingClientRect()['x'];
      var endX = startX + main_width;
      if(startX < swiper_container_startX + main_width-50 || endX > swiper_container_endX + main_width+50) {
          element.children.item(0).classList.add('swiper-overflown');
          element.classList.remove('swiper-visible');
      }
      else {
          element.children.item(0).classList.remove('swiper-overflown');
          element.classList.add('swiper-visible');
      }
  });
}

// Pagination
var pagination_id = 1; // активный элемент карусели начиная с 1
let pagination_cooldown = false;
swiper_pagination_1.addEventListener("click", () => {

  // cooldown to prevent spamming pagination
  if (pagination_cooldown) {
    return;
  }
  pagination_cooldown = true;
  setTimeout(() => {
    pagination_cooldown = false;
  }, 500);


  if(pagination_id==2){
    swipe_left();
    swiper_pagination_2.classList.remove("swiper-pagination-ball-active");
  }
  else if(pagination_id==3){
    swipe_left_twice();
    swiper_pagination_3.classList.remove("swiper-pagination-ball-active");
  }
  swiper_pagination_1.classList.add("swiper-pagination-ball-active");
  pagination_id=1;
});
swiper_pagination_2.addEventListener("click", () => {

  // cooldown to prevent spamming pagination
  if (pagination_cooldown) {
    return;
  }
  pagination_cooldown = true;
  setTimeout(() => {
    pagination_cooldown = false;
  }, 500);


  if(pagination_id==1){
    swipe_right();
    swiper_pagination_1.classList.remove("swiper-pagination-ball-active");
  }
  else if(pagination_id==3){
    swipe_left();
    swiper_pagination_3.classList.remove("swiper-pagination-ball-active");
  }
  swiper_pagination_2.classList.add("swiper-pagination-ball-active");
  pagination_id=2;
});
swiper_pagination_3.addEventListener("click", () => {

  // cooldown to prevent spamming pagination
  if (pagination_cooldown) {
    return;
  }
  pagination_cooldown = true;
  setTimeout(() => {
    pagination_cooldown = false;
  }, 500);


  if(pagination_id==1){
    swipe_right_twice();
    swiper_pagination_1.classList.remove("swiper-pagination-ball-active");
  }
  else if(pagination_id==2){
    swipe_right();
    swiper_pagination_2.classList.remove("swiper-pagination-ball-active");
  }
  swiper_pagination_3.classList.add("swiper-pagination-ball-active");
  pagination_id=3;
});

// details
document.querySelector(".about-post-button").addEventListener("click", () => {
  slides.getSlides().then(slides => {
    slides.forEach(slides => {
        if(slides.pag_id == pagination_id) {
          localStorage.setItem("slide_id", slides.id);
          localStorage.setItem("category", slides.category);
          localStorage.setItem("slide", "open");
        }
    });
  })
  // localStorage.setItem("pagination", pagination_id);
  window.location.href = "../stores/"; 
})

// Autoplay
// Start autoplaying automatically
var autoplayInterval = 0;
function autoplay() {
  window.requestAnimationFrame(function() { autoplayInterval = setTimeout(function() {
      if(pagination_id==1){
        pagination_id=2;
        swiper_pagination_1.classList.remove("swiper-pagination-ball-active");
        swiper_pagination_2.classList.add("swiper-pagination-ball-active");
      }
      else if(pagination_id==2){
        pagination_id=3;
        swiper_pagination_2.classList.remove("swiper-pagination-ball-active");
        swiper_pagination_3.classList.add("swiper-pagination-ball-active");
      }
      else if(pagination_id==3){
        pagination_id=1;
        swiper_pagination_3.classList.remove("swiper-pagination-ball-active");
        swiper_pagination_1.classList.add("swiper-pagination-ball-active");
      }
      swipe_right();
    }, 5000); });

  // autoplayInterval = setInterval(function() {
  // }, 5000);
}
function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Swipe buttons
let isCooldown_swiper = false;
function swipe_left() {
  // cooldown to prevent spamming button
  if (isCooldown_swiper) {
    return;
  }
  isCooldown_swiper = true;
  setTimeout(() => {
    isCooldown_swiper = false;
  }, 500);
  
    blur_overflown_elements_left_swiper();
    swiper_loop.previous({duration: 0.4, ease: "power1.inOut"})
    // setTimeout(() => {
    //     blur_overflown_elements();
    //   }, "410");

    // Reset autoplay
    stopAutoplay();
    autoplay();

    // Update info panel
    update_info_panel();
}
async function swipe_right() {
  // cooldown to prevent spamming button
  if (isCooldown_swiper) {
    return;
  }
  isCooldown_swiper = true;
  setTimeout(() => {
    isCooldown_swiper = false;
  }, 500);

    blur_overflown_elements_right_swiper();
    swiper_loop.next({duration: 0.4, ease: "power1.inOut"});
    
    // setTimeout(() => {
    //     blur_overflown_elements();
    //   }, "410");

    // Reset autoplay
    stopAutoplay();
    autoplay();

    // Update info panel
    update_info_panel();
}
function swipe_left_twice() {
  // cooldown to prevent spamming button
  if (isCooldown_swiper) {
    return;
  }
  isCooldown_swiper = true;
  setTimeout(() => {
    isCooldown_swiper = false;
  }, 500);
  
  blur_overflown_elements_left_swiper();
    swiper_loop.previous({duration: 0.09, ease: "power1.inOut"});
    setTimeout(() => {
        blur_overflown_elements_left_swiper();
        swiper_loop.previous({duration: 0.09, ease: "power1.inOut"});
      }, "100");

    // Reset autoplay
    stopAutoplay();
    autoplay();

    // Update info panel
    update_info_panel();
}
function swipe_right_twice() {
  // cooldown to prevent spamming button
  if (isCooldown_swiper) {
    return;
  }
  isCooldown_swiper = true;
  setTimeout(() => {
    isCooldown_swiper = false;
  }, 500);


    blur_overflown_elements_right_swiper();
    swiper_loop.next({duration: 0.09, ease: "power1.inOut"});
    setTimeout(() => {
        blur_overflown_elements_right_swiper();
        swiper_loop.next({duration: 0.09, ease: "power1.inOut"});
      }, "100");

    // Reset autoplay
    stopAutoplay();
    autoplay();

    // Update info panel
    update_info_panel();
}
// document.getElementById("swiper-left").addEventListener("click", () => {swipe_left()});
// document.getElementById("swiper-right").addEventListener("click", () => {swipe_right()});



/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive swiper_loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will swiper_loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
 */
function horizontalLoop_swiper(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => { // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({repeat: config.repeat, onUpdate: onChange && function() {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        }, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      timeOffset = 0,
      container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + spaceBefore[0] + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(), b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
          xPercent: i => xPercents[i]
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
        center && times.forEach((t, i) => {
          times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
        });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0, d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
            .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy;
    gsap.set(items, {x: 0});
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = {time: timeWrap};
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);    
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = setCurrent => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
    tl.next = vars => toIndex(tl.current()+1, vars);
    tl.previous = vars => toIndex(tl.current()-1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof(Draggable) === "function") {
      proxy = document.createElement("div")
      let wrap = gsap.utils.wrap(0, 1),
        ratio, startProgress, draggable, dragSnap, lastSnap, initChangeX, wasPlaying,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => tl.closestIndex(true);
      typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = (startProgress / -ratio) - x;
          gsap.set(proxy, {x: startProgress / -ratio});
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          //note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap. So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX
          }
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        }
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize); // cleanup
  });
  return timeline;
}

