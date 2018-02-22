


document.addEventListener('DOMContentLoaded', function () {


  const query_field = document.getElementById("query_field")
  const search_button = document.getElementById("search_button")
  const result_div = document.getElementById("result")

  search_button.addEventListener('click',exec);


  query_field.style.display = "none"
  exec()

})


function todayEpoch() {
  new Date.now.getTime() / 1000
}

function exec() {
  /* Uncomment to see debug information in console */
  d3sparql.debug = true




  search_button.classList.add("is-loading")

  var endpoint = d3.select("#endpoint").property("value")
  var sparql = d3.select("#sparql").property("value")
  d3sparql.query(endpoint, sparql, render)

}

function render(json) {
  /* set options and call the d3spraql.xxxxx function in this library ... */
  var config = {
    // for d3sparql.tree()
     "root": "root_name",
     "parent": "parent_name",
     "child": "child_name",
     // for d3sparql.roundtree()
     "diameter": 800,
     "angle": 360,
     "depth": 200,
     "radius": 5,
     "selector": "#result"
  }
  d3sparql.roundtree(json, config)
}



function toggleQueryDisplay() {
  if (query_field.style.display != "none") {
    query_field.style.display = "none"
  } else {
    query_field.style.display = "block"
  }
}

function subscribeNewsletter() {
  let mailchimpUrl = "http://culturecreates.us16.list-manage.com/subscribe?u=38332ba701679033a5138d048&id=60036a359b&MERGE0="
  //get the email and add it
  let userEmail = document.getElementById('user_email').value
  //call the hosted MailChimp form
  window.open(mailchimpUrl + userEmail)

}
