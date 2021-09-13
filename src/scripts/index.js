// Any code you will write for your website (in the future!) should go here
var navLinks = undefined;

function prepNavLinks() {
  //Find all of them
  navLinks = document.getElementsByClassName("nav-link");

  //Add Click handler to navLinks
  for (const navLink of navLinks) {
    navLink.addEventListener("click", onLinkClick);
  }
}

function onLinkClick(link) {
  //Find all links that are marked as active
  let active = [];
  for (const navLink of navLinks) {
    if (navLink.classList.contains("active")) active.push(navLink);
  }

  //Remove the active class
  for (const navLink of active) {
    navLink.classList.remove("active");
    navLink.removeAttribute("aria-current");
  }

  //Loop through all nav links at set those with the same hash value to be active
  for (const navLink of navLinks) {
    if (navLink.hash === this.hash) {
      navLink.classList.add("active");
      navLink.setAttribute("aria-current", "page");
    }
  }

  //Load the page into main
  loadPage(this.hash);
}

async function loadPage(href) {
  let url =
    window.location.origin +
    window.location.pathname +
    `pages/${href.replace("#", "_")}.html`;
  let page = undefined;

  //Get Page from Server
  page = await new Promise((resolve, reject) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          resolve(httpRequest.responseText);
        } else {
          reject(`HTTP-status: ${httpRequest.status}`);
        }
      }
    };
    httpRequest.open("GET", url);
    httpRequest.send();
  }).catch(() => {
    page = undefined;
  });

  //Load Page into main
  if (page != undefined) {
    document.getElementById("main").innerHTML = page;
  } else {
    document.getElementById("main").innerHTML =
      "Ooops, something went wrong. Can not load the page.";
  }
}

window.addEventListener("load", () => {
  prepNavLinks();
  loadPage("#home");
});
