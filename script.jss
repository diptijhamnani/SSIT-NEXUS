document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       WELCOME VOICE
    ========================================= */

    const voiceButton = document.getElementById("voiceButton");

    function speakWelcome() {

        if (!("speechSynthesis" in window)) {
            alert("Your browser does not support voice.");
            return;
        }

        // Stop any previous speech
        window.speechSynthesis.cancel();

        const message = new SpeechSynthesisUtterance(
            "Welcome to Shree Swaminarayan Institute of Technology."
        );

        message.lang = "en-IN";
        message.rate = 0.88;
        message.pitch = 1.05;
        message.volume = 1;

        /*
         * Try to use a natural English voice
         */
        const voices = window.speechSynthesis.getVoices();

        const preferredVoice = voices.find(voice =>
            voice.lang === "en-IN"
        ) || voices.find(voice =>
            voice.lang.startsWith("en")
        );

        if (preferredVoice) {
            message.voice = preferredVoice;
        }

        window.speechSynthesis.speak(message);
    }


    /* Listen button */

    if (voiceButton) {

        voiceButton.addEventListener("click", () => {

            speakWelcome();

            voiceButton.classList.add("playing");

            setTimeout(() => {
                voiceButton.classList.remove("playing");
            }, 2500);

        });

    }


    /* =========================================
       BACK TO HOME
    ========================================= */

    const backButtons =
        document.querySelectorAll(".back-home");

    backButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       OPTION CLICK ANIMATION
    ========================================= */

    const options =
        document.querySelectorAll(".main-option");

    options.forEach(option => {

        option.addEventListener("click", () => {

            option.classList.add("selected");

            setTimeout(() => {
                option.classList.remove("selected");
            }, 500);

        });

    });


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const cards =
        document.querySelectorAll(".content-card");

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });


    cards.forEach(card => {
        observer.observe(card);
    });


    /* =========================================
       LOAD VOICES
    ========================================= */

    if ("speechSynthesis" in window) {

        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };

    }

});
