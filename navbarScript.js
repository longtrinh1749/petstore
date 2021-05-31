
"use strict";

// window.onscroll = function () { console.log("hi"); adjustTopNav(); };

document.body.addEventListener('scroll',()=>{
    adjustTopNav();
  })

var topNav = document.getElementById("top-nav");

console.log(topNav);

function adjustTopNav() {
    console.log("here");
    if (document.body.scrollTop > window.innerHeight / 3 || document.documentElement.scrollTop > window.innerHeight / 3) {
        topNav.className = "m-navigator-bar scrolled";
    }
    else topNav.className = topNav.className.replace("scrolled", "");
};

