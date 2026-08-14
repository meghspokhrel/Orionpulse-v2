/* =========================================
   ORIONPULSE
   PHASE 5 — HERO + NAVIGATION
========================================= */


/* =========================================
   HEADER
========================================= */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================
   MOBILE NAVIGATION
========================================= */

const mobileButton =
    document.querySelector(".mobile-menu-button");

const navigation =
    document.querySelector(".main-nav");

if (mobileButton && navigation) {

    mobileButton.addEventListener("click", () => {

        navigation.classList.toggle("mobile-open");

        mobileButton.classList.toggle("active");

    });


    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("mobile-open");

            mobileButton.classList.remove("active");

        });

    });

}


/* =========================================
   GROWTH ENGINE
========================================= */

const growthVisual =
    document.querySelector(".growth-visual");

const growthCore =
    document.querySelector(".growth-core");

const nodes =
    document.querySelectorAll(".engine-node");


/* Core pulse */

if (growthCore) {

    setInterval(() => {

        growthCore.classList.toggle("pulse-active");

    }, 1800);

}


/* =========================================
   NODE INTERACTION
========================================= */

nodes.forEach(node => {

    node.addEventListener("mouseenter", () => {

        nodes.forEach(otherNode => {

            if (otherNode !== node) {

                otherNode.style.opacity = "0.35";

            }

        });

        if (growthCore) {

            growthCore.style.transform =
                "translate(-50%, -50%) scale(1.05)";

        }

    });


    node.addEventListener("mouseleave", () => {

        nodes.forEach(otherNode => {

            otherNode.style.opacity = "1";

        });

        if (growthCore) {

            growthCore.style.transform =
                "translate(-50%, -50%) scale(1)";

        }

    });

});


/* =========================================
   HERO PARALLAX
========================================= */

if (growthVisual) {

    window.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);


        growthVisual.style.transform =
            `translate(${x * 12}px, ${y * 12}px)`;

    });

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".growth-card, .service-card, .section-heading, .intro-container, .future-container, .cta-container"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;


                entry.target.classList.add(
                    "reveal-visible"
                );


                observer.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* =========================================
   BUTTON MAGNETIC EFFECT
========================================= */

const magneticButtons =
    document.querySelectorAll(
        ".btn-primary"
    );


magneticButtons.forEach(button => {

    button.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;


        const rect =
            button.getBoundingClientRect();


        const x =
            event.clientX - rect.left - rect.width / 2;

        const y =
            event.clientY - rect.top - rect.height / 2;


        button.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform =
            "translate(0, 0)";

    });

});
/* =========================================
   GROWTH ENGINE DATA FLOW
========================================= */

const engineNodes =
    document.querySelectorAll(".engine-node");


engineNodes.forEach((node, index) => {

    node.style.animationDelay =
        `${index * 0.35}s`;

    node.classList.add("engine-node-active");

});
