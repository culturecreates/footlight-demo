function addCard(cardName, str) {
  if (readyForNextCard()) {
    console.log("Showing card:" + cardName)
    if (cardName == "analyzing-card")  {
        goBtn.classList.add('is-loading');
        let card = document.getElementById(cardName);
        crawlResult.innerHTML += card.innerHTML

      }
    else if (cardName == "validate-site-card")  {
        document.getElementById("site-name-check").innerText = str
        let card = document.getElementById(cardName);
        crawlResult.innerHTML = card.innerHTML
      }
    else if (cardName == "quote-bot-1")  {
        let card = document.getElementById(cardName);
        crawlResult.innerHTML = card.innerHTML
      }
    else if (cardName == "rate-site-card")  {
        document.getElementById("rate-site-name").innerText = str[0]
        let card = document.getElementById(cardName);
        crawlResult.innerHTML = card.innerHTML
      }
    else if (cardName == "event-card")  {
        document.getElementById("event-name").innerText = str[0]
        document.getElementById("event-thumbnail").src = str[1]
        let card = document.getElementById(cardName);
        crawlResult.innerHTML += card.innerHTML
      }
    else if (cardName == "clear-all") {
        crawlResult.innerHTML = ""
      }
    startMinimumCountDown()
  } else {
    //Callback when countDown is over
    cardQueue.push([cardName,str])
    console.log("Delaying card:" + cardName,cardQueue )
  }
}



function readyForNextCard() {
  if (countingDown === undefined) {
    // Initialize
    let countingDown = false
  }
  return !countingDown
}

function startMinimumCountDown() {
  countingDown = true
  console.log("Countdown starting...")
  setTimeout(function () {
    countingDown = false;
    console.log("Countdown end.");
    if (cardQueue.length > 0) {
      let cardData = cardQueue.shift()
      addCard(cardData[0], cardData[1])
    }
  }, 4000);
}
