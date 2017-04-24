var gifArray = ["apple", "banana", "kiwi", "oranges", "watermelon", "mango", "coconut", "passion fruit"];
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

    //empty all the gifs inthe div
    $(".insert-gif").empty();
    //api url
    var apiKey = "dc6zaTOxFJmzC";
    var querySearch = $(this).attr("data-search");
    console.log($(this));

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + querySearch + "&limit=" + limit + "&api_key=" + apiKey;

    //calls url and makes uses response to call something
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response)
        for (var i = 0; i < limit; i++) {

            //new div for ratings
            var rating =$('<p>').text("Rating: " + response.data[i].rating);


            //new image for images
            var gif = $("<img class='gif'>");
            //adds element src with paused gif
            gif.attr("src", response.data[i].images.fixed_height_still.url);
            //adds element data-state = still
            gif.attr("data-state", "still");
            //adds element data-still with paused gif
            gif.attr("data-still", response.data[i].images.fixed_height_still.url)
                //adds element data-animate with moving gif
            gif.attr("data-animate", response.data[i].images.fixed_height.url)

            $(".insert-gif").prepend(gif);
            $(".insert-gif").prepend(rating);

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
