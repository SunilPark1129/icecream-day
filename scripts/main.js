// used Promise Method to calculate the delay of the animation and the duration of the continuous animation
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// this prevents transitions that are automatically triggered whenever the DOM is started
delay(100).then(() => {
  document.body.className = "";
});

// --------------------- nav scripts ------------------- //
const navSide = document.querySelector(".nav-side"),
  navSideLinks = document.querySelector(".nav-side-links"),
  screenDisable = document.querySelector(".screen-disable"),
  navSideSpan = document.querySelectorAll(".nav-side-icon span"),
  navLinks = document.querySelector(".links");

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
    navSideSpan[i].classList.toggle("side-icon-transition" + i);
  }
  navSide.classList.toggle("nav-side-actived");
  navSideLinks.classList.toggle("nav-side-actiavted");
  screenDisable.classList.toggle("display-block");
  document.body.classList.toggle("prevent-scrolling");
}

// closes the nav side links when the window resize exceeds a certain width value
window.addEventListener("resize", () => {
  let windowWidth = Math.max(
    window.innerWidth,
    document.documentElement.clientWidth
  );

  // after 960px the nav side links will be closed
  if (windowWidth > 960) {
    for (let i = 0; i < navSideSpan.length; i++) {
      navSideSpan[i].classList.remove("side-icon-transition" + i);
    }
    navSide.classList.remove("nav-side-actived");
    navSideLinks.classList.remove("nav-side-actiavted");
    screenDisable.classList.remove("display-block");
    document.body.classList.remove("prevent-scrolling");
  }
});

function removeClass() {
  isNavCoverOn = false;
  document.querySelector(".nav").classList.remove("nav-cover");
  document.querySelector(".logo").classList.remove("logo-resize");
  navLinks.classList.remove("nav-cover-on");
  navLinks.classList.add("display-none");

  delay(1000).then(() => {
    document.querySelector("main").classList.remove("main-hidden");
    navSide.classList.remove("nav-cover-on");
    navLinks.classList.remove("display-none");
    homeIntro(0);
  });
}

// ------------------------ page script ------------------------ //
const pageArticle = document.querySelectorAll(".overall-wrapper > article"),
  pageLinks = document.querySelectorAll(".links li");

// the value of the index that was used before
let prevIndex = 0;

// check if the checkTransitionTime still in progress
let checkTransitionTime = true;

const homeMenuBtn = document
  .querySelector(".home-menu__btn")
  .addEventListener("click", () => {
    pageMove(1);
  });

const menuEventbtn = document
  .querySelector(".menu-event__btn")
  .addEventListener("click", () => {
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
    document
      .querySelectorAll(".nav-side-links li")
      [i].addEventListener("click", () => {
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
  pageArticle[prevIndex].style.transition = "transform 0s";
  pageArticle[currentIndex].style.transition = "transform 0s";

  // place an order
  pageArticle[prevIndex].style.order = 2;
  pageArticle[currentIndex].style.order = 1;

  // let order 2 is left = 100%, and order 1 is left = 0 (there is only transform transition)
  // then calculate with the translateX to show move effect
  pageArticle[prevIndex].style.transform = "translateX(-100%)";
  pageArticle[currentIndex].style.transform = "translateX(100%)";
  pageArticle[currentIndex].style.height = "auto";

  // to show animation effect correctly
  delay(100)
    .then(() => {
      pageArticle[prevIndex].style.transition = "transform 1s";
      pageArticle[currentIndex].style.transition = "transform 1s";
      pageArticle[prevIndex].style.transform = "translateX(-200%)";
      pageArticle[currentIndex].style.transform = "translateX(0)";
    })
    .then(
      delay(1000).then(() => {
        for (let i = 0; i < pageLinks.length; i++) {
          if (i != currentIndex) {
            pageArticle[i].style.height = "0";
            pageArticle[i].style.transition = "transform 0s";
            pageArticle[i].style.order = "3";
            pageArticle[i].style.transform = "translateX(0)";
          }
        }
        prevIndex = currentIndex;
        checkTransitionTime = true;
      })
    );

  if (currentIndex == 0) {
    homeIntro(0);
    // Prevents the transition works when a user go to the home page from another page
    homeMenuImage.classList.remove("transform-box");
    homeMenuText.classList.remove("transform-box");
  }
}

// -------------------- home-intro scripts ------------------ //
const homeIntroImage = document.querySelectorAll(".home-intro .image-box img"),
  homeIntroBtn = document.querySelectorAll(".home-intro__btn button"),
  homeIntroText = document.querySelectorAll(".home-intro .text-box p"),
  homeIntroSpan = document.querySelectorAll(".home-intro__text-bg span");
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
  homeIntroBtn[n].style.backgroundColor = "rgb(255, 113, 113)";
  homeIntroImage[n].classList.remove("display-none");
  homeIntroText[n].classList.remove("display-none");

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
      homeIntroBtn[i].style.backgroundColor = "";
      homeIntroImage[i].classList.add("display-none");
      homeIntroText[i].classList.add("display-none");
    }
  }
}

