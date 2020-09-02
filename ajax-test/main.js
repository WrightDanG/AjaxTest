var xhr = new XMLHttpRequest(); //creates a new instance
var data;

/*function setData(jsonData) {
    data = jsonData;
    console.log(data);
} // this is because we need to pull 'data' out of the xhr function. However it also has the issue of being inside a function */

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //data = this.responseText;  - now obsolete
        //setData(JSON.parse(this.responseText)); - also now obsolete
        data = JSON.parse(this.responseText); // now back due to the timeout funciton.
        //Ready state 4 means operation completed. Can check the XML docs to see the statuses. Status code 200
        //means that everything is OK. Once everything is ok, we get the DOM element 'data' and change it's html to the returned response text.
    }
};

//We can make a timeout function which only logs 'data' once it has been updated with the API calls - 500ms in this case gives time for us to get to the ready state.
//This however is quite slow adn unreliable
setTimeout(function() {
    console.log(data);
}, 500);



xhr.open("GET", "https://ci-swapi.herokuapp.com/api/"); //Retreives data from the server labelled. 
xhr.send(); //Sends the request above





//Making a callback function. A function passed as a parameter to another funciton. Moved below as it's a massive change to the data

function getData(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText)); //cb stands for callback
        }
    };
}

getData(function(data) {
    console.log(data);
});