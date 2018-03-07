// array to hold the animals which will be searched for

var animals = ["Cat", "Dog", "Hamster", "Penguin", "Owl", "Capybara", "Panda", "Otter", "Fox", "Goat", "Cow", "Octopus", "Dolphin", "Crow", "Elephant"];

// Create ajax request to giphy
function displayGIF() {
  var animal = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=lTJj9ZkaK1SV3zfcpyVEhc9Okz6T5pxC"

  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
	
    // Emptying out previous images 
	$("#image-view").empty();

	// Creating a loop to go through the response and create an img tag with each URL
	
	for (var j = 0; j < response.data.length; j++){
	    var stillURL = response.data[j].images.fixed_height_still.url;
	    var animatedURL = response.data[j].images.fixed_height.url;

	// Setting the "still" version of the image first
		
		$("#image-view").append("<img src=" + stillURL + " data-still=" + stillURL + " data-animated=" + 
			animatedURL +">")
		}
	});
  }	

// funcation to create the initial buttons at the top of the document
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

// function to be trigged when adding a button, adds user text to Animals array and reloads buttons

$("#add-image").on("click", function(event) {
	event.preventDefault();
	var animal = $("#image-input").val().trim();
	animals.push(animal);
	displayButtons();
});

displayButtons();
$(document).on("click", ".animal-btn", displayGIF);
$("#image-view").on("click", "img", function() {
	var animatedURL = $(this).attr("data-animated");
	var stillURL = $(this).attr("data-still");
	if ($(this).attr("data-still") === $(this).attr("src"))
		$(this).attr("src", animatedURL);
	else $(this).attr("src", stillURL);

	});




