// import the data from data.js
const tableData = data;
// Reference the HTML table using d3 <--JavaScript library for interactive graphics on HTML page
var tbody = d3.select("tbody");

function buildTable(data) {
    // clear out any existing data
    tbody.html("");
  
    // loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        //Add each value from the object into a cell
        cell.text(val);
      });
    });
};

// variable to keep track of all the filters
var filters = {};

// handle click for each filter
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  // Use d3 to select specific tag from filter and get the value from that tag
  // assign selection to filters array
    //---Date Filter---check if a date was entered  
    let date = d3.select("#datetime").property("value");
    if (date) {
        filters.datetime = datetime.value}
    else {
        // Delete a key-value pair
        delete filters.datetime;
     };
    //---City Filter ---check if a city was entered
    let city = d3.select("#city").property("value");
    if (city) {
        filters.city = city}
    else {
        delete filters.city;
    };
    //---State Filter ---
    let state = d3.select("#state").property("value");
    if (state) {
        filters.state = state}
    else {
        delete filters.state;
    };
    //---Country Filter ---
    let country = d3.select("#country").property("value");
    if (country) {
        filters.country = country}
    else {
        delete filters.country;
    };
    //---Shape Filter ---
    let shape = d3.select("#shape").property("value");
    if (shape) {
        filters.shape = shape}
    else {
        delete filters.shape;
    };

  filterTable();
}; 

function filterTable() {

    // Set the filteredData to the tableData
    let filteredData = tableData
    // Loop through all of the filters and keep any data that
    // matches the filter values
    // Object.keys(user) = ["name", "age"]
    // Object.values(user) = ["John", 30]
    // Object.entries(user) = [ ["name","John"], ["age",30] ]
    //     before: filteredData = filteredData.filter(row => row.datetime === date);
    //     after:  filteredData = filteredData.filter(row => row[key] === value);
    // Object.entries(weatherReport).forEach(function([key, value]) {...}
    //     
    // for each [key,value] pair in filters object.entries, use method filter to 
    // return only rows where the object.key is equal to object.value 
    // for example, "name" === "John"
    Object.entries(filters).forEach(function([key, value]) {
        filteredData = filteredData.filter(row => row[key] === value);
    });
  
  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
};

//  Listen for button click
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);