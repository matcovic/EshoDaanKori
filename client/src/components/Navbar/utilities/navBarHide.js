document.addEventListener("DOMContentLoaded", function () {
  try {
    var el_autohide = document.querySelector(".autohide");
    // add padding-top to bady (if necessary)
    var navbar_height = document.querySelector(".navbar").offsetHeight;

    document.body.style.paddingTop = navbar_height + "px";

    if (el_autohide) {
      var last_scroll_top = 0;
      window.addEventListener("scroll", function () {
        let scroll_top = window.scrollY;
        if (scroll_top < last_scroll_top) {
          el_autohide.classList.remove("scrolled-down");
          el_autohide.classList.add("scrolled-up");
        } else {
          el_autohide.classList.remove("scrolled-up");
          el_autohide.classList.add("scrolled-down");
        }
        last_scroll_top = scroll_top;
      });
    }
    /*for transparency on scroll*/
    // var nav = document.querySelector("nav");
    // var navTitle = document.querySelector(".navbar-brand.abs.nav-bar-title");
    // var navLinks = document.querySelectorAll(".collapse li a");

    // window.addEventListener("scroll", function () {
    //   if (window.pageYOffset > 70) {
    //     nav.classList.add("bg-white", "navbar-shadow");
    //     navTitle.classList.remove("navbar-font-color-white");
    //     for (var i = 0; i < navLinks.length; i++) {
    //       navLinks[i].classList.remove("navbar-font-color-white");
    //     }
    //   } else {
    //     nav.classList.remove("bg-white", "navbar-shadow");
    //     navTitle.classList.add("navbar-font-color-white");
    //     for (var i = 0; i < navLinks.length; i++) {
    //       navLinks[i].classList.add("navbar-font-color-white");
    //     }
    //   }
    // });
    // /* adjusting transparent navbar  */
    // document.body.style.paddingTop = "0";
  } catch (error) {
  }
});
