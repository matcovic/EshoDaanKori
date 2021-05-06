document.addEventListener("DOMContentLoaded", function () {
  try {
    var el_autohide = document.querySelector(".autohide");

    // add padding-top to bady (if necessary)
    var navbar_height = document.querySelector(".navbar").offsetHeight;
    //    var navbar_height = 50;
    console.log(`navbar height: ${navbar_height}`);

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
  } catch (error) {
    console.log(`Ignore this: ${error.message}`);
  }
});
