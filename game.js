var gifArray = ["apple", "banana", "kiwi", "oranges", "watermelon", "mango"];
var limit = 10;

//renders buttons for already stored gifArray
createButton();
//function stores input to data-search and create a button
function createButton() {
    //delete prior gifs to add over gif buttons
    $("#buttons-view").empty();
    //creates new button, creates gif-button class, and add into array
    for (var i = 0; i < gifArray.length; i++) {
        var newButton = $('<button>');
        newButton.addClass("gif-button");
        newButton.attr("data-search", gifArray[i]);
        newButton.text(gifArray[i]);
        $("#buttons-view").append(newButton);
    }
    console.log(gifArray);
}

//store input into a variable and adds to array, then calls function
$(document).on("click", "#add-gif", function(event) {
    event.preventDefault();

    //stores value from entered text
    var newGif = $("#gif-input").val().trim();

    //new gif is added to array
    gifArray.push(newGif);
    createButton();
});

$(document).on("click", ".gif-button", function() {

    //create a gif
    $(".insert-gif").empty();
    //api url
    var apiKey = "dc6zaTOxFJmzC";
    var querySearch = $(this).attr("data-search");
    console.log($(this));

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + querySearch + "&limit=" + limit + "&api_key=" + apiKey;

    //calls url and makes uses response to call something
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response)
        for (var i = 0; i < limit; i++) {


            //new div for ratings
            var ratingGif = $("<div class='rating'>");
            ratingGif = $('<p>').text("Rating: " + response.data[i].rating);

            //new image for images
            var divGif = $("<img class='gif'>");
            //adds element src with paused gif
            divGif.attr("src", response.data[i].images.fixed_height_still.url);
            //adds element data-state = still
            divGif.attr("data-state", "still");
            //adds element data-still with paused gif
            divGif.attr("data-still", response.data[i].images.fixed_height_still.url)
                //adds element data-animate with moving gif
            divGif.attr("data-animate", response.data[i].images.fixed_height.url)

            $(".insert-gif").prepend(divGif);
            $(".insert-gif").prepend(ratingGif);
        }
    }).fail(function(err) {
        throw err;
    });
});

$(document).on("click", ".gif", function() {

    //when gif is paused, it can animate when clicked
    var state = $(this).attr("data-state");

    if (state === 'still') {
        //create animate equals to value in element data-animate
        var animate = $(this).attr("data-animate");

        //overwrite element src with variable animate
        $(this).attr("src", animate);

        //overwrite element data-state to animate
        $(this).attr("data-state", "animate");

    } else if (state != 'still') {
        var still = $(this).attr("data-still");

        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }
});
