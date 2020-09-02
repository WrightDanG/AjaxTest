const baseURL = "https://ci-swapi.herokuapp.com/api/"

function getData(type, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseURL + type + '/');
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText)); //cb stands for callback
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";
   
    getData(type, function(data) {
        console.dir(data); // Using this we can see in the console how the data is laid out - a results Array.
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);
        
        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15); //takes only the first 15 characters to clean up the presentation.
                dataRow.push(`<td>${truncatedData}</td>`)
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
            //el.innerHTML += "<p>" + item.name + "</p>";
        });
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}


/* we previously attempted to iterate over the keys however it was not specific enough:
Object.keys(item).forEach(function(key) {
                console.log(key);
            }); 

*/