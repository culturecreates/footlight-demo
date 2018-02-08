function scrapeSite(url) {

  fetch(url)
    .then((resp) => resp.json())
    .then(function(jsonResp) {

    //  crawlResult.innerHTML = "";
      crawlDebug.innerHTML = "";

      crawlDebug.innerHTML += JSON.stringify(jsonResp,null,4);

      if (jsonResp.status == 200) {

        addCard('quote-bot-1');
        title = jsonResp.data.og_title || jsonResp.data.page_title;
        description = jsonResp.data.og_description || jsonResp.data.page_description;

        addCard('rate-site-card',[title, description]);
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

          if  (jsonResp.data.hasOwnProperty('alternatives')) {
             let altUrl =  jsonResp.data.alternatives[0][1]
                addCard("validate-site-card", altUrl)
            //  crawlResult.innerHTML += "<h5>Is this the site?</h5> <p>" + altUrl   + "</p> <button onclick='scrapeSite(\"" + compose_scraper_url(altUrl) + "\")' class='button is-large'> Yes</button>"
          }
          else {
              crawlResult.innerHTML += preNote + "<p>Please enter a valid URL</p>" + postNote;
          }

          // if  (jsonResp.data.hasOwnProperty('alternatives')) {
          //   crawlResult.innerHTML += "<ul>";
          //   for (var i = 0; i < 3; i++) {
          //     crawlResult.innerHTML += "<li><a style='cursor:pointer;' onclick='loadUrl(\"" + jsonResp.data.alternatives[i][1] + "\");'>" + jsonResp.data.alternatives[i][0] + "</a></li>";
          //   }
          //   crawlResult.innerHTML += "</ul>";

          }
        }
      goBtn.classList.remove('is-loading');


    })
    .catch(function(error) {
        crawlResult.HTML = "<pre>Error: " + error + "</pre>";
    });

}
