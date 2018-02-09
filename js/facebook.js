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
        let events = jsonResp.data.events;
        console.log(events);
        if (events.length > 0) {
          // start loading images right away to cache them in the local browser
          
          addCard('event-card',[events[0].name, events[0].cover.source],0);
          addCard('event-card',[events[1].name, events[1].cover.source],5000);
        } else {
          addCard('message-card',["I couldn't find any Facebook events."])
        }
      }
    })
    .catch(function(error) {
        addCard('message-card',["Error" + error])
    });
}
