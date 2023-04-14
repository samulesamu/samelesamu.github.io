// Check initial viepwort width
document.addEventListener("DOMContentLoaded", checkViewportWidth);

function checkViewportWidth() {
    if (document.querySelector('.container-menu')) {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const elemMenuList = document.querySelector('.container-menu');

        if (vw >= 768) {
            elemMenuList.classList.add("menu-desktop");
            elemMenuList.classList.remove("menu-mobile");
        }
        else {
            elemMenuList.classList.add("menu-mobile");
            elemMenuList.classList.remove("menu-desktop");
        }
    }
}

// Monitor viepwort width
window.onresize = checkViewportWidth;

// Show/hide fly-out mobile menu
if (document.querySelector('.container-menu')) {
    document.querySelector('.item-icon').addEventListener('click', toggleMobileMenu)
}

function toggleMobileMenu() {
    //toggle hamburger icon
    const elemIcon = document.querySelector('.item-icon');
    const elemMenu = document.querySelector('.container-menu');
    const elemMenuList = document.querySelector('.container-menu ul');
    elemIcon.classList.toggle("change");
    const elemHTML = document.querySelector('html');

    // If fly-out menu is currently hidden, display it.
    if (elemIcon.classList.contains('change')) {
        elemMenuList.classList.add('mobile-display');
        elemMenu.classList.add('menu-on-scroll');
        elemHTML.classList.add('no-scroll');
    }    
    //if fly-out menu is currently open, close it.
    else {
        elemMenuList.classList.remove('mobile-display');
        elemHTML.classList.remove('no-scroll');
        elemMenu.classList.remove('menu-on-scroll');
    }
}

// On-scroll colours
if (document.querySelector('.container-menu')) {
    window.onscroll = function() {swapMenuStyle()};
    const el_menu = document.querySelector('.container-menu');
    const el_menu_onscroll = el_menu.offsetTop +300;
}

function swapMenuStyle() {
    if (document.querySelector('.container-menu')) {
        const el_menu = document.querySelector('.container-menu');
        const el_menu_onscroll = el_menu.offsetTop +300;
        if ( window.pageYOffset > el_menu_onscroll) {
            el_menu.classList.add("menu-on-scroll");
        } 
        else {
            el_menu.classList.remove("menu-on-scroll")
        }
    }
}

// Check initial menu scroll position
document.addEventListener("DOMContentLoaded", checkMenuScrollPosition);

function checkMenuScrollPosition() {
    var y = window.scrollY;
    if (y === 0) {
        if (document.querySelector('.container-menu')) {
            const el_menu = document.querySelector('.container-menu');
            el_menu.classList.remove("menu-on-scroll")
        }
    }
}

//Hide the tip amount on load
document.getElementById("tipDisplayBox").style.display = "none";
document.getElementById("numOfPeople").value = 1;

// Calculate tip
function calculateTip() {
   let billAmount = document.getElementById("billAmount").value;
   let serviceQuality = document.getElementById("serviceQuality").value;
   let numOfPeople = document.getElementById("numOfPeople").value;

   // Validate input
    if (billAmount === "" || serviceQuality == 0) {
      alert("Please enter values");
      return;
   }

   // Calculate tip
   let tipTotal = (billAmount * serviceQuality);
   // round to two decimal places
   tipTotal = Math.round(tipTotal * 100) / 100;
   // next line allows us to always have two digits after decimal point
   tipTotal = tipTotal.toFixed(2);
   // Display the tip
   document.getElementById("tipDisplayBox").style.display = "block";
   document.getElementById("tipTotal").innerHTML = tipTotal;
   // Check to see if this input is empty or less than or equal to 1
   if (numOfPeople === "" || parseInt(numOfPeople) <= 1)  {
      numOfPeople = 1;
      document.getElementById("numOfPeople").value = 1;
      tipEach = tipTotal;
   }
  document.getElementById("tipEach").innerHTML = (tipTotal / numOfPeople).toFixed(2);
}

// click to call function
document.getElementById("calculate").onclick = () => calculateTip();