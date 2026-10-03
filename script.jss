/* =========================================================
   SSIT NEXUS
   SMART DIGITAL CAMPUS COMPANION
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const introScreen = document.querySelector(".intro-screen");
    const siteWrapper = document.querySelector(".site-wrapper");

    const enterButton = document.querySelector(".enter-button");
    const voiceButton = document.querySelector(".voice-button");

    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    const searchInput = document.querySelector(".search-box input");
    const searchResults = document.querySelector(".search-results");

    /* -----------------------------------------------------
       INTRO SCREEN
    ----------------------------------------------------- */

    function showWebsite() {
        if (!introScreen) return;

        introScreen.classList.add("hide");

        if (siteWrapper) {
            siteWrapper.classList.add("ready");
        }

        setTimeout(() => {
            introScreen.style.display = "none";
        }, 1100);
    }

    // Give the intro animation time to complete
    setTimeout(showWebsite, 3400);


    /* -----------------------------------------------------
       ENTER BUTTON
    ----------------------------------------------------- */

    if (enterButton) {
        enterButton.addEventListener("click", () => {
            showWebsite();

            setTimeout(() => {
                const options = document.querySelector("#options");

                if (options) {
                    options.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }, 500);
        });
    }


    /* -----------------------------------------------------
       WELCOME VOICE
       Uses browser Speech Synthesis
    ----------------------------------------------------- */

    function speakWelcome() {

        if (!("speechSynthesis" in window)) {
            alert("Voice is not supported on this browser.");
            return;
        }

        window.speechSynthesis.cancel();

        const message = new SpeechSynthesisUtterance(
            "Welcome to Shree Swaminarayan Institute of Technology"
        );

        message.rate = 0.88;
        message.pitch = 1.05;
        message.volume = 1;

        const voices = window.speechSynthesis.getVoices();

        // Try to select a natural English voice
        const preferredVoice =
            voices.find(v =>
                /female|zira|samantha|google uk english female|google us english/i
                    .test(v.name)
            ) ||
            voices.find(v =>
                v.lang && v.lang.toLowerCase().startsWith("en")
            );

        if (preferredVoice) {
            message.voice = preferredVoice;
        }

        window.speechSynthesis.speak(message);

        animateVoiceButton(true);

        message.onend = () => {
            animateVoiceButton(false);
        };
    }


    function animateVoiceButton(active) {

        if (!voiceButton) return;

        const waves = voiceButton.querySelectorAll(".voice-wave i");

        waves.forEach((wave, index) => {

            if (active) {
                wave.style.animationDuration =
                    `${0.35 + index * 0.08}s`;

            } else {
                wave.style.animationDuration = "";
            }

        });
    }


    if (voiceButton) {
        voiceButton.addEventListener("click", speakWelcome);
    }


    // Load voices when browser makes them available
    if ("speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }


    /* -----------------------------------------------------
       MOBILE MENU
    ----------------------------------------------------- */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

            const icon = menuButton.querySelector("i");

            if (icon) {

                if (mobileMenu.classList.contains("open")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        // Close menu after clicking a link
        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");

                const icon = menuButton.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });

        });
    }


    /* -----------------------------------------------------
       SEARCH SYSTEM
    ----------------------------------------------------- */

    if (searchInput && searchResults) {

        const searchableItems = [
            {
                name: "Notices & Announcements",
                description: "Latest college notices and important updates",
                target: "#notices"
            },
            {
                name: "Academics",
                description: "Subjects, syllabus and academic information",
                target: "#academics"
            },
            {
                name: "Timetable",
                description: "Daily class timetable and schedule",
                target: "#timetable"
            },
            {
                name: "Fees",
                description: "Fee information and payment details",
                target: "#fees"
            },
            {
                name: "Examination",
                description: "Exam schedule and examination updates",
                target: "#examination"
            },
            {
                name: "Attendance",
                description: "Attendance overview and records",
                target: "#attendance"
            },
            {
                name: "Assignments",
                description: "Assignments and study material",
                target: "#assignments"
            },
            {
                name: "Events",
                description: "College events and activities",
                target: "#events"
            },
            {
                name: "Campus",
                description: "Explore the SSIT campus",
                target: "#campus"
            },
            {
                name: "Faculty",
                description: "Faculty and departments",
                target: "#faculty"
            },
            {
                name: "Contact",
                description: "Contact and student help",
                target: "#contact"
            }
        ];


        function performSearch() {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();

            searchResults.innerHTML = "";

            if (!query) {
                searchResults.classList.remove("show");
                return;
            }

            const matches =
                searchableItems.filter(item =>
                    item.name.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query)
                );


            searchResults.classList.add("show");


            if (matches.length === 0) {

                searchResults.innerHTML = `
                    <div style="
                        padding:18px;
                        color:rgba(255,255,255,.55);
                        font-size:12px;
                    ">
                        No SSIT results found.
                    </div>
                `;

                return;
            }


            matches.forEach(item => {

                const result = document.createElement("div");

                result.className = "search-result-item";

                result.innerHTML = `
                    <div>
                        <strong>${item.name}</strong>
                        <p>${item.description}</p>
                    </div>
                    <span>↗</span>
                `;


                result.style.cssText = `
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    gap:20px;
                    padding:14px;
                    border-bottom:1px solid rgba(255,255,255,.08);
                    cursor:pointer;
                `;


                result.addEventListener("click", () => {

                    const target =
                        document.querySelector(item.target);

                    if (target) {

                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    } else {

                        // If target does not exist yet,
                        // scroll to options section.
                        const options =
                            document.querySelector(
                                ".main-options-section"
                            );

                        if (options) {
                            options.scrollIntoView({
                                behavior: "smooth"
                            });
                        }

                    }

                    searchResults.classList.remove("show");
                    searchInput.value = "";

                });


                searchResults.appendChild(result);

            });

        }


        searchInput.addEventListener(
            "input",
            performSearch
        );


        /* Keyboard shortcut "/" */

        document.addEventListener("keydown", event => {

            if (
                event.key === "/" &&
                document.activeElement !== searchInput
            ) {

                event.preventDefault();

                searchInput.focus();

            }

            if (event.key === "Escape") {

                searchInput.blur();

                searchResults.classList.remove("show");

            }

        });

    }


    /* -----------------------------------------------------
       NAVIGATION
    ----------------------------------------------------- */

    const navLinks =
        document.querySelectorAll(
            ".nav-link, .mobile-menu a"
        );


    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");

            if (
                href &&
                href.startsWith("#")
            ) {

                const target =
                    document.querySelector(href);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        });

    });


    /* -----------------------------------------------------
       ACTIVE NAVIGATION
    ----------------------------------------------------- */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const id =
                        entry.target.getAttribute("id");

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${id}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section => {
        observer.observe(section);
    });


    /* -----------------------------------------------------
       SCROLL REVEAL
    ----------------------------------------------------- */

    const revealElements =
        document.querySelectorAll(
            ".nexus-card, .quick-card, .pulse-card, .feature-card, .timeline-item, .profile-card"
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)";

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* -----------------------------------------------------
       CARD TILT EFFECT
    ----------------------------------------------------- */

    const cards =
        document.querySelectorAll(
            ".nexus-card, .feature-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* -----------------------------------------------------
       HERO TECH PARALLAX
    ----------------------------------------------------- */

    const hero =
        document.querySelector(".hero-section");


    if (hero) {

        hero.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) return;

                const x =
                    (event.clientX / window.innerWidth - 0.5);

                const y =
                    (event.clientY / window.innerHeight - 0.5);


                const symbols =
                    hero.querySelectorAll(
                        ".floating-symbol"
                    );

                symbols.forEach(
                    (symbol, index) => {

                        const strength =
                            (index + 1) * 7;

                        symbol.style.transform =
                            `translate(
                                ${x * strength}px,
                                ${y * strength}px
                            )`;
                    }
                );

            }
        );

    }


    /* -----------------------------------------------------
       COUNTER ANIMATION
    ----------------------------------------------------- */

    const counters =
        document.querySelectorAll(
            ".pulse-card strong"
        );


    function animateCounter(element) {

        const text =
            element.textContent.trim();

        const number =
            parseInt(
                text.replace(/\D/g, ""),
                10
            );


        if (isNaN(number)) return;


        const suffix =
            text.replace(/[0-9]/g, "");


        let current = 0;

        const duration = 1200;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            current =
                Math.floor(
                    number * eased
                );


            element.textContent =
                current + suffix;


            if (progress < 1) {
                requestAnimationFrame(
                    updateCounter
                );
            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !entry.target.dataset.animated
                    ) {

                        entry.target.dataset.animated =
                            "true";

                        animateCounter(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* -----------------------------------------------------
       TERMINAL TYPING EFFECT
    ----------------------------------------------------- */

    const terminalLines =
        document.querySelectorAll(
            ".terminal-code p"
        );


    terminalLines.forEach(
        (line, index) => {

            line.style.opacity = "0";

            setTimeout(() => {

                line.style.opacity = "0.7";

            }, 700 + index * 450);

        }
    );


    /* -----------------------------------------------------
       CURRENT YEAR
    ----------------------------------------------------- */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* -----------------------------------------------------
       PREVENT EMPTY LINKS
    ----------------------------------------------------- */

    document
        .querySelectorAll('a[href="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {
                    event.preventDefault();
                }
            );

        });


    /* -----------------------------------------------------
       CLOSE SEARCH WHEN CLICKING OUTSIDE
    ----------------------------------------------------- */

    document.addEventListener(
        "click",
        event => {

            if (
                searchResults &&
