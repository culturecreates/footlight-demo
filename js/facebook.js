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
