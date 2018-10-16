$(document).ready(function() {
  //initialize array and initial buttons
  var cartoons = ["Spongebob", "Flintstones", "Yugioh!","Popeye","Powerpuff Girls","Simpsons","Futurama", "Pokemon", "Winnie the Pooh"];
  var userInput = "";
 

  //define function to make the buttons
  var makeButtons = function() {
      $("#buttons").empty();
    for (var i = 0; i < cartoons.length; i++) {
      var newButton = $("<button></button>");
      $(newButton).text(cartoons[i]);
      $(newButton).addClass("btn btn-primary btn-links");
      $(newButton).attr("data-name", cartoons[i]);
      $("#buttons").append(newButton);
    }
  };


  makeButtons();
  //on click of submit button to add a button
  $("#submit").on("click", function(event) {
    event.preventDefault();
    userInput = $("#userInput")
      .val()
      .trim();

    cartoons.push(userInput);

    makeButtons();

    $("#userInput").val("");
  });

  //when a button is clicked
  $(document).on("click", ".btn-links", function() {
    var user = $(this).attr("data-name");
    var queryURL ="https://api.giphy.com/v1/gifs/search?q="+user+"&api_key=q4LNHX8YU5TZBRL8LMDV1io0IlyNJhdQ&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
        for (var i=0; i<10; i++){
          var gif = $("<img>");
          var text = $("<p></p>");
          $(text).text("Rating: "+response.data[i].rating);
          $(gif).addClass("gif");
          $(gif).attr("src", response.data[i].images.original.url);
          $(gif).attr("data-state", "animate");
          $(gif).attr("data-animate",  response.data[i].images.original.url);
          $(gif).attr("data-still",  response.data[i].images.original_still.url);
          
          $("#gifs").prepend(gif);
          $("#gifs").prepend(text);        
        }




    });


  });
  $(document).on("click",".gif",function(){
    var state = $(this).attr("data-state");
   
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  })

});
