/* =========================================
   ORIONPULSE
   JAVASCRIPT
========================================= */


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header = document.querySelector(".site-header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================
   GROWTH ENGINE PULSE
========================================= */

const core = document.querySelector(".growth-core");


setInterval(() => {

    core.classList.toggle("pulse-active");

}, 1800);


/* =========================================
   SIMPLE REVEAL SYSTEM
========================================= */

const revealElements = document.querySelectorAll(
    ".growth-card, .service-card, .section-heading, .intro-container, .future-container, .cta-container"
);


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});
