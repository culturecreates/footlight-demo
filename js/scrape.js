




function scrapeSite(url) {
  addCard('clear-all','',500)
  addCard('analyzing-card','',2000)
  fetch(url)
    .then((resp) => resp.json())
    .then(function(jsonResp) {
      crawlDebug.innerHTML += JSON.stringify(jsonResp,null,4);

      if (jsonResp.status == 200) {
        // Able to scrape site

        addCard('clear-all','',500)
        addCard('rate-site-card',jsonResp);

        fbid = jsonResp.data.my_facebook_id;
        if (fbid != "") {
          loadFacebookEvents(jsonResp.data.my_facebook_id);
        } else {
          addCard('message-card',["I can't find this site's Facebook page. I'll have to improve my algorithm :-("]);
        }
      } else {
        // NOT a valid URL so make a guess looking at Google search results
        if (jsonResp.status == 400) {
          if  (jsonResp.data.hasOwnProperty('alternatives')) {
              addCard('clear-all','',500)
              addCard("validate-site-card", jsonResp.data.alternatives)
            }
          else {
              addCard('message-card',["Please enter a valid URL."]);
          }
        }
      }
    })
    .catch(function(error) {
        addCard('message-card',["<pre>Error: " + error + "</pre>"]);
    });

}
