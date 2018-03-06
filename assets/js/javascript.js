// array to hold the animals which will be searched for

var animals = ["Cat", "Dog", "Hamster", "Penguin", "Owl", "Capybara", "Panda", "Otter", "Fox", "Goat", "Cow", "Octopus", "Dolphin", "Crow", "Elephant"];

// Create ajax request to giphy
function displayGIF() {
  // Giphy API Key = "lTJj9ZkaK1SV3zfcpyVEhc9Okz6T5pxC"
  var animal = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=lTJj9ZkaK1SV3zfcpyVEhc9Okz6T5pxC"

  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
	//Creating a loop to go through the response and create an img tag with each URL
	
	for (var j = 0; j < response.data.length; j++){
	    var imageURL = response.data[j].images.fixed_height.url;
	    console.log(imageURL);
	    console.log(j);
		$("#image-view").append("<img src=" + imageURL + ">")
		}
    });
  }	

// funcation to create the initial buttons at the top of the document
// TODO: make buttons actually work
// TODO: make certain that buttons load with the document

function displayButtons() {
	$("#buttons-view").empty();
	for (var i = 0; i < animals.length; i++) {
	var a = $("<button>");
	a.addClass("animal-btn");
	a.attr("data-name", animals[i]);
	a.text(animals[i]);	
	$("#buttons-view").append(a);
	};
}

// function to trigged when adding a button, adds user text to Animals array and reloads buttons

$("#add-image").on("click", function(event) {
	event.preventDefault();
	var animal = $("#image-input").val().trim();
	animals.push(animal);
	displayButtons();
});

displayButtons();
$(document).on("click", ".animal-btn", displayGIF);




