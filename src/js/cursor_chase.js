"use strict";
export const __esModule = true;
import "../sass/lavalamp.scss";
document.addEventListener('DOMContentLoaded', function () {
    var interBubble = document.querySelector('.interactive');
    var curX = 0;
    var curY = 0;
    var tgX = 0;
    var tgY = 0;
    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = "translate(".concat(Math.round(curX), "px, ").concat(Math.round(curY), "px)");
        requestAnimationFrame(function () {
            move();
        });
    }
    window.addEventListener('mousemove', function (event) {
        tgX = event.clientX;
        tgY = event.clientY + 170;
    });
    move();
});
