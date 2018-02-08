function analyzeSite() {

  // remove focus so keyboard on mobile will close
    websiteInput.blur()

  //validate url
  if (websiteInput.value != "") {
    let url = compose_scraper_url(websiteInput.value);
    addCard('analyzing-card')
    //crawlResult.innerHTML = preProcess + "Analyzing..." + postProcess
    scrapeSite(url);

    setTimeout(function () {
      hero.style.display = "none";
      setTimeout(function () {
        document.body.scrollTop = 0;
      }, 100);
    }, 1000);
    hero.style.opacity = 0;

  } else {
    crawlResult.innerHTML = preNote + "Please enter the name or URL of an arts organization." + postNote
  }
}