// ----------------- home-menu, about-us, hire scripts ---------------- //
const homeMenuImage = document.querySelector(".home-menu .image-box"),
  homeMenuText = document.querySelector(".home-menu .text-box"),
  homeAboutImage = document.querySelector(".home-about-us .image-box"),
  homeAboutText = document.querySelector(".home-about-us .text-box"),
  homeHireImage = document.querySelector(".home-hire .image-box"),
  homeHireText = document.querySelector(".home-hire .text-box");

window.addEventListener("scroll", () => {
  let windowHeight = Math.max(
    window.innerHeight,
    document.documentElement.clientHeight
  );

  let menuHomePosition = document.querySelector(".home-menu").offsetTop,
    aboutUsPosition = document.querySelector(".home-about-us").offsetTop,
    hirePosition = document.querySelector(".home-hire").offsetTop;

  // transform position changes when the current scroll position reaches a calculated value
  if (
    document.documentElement.scrollTop >=
    menuHomePosition + (350 - windowHeight)
  ) {
    homeMenuImage.classList.add("transform-box");
    homeMenuText.classList.add("transform-box");
  } else {
    homeMenuImage.classList.remove("transform-box");
    homeMenuText.classList.remove("transform-box");
  }
  if (
    document.documentElement.scrollTop >=
    aboutUsPosition + (350 - windowHeight)
  ) {
    homeAboutImage.classList.add("transform-box");
    homeAboutText.classList.add("transform-box");
  } else {
    homeAboutImage.classList.remove("transform-box");
    homeAboutText.classList.remove("transform-box");
  }
  if (
    document.documentElement.scrollTop >=
    hirePosition + (350 - windowHeight)
  ) {
    homeHireImage.classList.add("transform-box");
    homeHireText.classList.add("transform-box");
  } else {
    homeHireImage.classList.remove("transform-box");
    homeHireText.classList.remove("transform-box");
  }
});

// --------------------------- menu script --------------------------- //
const menuItemBox = document.getElementsByClassName("item-box"),
  menuItems = document.querySelectorAll(".item-box .items"),
  menuStyle = menuItemBox[0].getElementsByClassName("items"),
  menuFlavor = menuItemBox[1].getElementsByClassName("items"),
  menuCone = menuItemBox[2].getElementsByClassName("items"),
  menuTotal = document.querySelector(".menu-total");

// all the ice creams information are stored in here
const menuItemArray = {
  style: [
    {
      id: 1,
      text: "Soft Ice Cream",
      price: 3.0,
      needCup: true,
    },
    {
      id: 2,
      text: "Hard Ice Cream",
      price: 3.0,
      needCup: true,
    },
    {
      id: 3,
      text: "Sorbet",
      price: 4.0,
      needCup: true,
    },
    {
      id: 4,
      text: "Frozen Yogurt",
      price: 5.95,
      needCup: false,
    },
    {
      id: 5,
      text: "Milkshake",
      price: 5.95,
      needCup: false,
    },
  ],
  flavor: [
    {
      id: 1,
      text: "Vanilla",
    },
    {
      id: 2,
      text: "Chocolate",
    },
    {
      id: 3,
      text: "Pistachio",
    },
    {
      id: 4,
      text: "Mango",
    },
    {
      id: 5,
      text: "Strawberry",
    },
    {
      id: 6,
      text: "Banana",
    },
    {
      id: 7,
      text: "Mint",
    },
    {
      id: 8,
      text: "Cookies N' Cream",
    },
    {
      id: 9,
      text: "Green Tea",
    },
  ],
  cone: [
    {
      id: 1,
      text: "Sugar Cone",
      price: 0.5,
    },
    {
      id: 2,
      text: "Waffle Cone",
      price: 1.0,
    },
    {
      id: 3,
      text: "Waffle Bowl",
      price: 2.0,
    },
    {
      id: 4,
      text: "Cup",
      price: 0.5,
    },
  ],
};

