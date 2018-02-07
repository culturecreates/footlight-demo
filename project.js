
const crawlResult = document.getElementById('crawl-result');
const crawlDebug = document.getElementById('crawl-debug');
const goBtn = document.getElementById('go-btn');
const websiteInput = document.getElementById("website-input");
const hero = document.getElementById("hero");


const preNote = "<p class='fade-out round-box is-size-5'>"
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


goBtn.addEventListener("click",analyzeSite);

websiteInput.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
      goBtn.click();
  }
});

function loadUrl(url) {
  websiteInput.value = url;
}

function analyzeSite() {
  //validate url

  if (websiteInput.value != "") {
    let url = "https://culture-ie.herokuapp.com/basic_scraper.json?site=" + encodeURI(websiteInput.value);
    scrapeSite(url);
    crawlResult.innerHTML = "Analyzing..."
    goBtn.classList.add('is-loading');

    setTimeout(function () {
     hero.style.display = "none";
     document.body.scrollTop = 0;

   }, 2000);
    hero.style.opacity = 0;


  } else {
    crawlResult.innerHTML = preNote + "Please enter the name or URL of an arts organization." + postNote

  }
}


function scrapeSite(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then(function(jsonResp) {

      crawlResult.innerHTML = "";
      crawlDebug.innerHTML = "";

      crawlDebug.innerHTML += JSON.stringify(jsonResp,null,4);

      if (jsonResp.status == 200) {
        title = jsonResp.data.og_title || jsonResp.data.page_title;
        description = jsonResp.data.og_description || jsonResp.data.page_description;

        if (title != null) {
          crawlResult.innerHTML += "<h1>" + title + "</h1>";
        }
        if (description != null) {
          crawlResult.innerHTML += "<h5>" + description + "</h5>";
        }

        if (jsonResp.data.my_markup == null && jsonResp.data.my_microdata == "") {
          crawlResult.innerHTML += "<p>OH NOOOO! There is no structured data on this page. If there are any events on this website they are invisible to bots.</p>";
        } else {
            crawlResult.innerHTML += "<p>Not Bad! Some structured data found.</p>";
        }
        crawlDebug.innerHTML += "<p> Facebook:" + jsonResp.data.my_facebook_id + "</p>";
        crawlResult.innerHTML += "<p> Searching for events...</p>";

        goBtn.classList.remove('is-loading');

        fbid = jsonResp.data.my_facebook_id;
        if (fbid != "") {
          loadFacebookEvents(jsonResp.data.my_facebook_id);
        } else {
          crawlResult.innerHTML += "<p> But I can't find this site's Facebook page. I'll have to improve my algorithm :-(</p>";
        }

      } else {
        if (jsonResp.status == 400) {
          crawlResult.innerHTML += "<p>Please enter a valid URL</p>";
          if  (jsonResp.data.hasOwnProperty('alternatives')) {
            crawlResult.innerHTML += "<ul>";
            for (var i = 0; i < 3; i++) {
              crawlResult.innerHTML += "<li><a style='cursor:pointer;' onclick='loadUrl(\"" + jsonResp.data.alternatives[i][1] + "\");'>" + jsonResp.data.alternatives[i][0] + "</a></li>";
            }
            crawlResult.innerHTML += "</ul>";

          }
        }
        goBtn.classList.remove('is-loading');
      }

    })
    .catch(function(error) {
        crawlResult.HTML = "<pre>Error: " + error + "</pre>";
    });

}


function loadFacebookEvents(fbid) {
  let url = "https://culture-ie.herokuapp.com/facebook.json?fbid=" + encodeURI(fbid);

  fetch(url)
    .then((resp) => resp.json())
    .then(function(jsonResp) {

      crawlDebug.innerHTML += JSON.stringify(jsonResp,null,4);

      if (jsonResp.status == 500) {
        crawlResult.innerHTML += "<p>I ran into an error. I need improvement :-( </p> "
      } else {
        let events = jsonResp.data.events;
        if (events) {
          let x = events.length;

          crawlResult.innerHTML += "<p> Footlight Technology found " + x + " events coming in the next 6 months</p><ul>";
          if (x > 0) {
            events.forEach(function(event) {
              crawlResult.innerHTML += "<li> " + event.name +  "</li> "
            });
            crawlResult.innerHTML += "</ul> ";
          }
        } else {
          crawlResult.innerHTML += "<p> I couldn't find any events. I need improvement. "
        }
        }


    })
    .catch(function(error) {
        crawlResult.innerHTML += "Error" + error;
    });
}
