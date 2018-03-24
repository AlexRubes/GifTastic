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
    console.log(response);

    // Storing an array of results in the results variable
    var results = response.data;

    //Creating a div with the class "item"
    var gifDiv = $("<div class='item'>");
    
    //store rating data
    var rating = response.rating;

    // Creating an element to have the rating displayed
    var info = $("<p>").text("Rating: " + rating);
    
    //create an image tag
    var personImage = $("<img>").attr("src", results.images.fixed_height.url);
    
    //append rating and image to gifDiv
    gifDiv.append(info);
    gifDiv.append(personImage);

    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
    $("#gifs-appear-here").prepend(gifDiv);

   });
  };

 // Function for displaying character data
 function renderButtons() {

   // Deleting the characters prior to adding new characters
   // (this is necessary otherwise you will have repeat buttons)
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

 // This function handles events where a movie button is clicked
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