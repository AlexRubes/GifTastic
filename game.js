 // Initial array of characters
 var character = ["Homer Simpson", "Mr. Burns", "Chief Wiggum", "Krusty the Clown"];

 // displayMovieInfo function re-renders the HTML to display the appropriate content
 function displaySimpsInfo() {


   var cartoon = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
   cartoon + "&api_key=v78FeC4bOhr1mqERs819kD0x7A3Nzx5w"

   // Creating an AJAX call for the specific movie button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {

    $("#gifs-appear-here").empty();
    
    console.log(response);

    // Storing an array of results in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var gifDiv = $("<div>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var gifImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      gifImage.attr("src", results[i].images.fixed_height.url);

      // Appending the paragraph and image tag to the animalDiv
      gifDiv.append(p);
      gifDiv.append(gifImage);

      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").append(gifDiv);
    }

   });
  };

 // Function for displaying character data
 function renderButtons() {

   // Deleting the characters prior to adding new characters (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();

   // Looping through the array of characters
   for (var i = 0; i < character.length; i++) {

     // Then dynamicaly generating buttons for each character in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var a = $("<button>");
     // Adding a class of movie-btn to our button
     a.addClass("cartoon-btn");
     // Adding a data-attribute
     a.attr("data-name", character[i]);
     // Providing the initial button text
     a.text(character[i]);
     // Adding the button to the buttons-view div
     $("#buttons-view").append(a);
   }
 };

 // this event adds a character button
 $("#add-character").on("click", function(event) {
   event.preventDefault();
   // This line grabs the input from the textbox
   var cartoon = $("#gifs-input").val().trim();

   // Adding movie from the textbox to our array
   character.push(cartoon);

   // Calling renderButtons which handles the processing of our character array
   renderButtons(); 
 });

 // Adding a click event listener to all elements with a class of "cartoon-btn"
 $(document).on("click", ".cartoon-btn", displaySimpsInfo);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();
