

const query_field = document.getElementById("query_field")
const search_button = document.getElementById("search_button")
const result_div = document.getElementById("result")

const sparql_field = document.getElementById("sparql")
const time_span = document.getElementById("time_span")

const default_query =
'PREFIX schema: <http://schema.org/> \n\
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \n\
\n\
SELECT ?root_name ?parent_name ?child_name where { \n\
  { \n\
      VALUES ?root_name { "Montreal" } \n\
      ?place a schema:Place . \n\
      ?place schema:name ?child_name . \n\
      ?place schema:city ?parent_name . \n\
  }  UNION  { \n\
       VALUES ?root_name { "Montreal" } \n\
      ?event a schema:Event . \n\
      ?event schema:name ?child_name . \n\
      ?event schema:location ?location . \n\
      ?location schema:name ?parent_name . \n\
      ?event schema:endDate ?endDate . \n\
      ?event schema:startDate ?startDate . \n\
  }}'


document.addEventListener('DOMContentLoaded', function () {

  sparql_field.innerHTML = default_query;
  search_button.addEventListener('click',new_exec);
  search_button_custom.addEventListener('click',exec);
  query_field.style.display = "none"
  exec()

})


function new_exec() {
  let today_date = new Date
  let start_time_window = parseInt(today_date.getTime() / 1000)
  let end_time_window
  let new_query
  let selected_time_span = time_span.options[time_span.selectedIndex].value
  if (selected_time_span == "year") {
    start_time_window = 0
    end_time_window = 1600000000
  } else if (selected_time_span == "6m") {
    end_time_window = parseInt(new Date(today_date.setMonth(today_date.getMonth() + 6)).getTime() / 1000)
  } else if (selected_time_span == "1m") {
    end_time_window = parseInt(new Date(today_date.setMonth(today_date.getMonth() + 1)).getTime() / 1000)
  } else {
    alert('error in selected timespan', selected_time_span)
  }
  // slice last to curly braces and add filters
  new_query = default_query.slice(0,-2) + "FILTER(xsd:integer(?endDate) >= " + start_time_window + " && xsd:integer(?startDate) <= " + end_time_window + ") \n }}"
  sparql_field.innerHTML = new_query
  exec()
}

function exec() {
  /* Uncomment to see debug information in console */
  d3sparql.debug = false

//  search_button.classList.add("is-loading")
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
     "diameter": 900,
     "angle": 370,
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
