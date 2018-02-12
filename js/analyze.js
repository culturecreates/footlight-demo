function analyzeSite() {

  // remove focus so keyboard on mobile will close
  websiteInput.blur()

  // start button spinner
  goBtn.classList.add('is-loading');

  crawlDebug.innerHTML = "";

  //validate url
  if (websiteInput.value != "") {
    let url = compose_scraper_url(websiteInput.value);
    addCard('clear-all','',500)
    addCard('analyzing-card','',1000)
    addCard('quote-bot-1','',5000);
    scrapeSite(url);

    // Hide HERO on page to make more room
    setTimeout(function () {
      hero.style.display = "none";
      setTimeout(function () {
        document.body.scrollTop = 0;
      }, 100);
    }, 1000);
    hero.style.opacity = 0;

  } else {
    addCard('clear-all','',500)
    addCard('message-card',['Please enter a name or URL'],3000)
    addCard('clear-all','',500)
  }
}
