/* =====================================================
   SSIT STUDENT SPACE
   SCRIPT.JS
   ===================================================== */


/* =====================================================
   1. PAGE LOADED
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("SSIT Student Space loaded successfully.");

    initOrbitNavigation();
    initSmoothNavigation();
    initCursorEffect();
    initScrollReveal();
    initActiveNavigation();
    initRippleEffect();
    initDynamicGreeting();

});


/* =====================================================
   2. ORBIT NAVIGATION
   ===================================================== */

function initOrbitNavigation() {

    const orbitItems =
        document.querySelectorAll(".orbit-item");

    orbitItems.forEach((item) => {

        item.addEventListener("click", () => {

            const sectionId =
                item.getAttribute("data-section");

            const target =
                document.getElementById(sectionId);

            if (!target) {
                console.warn(
                    `Section "${sectionId}" not found.`
                );

                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            activateOrbitItem(item);

        });

    });

}


/* =====================================================
   ACTIVE ORBIT ITEM
   ===================================================== */

function activateOrbitItem(activeItem) {

    const allItems =
        document.querySelectorAll(".orbit-item");

    allItems.forEach((item) => {

        item.classList.remove("selected");

    });

    activeItem.classList.add("selected");

}


/* =====================================================
   3. SMOOTH NAVIGATION
   ===================================================== */

function initSmoothNavigation() {

    const links =
        document.querySelectorAll(
            '.top-nav a[href^="#"]'
        );

    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =====================================================
   4. CURSOR FOLLOW EFFECT
   ===================================================== */

function initCursorEffect() {

    const orbitSystem =
        document.querySelector(".orbit-system");

    if (!orbitSystem) return;


    /*
       Disable heavy cursor movement on
       touch/mobile devices.
    */

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    orbitSystem.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                orbitSystem.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const moveX =
                (x - centerX) / 35;

            const moveY =
                (y - centerY) / 35;


            orbitSystem.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        }
    );


    orbitSystem.addEventListener(
        "mouseleave",
        () => {

            orbitSystem.style.transform =
                "translate(0, 0)";

        }
    );

}


/* =====================================================
   5. SCROLL REVEAL
   ===================================================== */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".content-panel, .status-card, .feature-section"
        );


    elements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

    });


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach((element) => {

        observer.observe(element);

    });

}


/* =====================================================
   6. ACTIVE TOP NAVIGATION
   ===================================================== */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".top-nav a"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId =
                        entry.target.id;


                    navLinks.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) ===
                            `#${currentId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                threshold: 0.45
            }
        );


    sections.forEach((section) => {

        observer.observe(section);

    });

}


/* =====================================================
   7. RIPPLE EFFECT
   ===================================================== */

function initRippleEffect() {

    const buttons =
        document.querySelectorAll(
            "button"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement(
                        "span"
                    );

                ripple.classList.add(
                    "click-ripple"
                );


                const rect =
                    button.getBoundingClientRect();


                ripple.style.left =
                    `${event.clientX - rect.left}px`;

                ripple.style.top =
                    `${event.clientY - rect.top}px`;


                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 650);

            }
        );

    });

}


/* =====================================================
   8. DYNAMIC GREETING
   ===================================================== */

function initDynamicGreeting() {

    const heroTitle =
        document.querySelector(
            ".hero h1"
        );


    if (!heroTitle) return;


    const hour =
        new Date().getHours();


    let greeting;


    if (hour >= 5 && hour < 12) {

        greeting =
            "Good Morning";

    }
    else if (
        hour >= 12 &&
        hour < 17
    ) {

        greeting =
            "Good Afternoon";

    }
    else if (
        hour >= 17 &&
        hour < 21
    ) {

        greeting =
            "Good Evening";

    }
    else {

        greeting =
            "Good Night";

    }


    /*
       Small greeting appears above
       the main SSIT title.
    */

    const existingGreeting =
        document.querySelector(
            ".dynamic-greeting"
        );


    if (existingGreeting) return;


    const greetingElement =
        document.createElement(
            "p"
        );


    greetingElement.className =
        "dynamic-greeting";


    greetingElement.textContent =
        greeting + " • Welcome back";


    greetingElement.style.cssText = `
        margin-bottom: 12px;
        color: rgba(255,255,255,0.45);
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.8s ease;
    `;


    heroTitle.parentNode.insertBefore(
        greetingElement,
        heroTitle
    );


    setTimeout(() => {

        greetingElement.style.opacity =
            "1";

        greetingElement.style.transform =
            "translateY(0)";

    }, 500);

}


/* =====================================================
   9. PARALLAX BACKGROUND
   ===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const scrollY =
            window.scrollY;

        const waves =
            document.querySelectorAll(
                ".wave"
            );


        waves.forEach(
            (wave, index) => {

                const speed =
                    (index + 1) * 0.025;

                wave.style.transform =
                    `translateY(${scrollY * speed}px)`;

            }
        );

    },
    {
        passive: true
    }
);


/* =====================================================
   10. KEYBOARD ACCESS
   ===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        /*
           Press "/" to focus on
           the main student space.
        */

        if (
            event.key === "/" &&
            !["INPUT", "TEXTAREA"].includes(
                document.activeElement.tagName
            )
        ) {

            const center =
                document.querySelector(
                    ".center-core"
                );

            if (center) {

                center.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }

    }
);


/* =====================================================
   11. RESIZE HANDLING
   ===================================================== */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);


        resizeTimer =
            setTimeout(() => {

                /*
                   Reset orbit position after
                   resizing the browser.
                */

                const orbit =
                    document.querySelector(
                        ".orbit-system"
                    );

                if (orbit) {

                    orbit.style.transform =
                        "translate(0, 0)";

                }

            }, 200);

    }
);


/* =====================================================
   12. PAGE VISIBILITY
   ===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            document.title =
                "Come back • SSIT Student Space";

        }
        else {

            document.title =
                "SSIT Student Space";
           /* =====================================================
   JS RIPPLE EFFECT
   ===================================================== */

button {
    position: relative;
    overflow: hidden;
}

.click-ripple {
    position: absolute;

    width: 10px;
    height: 10px;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.35);

    transform: translate(-50%, -50%) scale(0);

    animation: rippleAnimation 0.65s ease-out;

    pointer-events: none;
}

@keyframes rippleAnimation {

    to {
        transform:
            translate(-50%, -50%)
            scale(18);

        opacity: 0;
    }
}

        }

    }
);
