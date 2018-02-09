

function compose_scraper_url(siteUrl) {
  return  "https://culture-ie.herokuapp.com/basic_scraper.json?site=" + encodeURI(siteUrl);
}
