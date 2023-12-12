const nav = document.getElementById("navbar");
const navItems = document.querySelectorAll(".nav-items li a");
const ulLinks = document.querySelector(".nav-items");
const links = document.querySelectorAll(".nav-items a");
const LanguagesTranslate = JSON.parse(localStorage.getItem("translations"));
const languageSelector = document.querySelector(".select-btn");
const selectOptions = document.querySelector(".options");
const select = document.querySelector(".select-input");
const options = document.querySelector(".select-options");
const hero = document.querySelector("#hero");
const about = document.querySelector("#about");
const servicesSection = document.querySelector("#services");
const contact = document.querySelector("#contact");
const servicesData = JSON.parse(localStorage.getItem("services"));
const menu = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const servicesOptions = document.querySelector(".select-services-options");
const supportBtn = document.querySelector("#support-btn");
const salesBtn = document.querySelector("#sales-btn");
const mobileLink = document.querySelectorAll(".nav-items-mobile li a");
// ================================= Close Mobile Navbar ========================================
mobileLink.forEach((e) =>
{
  e.addEventListener("click", () =>
  {
      document
        .querySelector("#mobile-navbar")
        .style.setProperty("display", "none", "important");
      document
        .querySelector(".overlay")
        .style.setProperty("display", "none", "important");
  })
})
// //=============================== change style Navbar On Scroll ================================
window.addEventListener("scroll", () => {
  if (window.scrollY >= 20) {
    nav.classList.add("nav-scroll");
  } else {
    nav.classList.remove("nav-scroll");
  }
});
supportBtn.addEventListener("click", () => {
  document
    .querySelector(".select-serve-input")
    .style.setProperty("display", "none", "important");
});
salesBtn.addEventListener("click", () => {
  document
    .querySelector(".select-serve-input")
    .style.setProperty("display", "flex", "important");
});
// //======================================== Toggle Navbar ======================================
closeIcon.addEventListener("click", () =>
{
  document.querySelector("#mobile-navbar").style.setProperty("display", "none", "important");
  document
    .querySelector(".overlay")
    .style.setProperty("display", "none", "important");
});
menu.addEventListener("click", () => {
  document.querySelector("#mobile-navbar").style.setProperty("display", "flex", "important");
    document
      .querySelector(".overlay")
      .style.setProperty("display", "block", "important");
});
//================================= Active Items On Scroll ========================================
const removeClass = (links) => {
  links.forEach((e) => {
    e.classList.remove("link-active");
  });
};
window.addEventListener("scroll", () => {
  if (
    window.scrollY >= hero.offsetTop &&
    window.scrollY < about.offsetTop - 400
  ) {
    removeClass(links);
    links[0].classList.add("link-active");
  } else if (
    window.scrollY >= about.offsetTop - 400 &&
    window.scrollY < servicesSection.offsetTop - 300
  ) {
    removeClass(links);
    links[1].classList.add("link-active");
  } else if (
    window.scrollY >= servicesSection.offsetTop - 400 &&
    window.scrollY < contact.offsetTop - 300
  ) {
    removeClass(links);
    links[2].classList.add("link-active");
  } else {
    removeClass(links);
    links[3].classList.add("link-active");
  }
});
// =============================== Select drop down =====================================
select.addEventListener("click", () => {
  options.classList.toggle("toggle-options");
});
// ================================= Translations =======================================
/* Show & Hide Select Language */
languageSelector.addEventListener("click", () => {
  selectOptions.classList.toggle("hide_lang_options");
  if (selectOptions.classList.contains("hide_lang_options")) {
    document.querySelector(".arrowDown").style.rotate = "";
  } else {
    document.querySelector(".arrowDown").style.rotate = "180deg";
  }
});
/* SetUp Language & store In Localstorage*/
function handleLanguage(lng)
{
  localStorage.setItem("lang", lng);
  setLanguage(lng);
}
/* SetUp Language On Load Project */
window.onload = (e) => {
  const language = localStorage.getItem("lang") ? localStorage.getItem("lang"): "en";
  setLanguage(language);
}

const setLanguage = (language) => {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const translationKey = element.getAttribute("data-i18n");
    element.textContent = LanguagesTranslate[language][translationKey];
  });
  document.dir = language === "ar" ? "rtl" : "ltr";
  if (language == "en") {
    document.getElementById("stylesheet").href = "./assets/css/style.css";
    ulLinks.style.direction = "ltr";
    selectOptions.style.dispaly = "none";
  } else {
    document.getElementById("stylesheet").href = "./assets/css/style-ar.css";
    ulLinks.style.direction = "rtl";
    document.getElementById("name-input").placeholder = "الاسم";
    document.getElementById("number-input").placeholder = "الرقم";
    document.getElementById("email-input").placeholder = "البريد الإلكتروني";
    document.getElementById("message-input").placeholder = "الرسالة";
    selectOptions.style.dispaly = "none";
  }
};
// =============================  GET SERVICES DATA =============================
function getServicesTitles()
{
  const lng = localStorage.getItem("lang")
    ? localStorage.getItem("lang")
    : "en";
  document.querySelector(".services-bar").innerHTML = servicesData
    .map((el, index) => {
      return `
      <div id=${
        el.id % 2 === 0 ? "even" : "odd"
      } class="swiper-slide slide${index}" onClick="getServicesData(${
        el.id
      })"><div><h4>${lng == "en" ? el.en_name : el.ar_name}</h4></div></div>
      `;
    })
    .join("");
  document.querySelector(".slide0").click();
  document.querySelector(".slide0").classList.add("service_active");
}
getServicesTitles();


function getServicesData(id)
{
  const lng = localStorage.getItem("lang")
    ? localStorage.getItem("lang")
    : "en";
  document.querySelectorAll(".services-bar div")
    .forEach((el) => el.classList.remove("service_active"))
  document.querySelector(`.slide${id - 1}`).classList.add("service_active");
  
  let services = servicesData.find((el) => el.id == id)
  document.querySelector(".service-content").innerHTML = `
        <div class="serve-info">
              <h2>${lng == "en" ? services.en_title : services.ar_title}</h2>
              <p>${
                lng == "en" ? services.en_description : services.ar_description
              }</p>
            </div>
            <div class="serve-image">
              <img src=${services.image} alt="" id=${`services-img${id}`}>
            </div>
    `;
    
  if (lng == "ar")
  {
      document.getElementById(`services-img${id}`).style.transform ="rotateY(180deg)";
  }
}
function getServicesSelect()
{
  const lng = localStorage.getItem("lang") ?localStorage.getItem("lang") : "en"
  servicesOptions.innerHTML = servicesData.map((el) =>
  {
    return `
    <li>${lng == "en" ? el.en_name : el.ar_name}</li>
    `;
  }).join("")
}


