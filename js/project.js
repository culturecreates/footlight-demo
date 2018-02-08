
const crawlResult = document.getElementById('crawl-result');
const crawlDebug = document.getElementById('crawl-debug');
const goBtn = document.getElementById('go-btn');
const websiteInput = document.getElementById("website-input");
const hero = document.getElementById("hero");

let countingDown
let cardQueue = []


const preNote = "<p class='fade-out notification is-info is-size-5'>"
const postNote ="</p>"


document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});


goBtn.addEventListener('click',analyzeSite);

websiteInput.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
      goBtn.click();
  }
});
