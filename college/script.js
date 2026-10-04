/* =========================================================
   PAGE NAVIGATION
========================================================= */

const pages = document.querySelectorAll(".page");

let currentPage = 1;


function goToPage(pageNumber) {

    pages.forEach((page) => {
        page.classList.remove("active");
    });

    const target = document.getElementById(`page${pageNumber}`);

    if (target) {
        target.classList.add("active");

        currentPage = pageNumber;
    }
}


/* =========================================================
   PASSWORD
========================================================= */

const correctPassword = "0610";

let enteredPassword = "";

const keys = document.querySelectorAll(".key[data-number]");
const deleteKey = document.querySelector(".key-delete");

const passwordDots = document.querySelectorAll(
    ".password-display span"
);


/* UPDATE DOTS */

function updatePasswordDisplay() {

    passwordDots.forEach((dot, index) => {

        if (index < enteredPassword.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }

    });
}


/* CHECK PASSWORD */

function checkPassword() {

    if (enteredPassword === correctPassword) {

        // Start music after user interaction
        startMusic();

        // Small delay makes the transition feel smoother
        setTimeout(() => {
            goToPage(2);
        }, 180);

        // Reset
        enteredPassword = "";

        updatePasswordDisplay();
    }
}


/* NUMBER CLICK */

keys.forEach((key) => {

    key.addEventListener("click", function () {

        const number = this.dataset.number;

        if (enteredPassword.length >= 4) {
            return;
        }

        enteredPassword += number;

        updatePasswordDisplay();

        // Automatically open after 4 digits
        if (enteredPassword.length === 4) {
            checkPassword();
        }

    });

});


/* DELETE */

if (deleteKey) {

    deleteKey.addEventListener("click", function () {

        if (enteredPassword.length > 0) {

            enteredPassword = enteredPassword.slice(0, -1);

            updatePasswordDisplay();

        }

    });

}


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener("keydown", function (event) {

    const key = event.key;


    // Number keys
    if (/^[0-9]$/.test(key)) {

        if (enteredPassword.length < 4) {

            enteredPassword += key;

            updatePasswordDisplay();

            if (enteredPassword.length === 4) {
                checkPassword();
            }

        }

    }


    // Backspace
    if (key === "Backspace") {

        if (enteredPassword.length > 0) {

            enteredPassword = enteredPassword.slice(0, -1);

            updatePasswordDisplay();

        }

    }

});


/* =========================================================
   MUSIC
========================================================= */

const bgMusic = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");

let musicStarted = false;


function startMusic() {

    if (!bgMusic) {
        return;
    }

    bgMusic.volume = 0.35;

    bgMusic
        .play()
        .then(() => {

            musicStarted = true;

            musicBtn.classList.add("playing");

            musicBtn.textContent = "♫";

        })
        .catch(() => {

            // Browser may block autoplay.
            // Music will start on another user click.

        });
}


function toggleMusic() {

    if (!bgMusic) {
        return;
    }


    if (bgMusic.paused) {

        bgMusic
            .play()
            .then(() => {

                musicStarted = true;

                musicBtn.classList.add("playing");

                musicBtn.textContent = "♫";

            })
            .catch(() => {});

    } else {

        bgMusic.pause();

        musicBtn.classList.remove("playing");

        musicBtn.textContent = "♪";

    }

}


if (musicBtn) {

    musicBtn.addEventListener("click", toggleMusic);

}


/* =========================================================
   START MUSIC ON FIRST USER INTERACTION
========================================================= */

document.addEventListener(
    "click",
    function () {

        if (!musicStarted) {
            startMusic();
        }

    },
    { once: true }
);


/* =========================================================
   PAGE 7 — SURPRISE REVEAL
========================================================= */

const revealBtn = document.getElementById("revealBtn");

const surpriseMessage =
    document.getElementById("surpriseMessage");


if (revealBtn && surpriseMessage) {

    revealBtn.addEventListener("click", function () {

        surpriseMessage.classList.add("show");

        revealBtn.style.display = "none";

    });

}


/* =========================================================
   PREVENT ACCIDENTAL SPACE / ARROW SCROLLING
========================================================= */

window.addEventListener("keydown", function (event) {

    const blockedKeys = [
        " ",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ];

    if (blockedKeys.includes(event.key)) {

        event.preventDefault();

    }

});


/* =========================================================
   INITIAL STATE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    goToPage(1);

    updatePasswordDisplay();

});