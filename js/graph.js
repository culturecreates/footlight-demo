

const query_field = document.getElementById("query_field")
const search_button = document.getElementById("search_button")
const result_div = document.getElementById("result")

const sparql_field = document.getElementById("sparql")
const time_span = document.getElementById("time_span")

const default_query =
'PREFIX schema: <http://schema.org/> \n\
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \n\
\n\
SELECT DISTINCT ?root_name ?parent_name ?child_name where { \n\
  { \n\
      VALUES ?root_name { "CA" } \n\
      ?location a schema:Place . \n\
      ?location schema:name ?child_name_lang . \n\
      ?location schema:address/schema:addressCountry ?parent_name_raw . \n\
      ?event schema:location ?location . \n\
      ?event schema:endDate ?endDate . \n\
      ?event schema:startDate ?startDate . \n\
      bind( str(?child_name_lang ) as ?child_name) \n\
      bind (replace(?parent_name_raw, "Canada","CA","i") as ?parent_name) \n\
      FILTER ( lang(?child_name_lang) = "") \n\
  }  UNION  { \n\
       VALUES ?root_name { "CA" } \n\
      ?event a schema:Event . \n\
      ?event schema:name ?child_name_lang . \n\
      ?event schema:location ?location . \n\
      ?location schema:name ?parent_name_lang . \n\
      ?event schema:endDate ?endDate . \n\
      ?event schema:startDate ?startDate . \n\
      bind( str(?child_name_lang) as ?child_name)  \n\
      bind( str(?parent_name_lang) as ?parent_name)  \n\
  }}'


document.addEventListener('DOMContentLoaded', function () {

  sparql_field.innerHTML = default_query;
  search_button.addEventListener('click',new_exec);
  search_button_custom.addEventListener('click',exec);
  query_field.style.display = "none"
  new_exec()

})


function new_exec() {
  let today_date = new Date
  let start_time_window
  let end_time_window
  let new_query
  let selected_time_span = time_span.options[time_span.selectedIndex].value

  start_time_window = today_date.toISOString()
  if (selected_time_span == "current_year") {
    start_time_window = today_date.getFullYear(); + "-01-01"
    end_time_window = today_date.getFullYear()+1; + "-01-01"
  } else if (selected_time_span == "all") {
    start_time_window = "2000-01-01"
    end_time_window = "2050-01-01"
  } else if (selected_time_span == "3m") {
    end_time_window = new Date(today_date.setMonth(today_date.getMonth()+3)).toISOString()
  } else if (selected_time_span == "2m") {
     end_time_window = new Date(today_date.setMonth(today_date.getMonth()+2)).toISOString()
  } else if (selected_time_span == "1m") {
    end_time_window = new Date(today_date.setMonth(today_date.getMonth()+1)).toISOString()
  } else {
    alert('error in selected timespan', selected_time_span)
  }
  // slice last to curly braces and add filters
  new_query = `${default_query.slice(0,-1)} FILTER ( ?startDate > "${start_time_window}"^^xsd:dateTime  && ?startDate < "${end_time_window}"^^xsd:dateTime) \n }`
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
