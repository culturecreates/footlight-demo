let countingDown
let cardQueue = []

function addCard(cardName, data, delay_ms) {
  if (delay_ms == undefined) {delay_ms = 3000};
  if (readyForNextCard()) {
    console.log("Showing card:" + cardName + " delay:" + delay_ms)

    if (cardName == "analyzing-card")  {
        crawlResult.innerHTML += document.getElementById(cardName).innerHTML
      }
    else if (cardName == "message-card")  {
        document.getElementById("message-text").innerHTML = data[0]
        crawlResult.innerHTML += document.getElementById(cardName).innerHTML
        goBtn.classList.remove('is-loading');
      }
    else if (cardName == "validate-site-card")  {
        // data  = [[name,url],[name,url]]
        let altUrl =  data[0][1]
        document.getElementById("site-name-check").innerText = altUrl
        crawlResult.innerHTML += document.getElementById(cardName).innerHTML
        goBtn.classList.remove('is-loading');
      }
    else if (cardName == "quote-bot-1")  {
        crawlResult.innerHTML += document.getElementById(cardName).innerHTML
      }
    else if (cardName == "rate-site-card")  {
        // data = jsonResp
        title = data.data.og_title || data.data.page_title;
        description =  data.data.og_description || data.data.page_description;

        document.getElementById("rate-site-title").innerText = title
        document.getElementById("rate-site-description").innerText = description
        // if (title != null) {
        //   crawlResult.innerHTML += "<h1>" + title + "</h1>";
        // }
        // if (description != null) {
        //   crawlResult.innerHTML += "<h5>" + description + "</h5>";
        // }
        // if (jsonResp.data.my_markup == null && jsonResp.data.my_microdata == "") {
        //   crawlResult.innerHTML += "<p>OH NOOOO! There is no structured data on this page. If there are any events on this website they are invisible to bots.</p>";
        // } else {
        //     crawlResult.innerHTML += "<p>Not Bad! Some structured data found.</p>";
        // }
        // crawlDebug.innerHTML += "<p> Facebook:" + jsonResp.data.my_facebook_id + "</p>";
        // crawlResult.innerHTML += "<p> Searching for events...</p>";

        goBtn.classList.remove('is-loading');
        crawlResult.innerHTML += document.getElementById(cardName).innerHTML
      }
      else if (cardName == "event-extraction-card")  {
        // data = [name,url]
        document.getElementById("extraction-text").innerText = data
        crawlResult.innerHTML += document.getElementById(cardName).innerHTML
      }
      else if (cardName == "event-card")  {
      // data = [name,url]
      document.getElementById("event-name").innerText = data[0]
      document.getElementById("event-thumbnail").src = data[1]
      crawlResult.innerHTML += document.getElementById(cardName).innerHTML
      }
    else if (cardName == "clear-all") {
        document.getElementById("crawl-result").style.opacity=0;
        setTimeout(function () {
          crawlResult.innerHTML = ""
          document.getElementById("crawl-result").style.opacity=1;
        }, delay_ms);

      }
    else {
      console.error("No CARD named:" + cardName)
    }
    startMinimumCountDown(delay_ms)
  } else {
    //Callback when countDown is over
    cardQueue.push([cardName,data,delay_ms])
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

function startMinimumCountDown(delay_ms) {
  countingDown = true
  console.log("Countdown starting...")
  setTimeout(function () {
    countingDown = false;
    console.log("Countdown end.");

    if (cardQueue.length > 0) {
      let cardData = cardQueue.shift()
      addCard(cardData[0], cardData[1], cardData[2])
    }
  }, delay_ms);
}
