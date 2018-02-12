let events   // gloabl variable for adding UI Cards later in time.

function loadFacebookEvents(fbid) {
  let url = "https://culture-ie.herokuapp.com/facebook.json?fbid=" + encodeURI(fbid);
  console.log("inside loadFacebookEvents");
  fetch(url)
    .then((resp) => resp.json())
    .then(function(jsonResp) {

      crawlDebug.innerHTML += JSON.stringify(jsonResp,null,4);

      if (jsonResp.status == 500) {
        addCard('message-card',["I ran into an error. I need improvement :-("])
      } else {
        events = jsonResp.data.events;


      }
    })
    .catch(function(error) {
        addCard('message-card',["Error" + error])
    });
}

function displayEvents() {
  //check that events are loaded
  if (events != undefined) {
    if (events.length > 0) {
      // start loading images right away to cache them in the local browser
      document.body.scrollTop = 0;
      addCard('clear-all','',500)
      addCard('message-card',["Extracting events..."],3000)
      addCard('clear-all','',500)
      addCard('event-extraction-card',events.length,1000)
      addCard('event-card',[events[0].name, events[0].cover.source],1000);
      addCard('event-card',[events[1].name, events[1].cover.source],2000);
    } else {
      addCard('message-card',["I couldn't find any events."])
    }
  } else {
      document.body.scrollTop = 0;
      addCard('message-card',["Extracting events..."],3000)
      console.log("Giving more time to FB search.");
      setTimeout(function () {
        displayEvents();
      }, 3000);
  }
}
