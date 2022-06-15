// used Promise Method to calculate the delay of the animation and the duration of the continuous animation
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// this prevents transitions that are automatically triggered whenever the DOM is started
delay(100).then(() => {
    document.body.className = "";
});

// --------------------- nav scripts ------------------- //
const navSide = document.querySelector('.nav-side'),
    navSideLinks = document.querySelector('.nav-side-links'),
    screenDisable = document.querySelector('.screen-disable'),
    navSideSpan = document.querySelectorAll('.nav-side-icon span'),
    navLinks = document.querySelector('.links');

// this element checks whether nav-cover has removed
// if false, the removeClass function will no longer work
let isNavCoverOn = true;

// toggle proceeds when click the nav side icon
navSide.addEventListener("click", () => {
    navSideToggle();
});

// close the nav side links when click on outside of the nav
screenDisable.addEventListener("click", () => {
    navSideToggle();
});

// load or close nav side links
function navSideToggle() {
    // toggle animation effects to the nav side icon
    for (let i = 0; i < navSideSpan.length; i++) {
        navSideSpan[i].classList.toggle('side-icon-transition' + i);
    }
    navSide.classList.toggle('nav-side-actived');
    navSideLinks.classList.toggle('nav-side-actiavted');
    screenDisable.classList.toggle('display-block');
    document.body.classList.toggle('prevent-scrolling');
}

// closes the nav side links when the window resize exceeds a certain width value
window.addEventListener("resize", () => {
    let windowWidth = Math.max(
        window.innerWidth, document.documentElement.clientWidth
    );

    // after 960px the nav side links will be closed
    if (windowWidth > 960) {
        for (let i = 0; i < navSideSpan.length; i++) {
            navSideSpan[i].classList.remove('side-icon-transition' + i);
        }
        navSide.classList.remove('nav-side-actived');
        navSideLinks.classList.remove('nav-side-actiavted');
        screenDisable.classList.remove('display-block');
        document.body.classList.remove('prevent-scrolling');
    }
});

function removeClass() {
    isNavCoverOn = false;
    document.querySelector('.nav').classList.remove('nav-cover');
    document.querySelector('.logo').classList.remove('logo-resize');
    navLinks.classList.remove('nav-cover-on');
    navLinks.classList.add('display-none');

    delay(1000).then(() => {
        document.querySelector('main').classList.remove('main-hidden');
        navSide.classList.remove('nav-cover-on');
        navLinks.classList.remove('display-none');
        homeIntro(0);
    });
}


// ------------------------ page script ------------------------ //
const pageSection = document.querySelectorAll('.overall-wrapper > section'),
    pageLinks = document.querySelectorAll('.links li');

// the value of the index that was used before
let prevIndex = 0;

// check if the checkTransitionTime still in progress
let checkTransitionTime = true;

const homeMenuBtn = document.querySelector('.home-menu__btn').addEventListener("click", () => {
    pageMove(1);
});

const menuEventbtn = document.querySelector('.menu-event__btn').addEventListener("click", () => {
    pageMove(2);
});

// top nav link btn
for (let i = 0; i < pageLinks.length; i++) {
    ((i) => {
        pageLinks[i].addEventListener("click", () => {
            if (checkTransitionTime && prevIndex != i) {
                pageMove(i);
            }

            // check if the nav cover already removed once
            if (isNavCoverOn) {
                removeClass();
            }
        });
    })(i);
}

// side nav link btn
for (let i = 0; i < pageLinks.length; i++) {
    ((i) => {
        document.querySelectorAll('.nav-side-links li')[i].addEventListener("click", () => {
            if (checkTransitionTime && prevIndex != i) {
                pageMove(i);
                navSideToggle();
            }
        });
    })(i);
}

// to move pages
function pageMove(currentIndex) {
    window.scrollTo(0, 0);
    checkTransitionTime = false;

    // to set the initial value of translateX, set the transform time to 0s
    pageSection[prevIndex].style.transition = 'transform 0s';
    pageSection[currentIndex].style.transition = 'transform 0s';

    // place an order
    pageSection[prevIndex].style.order = 2;
    pageSection[currentIndex].style.order = 1;

    // let order 2 is left = 100%, and order 1 is left = 0 (there is only transform transition)
    // then calculate with the translateX to show move effect
    pageSection[prevIndex].style.transform = 'translateX(-100%)';
    pageSection[currentIndex].style.transform = 'translateX(100%)';
    pageSection[currentIndex].style.height = 'auto';

    // to show animation effect correctly
    delay(100).then(() => {
        pageSection[prevIndex].style.transition = 'transform 1s';
        pageSection[currentIndex].style.transition = 'transform 1s';
        pageSection[prevIndex].style.transform = 'translateX(-200%)';
        pageSection[currentIndex].style.transform = 'translateX(0)';
    }).then(delay(1000).then(() => {
        for (let i = 0; i < pageLinks.length; i++) {
            if (i != currentIndex) {
                pageSection[i].style.height = '0';
                pageSection[i].style.transition = 'transform 0s';
                pageSection[i].style.order = '3';
                pageSection[i].style.transform = 'translateX(0)';
            }
        }
        prevIndex = currentIndex;
        checkTransitionTime = true;
    }));

    if (currentIndex == 0) {
        homeIntro(0);
        // Prevents the transition works when a user go to the home page from another page
        homeMenuImage.classList.remove('transform-box');
        homeMenuText.classList.remove('transform-box');
    }
}

// -------------------- home-intro scripts ------------------ //
const homeIntroImage = document.querySelectorAll('.home-intro .image-box img'),
    homeIntroBtn = document.querySelectorAll('.home-intro__btn p'),
    homeIntroText = document.querySelectorAll('.home-intro .text-box p'),
    homeIntroSpan = document.querySelectorAll('.home-intro__text-bg span');
let homePrevIndex = 0;

for (let i = 0; i < homeIntroBtn.length; i++) {
    ((i) => {
        homeIntroBtn[i].addEventListener("click", () => {
            let x = i;
            // prevents from restarting the function when the user presses it once more
            if (homePrevIndex != i) {
                homeIntro(i);
            }
            homePrevIndex = x;
        });
    })(i);
}

// this function exchanges images and texts whenever the user selects an item
function homeIntro(n) {

    // current index of element is now visible by removing display-none element
    homeIntroBtn[n].style.backgroundColor = 'rgb(255, 113, 113)';
    homeIntroImage[n].classList.remove('display-none');
    homeIntroText[n].classList.remove('display-none');

    // to show the animation effect, remove transition elements and put a new one to each spans
    for (let j = 0; j < homeIntroSpan.length; j++) {
        homeIntroSpan[j].classList.remove(`spanfade${j}`);
    }

    delay(100).then(() => {
        for (let i = 0; i < homeIntroSpan.length; i++) {
            homeIntroSpan[i].classList.add(`spanfade${i}`);
        }
    });

    // all elements are invisible except for the current index
    for (let i = 0; i < homeIntroText.length; i++) {
        if (n != i) {
            homeIntroBtn[i].style.backgroundColor = '';
            homeIntroImage[i].classList.add('display-none');
            homeIntroText[i].classList.add('display-none');
        }
    }
}