let icecream = {
  // array[0] is name , array[1] is price
  style: new Array(2),
  flavor: "",
  cone: new Array(2),
};

// they are the output to display the name and total
let itemName = document.getElementById("item-name"),
  itemPrice = document.getElementById("item-price");

// check on an item that does not require a cup
let isCupAvailable = true;

// moves to a function when an menu item is slectetd
for (let i = 0; i < menuStyle.length; i++) {
  ((i) => {
    menuStyle[i].addEventListener("click", () => {
      getMenuStyle(i);
    });
  })(i);
}

for (let i = 0; i < menuFlavor.length; i++) {
  ((i) => {
    menuFlavor[i].addEventListener("click", () => {
      getMenuFlavor(i);
    });
  })(i);
}

for (let i = 0; i < menuCone.length; i++) {
  ((i) => {
    menuCone[i].addEventListener("click", () => {
      getMenuCone(i);
    });
  })(i);
}

// user clicks a button to reset
document.querySelector(".menu-btn").addEventListener("click", () => {
  resetMenuItems();
});

function getMenuStyle(n) {
  isCupAvailable = true;
  menuItemBackground(menuStyle, n);
  menuItemArray["style"].filter((arrayList) => {
    if (arrayList.id === n + 1) {
      icecream.style[0] = arrayList.text;
      icecream.style[1] = arrayList.price;

      // when the selected item does not require a cone
      if (arrayList.needCup === false) {
        icecream.cone[0] = "";
        icecream.cone[1] = "";
        for (let i = 0; i < menuCone.length; i++) {
          menuCone[i].classList.remove("item-background");
        }
        menuItemBox[2].classList.add("display-none");
        isCupAvailable = false;
      } else if (!icecream.flavor == "") {
        menuItemBox[2].classList.remove("display-none");
      }
    }
  });

  // when the item is required a cone, but selected other items, then remove the total
  if (icecream.cone[0] == "" && !icecream.flavor == "" && isCupAvailable) {
    menuTotal.classList.add("display-none");
  }
  menuItemBox[1].classList.remove("display-none");
  window.scrollTo(0, menuItemBox[1].offsetTop);
  addArrays();
}

function getMenuFlavor(n) {
  let windowHeight = Math.max(
    window.innerHeight,
    document.documentElement.clientHeight
  );
  menuItemBackground(menuFlavor, n);
  menuItemArray["flavor"].filter((arrayList) =>
    arrayList.id === n + 1 ? (icecream.flavor = arrayList.text) : -1
  );
  if (isCupAvailable) {
    menuItemBox[2].classList.remove("display-none");
    window.scrollTo(0, menuItemBox[2].offsetTop);
  } else {
    menuTotal.classList.remove("display-none");
    window.scrollTo(
      0,
      menuTotal.offsetTop - (windowHeight - menuTotal.offsetHeight - 100)
    );
  }
  addArrays();
}

function getMenuCone(n) {
  let windowHeight = Math.max(
    window.innerHeight,
    document.documentElement.clientHeight
  );
  menuItemBackground(menuCone, n);
  menuItemArray["cone"].filter((arrayList) => {
    if (arrayList.id === n + 1) {
      icecream.cone[0] = arrayList.text;
      icecream.cone[1] = arrayList.price;
    }
  });
  menuTotal.classList.remove("display-none");
  window.scrollTo(
    0,
    menuTotal.offsetTop - (windowHeight - menuTotal.offsetHeight - 100)
  );
  addArrays();
}

// adds a background color to the selected item
function menuItemBackground(target, currentIndex) {
  for (let i = 0; i < target.length; i++) {
    target[i].classList.remove("item-background");
  }
  target[currentIndex].classList.add("item-background");
}

// whenever new item is selected, it is stored in an array
function addArrays() {
  let icecreamName =
    icecream.flavor + " " + icecream.style[0] + " " + icecream.cone[0];
  let icecreamPrice = "$ " + (icecream.style[1] + icecream.cone[1]);
  itemName.innerHTML = icecreamName;
  itemPrice.innerHTML = icecreamPrice;
}

function resetMenuItems() {
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.remove("item-background");
  }
  menuItemBox[1].classList.add("display-none");
  menuItemBox[2].classList.add("display-none");
  menuTotal.classList.add("display-none");
  window.scrollTo(0, menuItemBox[0].offsetTop - 100);
}
