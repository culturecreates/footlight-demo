function addCard(cardName, url) {
  if (cardName == "validate-site-card") {

     document.getElementById("site-name-check").innerText = url
     let card = document.getElementById("validate-site-card");
     crawlResult.innerHTML += card.innerHTML
  //  crawlResult.innerHTML += "<h5>Is this the site?</h5> <p>" + str   + "</p> <button onclick='scrapeSite(\"" + compose_scraper_url(str) + "\")' class='button is-large'> Yes</button>"
} else if (cardName == "quote-bot-1") {
  let card = document.getElementById("quote-bot-1");
  crawlResult.innerHTML = card.innerHTML
} else if (cardName == "rate-site-card") {
  let card = document.getElementById("rate-site-card");
  crawlResult.innerHTML += card.innerHTML
}
}
