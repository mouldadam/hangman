/* Created by Adam Mould , hangman game where users guesses a word 
by selecting letters
*/

// setting the paths to the hangman images in the array images
var images = [
    './Images/Empty.png',
    './Images/Pole.png',
    './Images/Beam.png',
    './Images/Head.png',
    './Images/Torso.png',
    './Images/RightLeg.png',
    './Images/LeftLeg.png',
    './Images/RightArm.png',
    './Images/LeftArm.png',
];
// Declaring global variables
//  number that counts turns taken and number for image of current hangman
var countHangman
// number for how many lives are left
var livesLeft
// array of letters that form the hidden word
var chars
// the hiddent or secret word users have to guess
var word
//  number of correct charactes selected¬`
var numcorrectletters

function Initialize() {
    // Resets all HTML elements and variables

    // resets the visbiltu of the hangman image , letter and keyboard to hidden
        var elementArray;
        elementArray = document.getElementsByClassName("game");

        for (var i = 0; i < elementArray.length; i++) {
            elementArray[i].setAttribute("style", "visbibility:hidden");
        }
    // sets the counter variable for the hangman images and lives
        countHangman = 0;
        livesLeft = 8
         // resets number of correct letts to 0
    numcorrectletters = 0;

    // Resets the game HTML elements
        document.getElementById("labelLiveLeft").innerHTML = ""
        document.getElementById("livesLeft").innerHTML = ""
        // Removes the hidden letter elements of the previous game
        var element = document.getElementById("letters");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

    // removing the keyboard letter elements
        var element2 = document.getElementById("keyboard1");
        while (element2.firstChild) {
            element2.removeChild(element2.firstChild);
        }
        var element3 = document.getElementById("keyboard2");
        while (element3.firstChild) {
            element3.removeChild(element3.firstChild);
        }
        document.getElementById("hangmanImage").setAttribute('src', "");
    }

// Starting the game by clicking the New Game Button
var eventListenerStart = document.getElementById("start").addEventListener("click", Start)

function Start() {
    Initialize()
    $(function () {
        //    initilaize WOW.JS plugin for animation of elements
        var wows = new WOW({
            boxClass: 'game',
            animateClass: 'animated',
            offset: 100,
            callback: function (box) {

            }
        });

        wows.init();
    });

    // set the starting lives
    livesLeft = 8
    document.getElementById("labelLiveLeft").innerHTML = "Lives Left: "
    document.getElementById("livesLeft").innerHTML = livesLeft

    // setting the hangman image to the initial image
    document.getElementById("hangmanImage").setAttribute('src', images[0]);

    // Selects a word from the selected category
    var selctedCategory = document.getElementById("categories").value

    switch (selctedCategory) {
        case "animals": words = animalWords;
            break;
        case "footballTeams": words = footballTeamWords;
            break;
        case "capitalCities": words = capitalCites;
            break;
    }
    // choosing a random word from the the selected category
    word = words[Math.floor(Math.random() * words.length)].toLowerCase();

    // Creating an array of letters of the chosen word
    chars = word.split("")

    // creating span elements for each character of the word and setting it to readonly
    for (var i = 0; i < word.length; i++) {
        var x = document.createElement('span');
        document.getElementById("letters").appendChild(x);
        x.setAttribute('id', 'letter-' + i)
    }
    // Creating the keyboard letter elements
    // cylces from a to n creating and displaying the letter
    for (var i = 'a'.charCodeAt(0); i < 'n'.charCodeAt(0); i++) {
        var letter1 = String.fromCharCode(i);
        var button1 = document.createElement('span');
        button1.innerHTML = letter1.toUpperCase();
        button1.setAttribute('id', letter1);
        button1.onclick = function (event) {
            var letter = event.target.getAttribute('id');
            clickLetterHandler(letter);
        }
        document.getElementById("keyboard1").appendChild(button1)
    }
    // cylces from o to z creating and displaying the letter
    for (var i = 'n'.charCodeAt(0); i < 'z'.charCodeAt(0) + 1; i++) {
        var letter2 = String.fromCharCode(i);
        var button2 = document.createElement('span');
        button2.innerHTML = letter2.toUpperCase();
        button2.setAttribute('id', letter2);
        button2.onclick = function (event) {
            var letter = event.target.getAttribute('id');
            clickLetterHandler(letter);
        }
        document.getElementById("keyboard2").appendChild(button2);
    }
}



// Checks if the selected letter is correct or not 
// Updates the image and lives left and alerts if the game is over or won

function clickLetterHandler(letter) {
    // sets the animation class for the game over and win modals
    $(function () {
        //    initializez WOW.JS for animation on elements
        var wows = new WOW({
            boxClass: 'modalanimation',
            animateClass: 'animated',
            offset: 100,
            callback: function (box) {

            }
        });

        wows.init();
    });

    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        Initialize()
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            Initialize()
        }
    }

    var letterFound = 0;
   
    //  hides the selcted letter that was guessed
    document.getElementById(letter).setAttribute('style', 'visibility: hidden')

    // if selected a letter in the hidden word display it and checks if letter is found and counts the number of correct letters
    for (var i = 0; i < chars.length; i++) {
        if (chars[i] === letter) {
            document.getElementById('letter-' + i).innerHTML = chars[i].toUpperCase();
            letterFound = 1
            numcorrectletters += 1
        }
    }

    // if the selected letter is not found in the secret word  decrease lives left and show next image
    if (letterFound === 0) {
        countHangman++
        livesLeft--
        document.getElementById("livesLeft").innerHTML = livesLeft


        document.getElementById("hangmanImage").setAttribute('src', images[countHangman])

        // if livesleft = 0 or counthangman = 8 then display game over modal
        if (countHangman === 8) {
            var lose = document.getElementById("audiolose");
            lose.play();
            document.getElementById("status").innerHTML = "Game Over <br> The answer is " + word
            document.getElementsByClassName("modal-content")[0].style.backgroundColor = "red";
            // setTimeout(function () { alert('Game Over! You have been Hung!'); location.reload(); }, 0.5e3)
            modal.style.display = "block";
        }
    }
  console.log(numcorrectletters)
  console.log(chars.length)
    if (numcorrectletters === chars.length) {
        var win = document.getElementById("audiowin");
        win.play();
        document.getElementById("status").innerHTML = "You won! <br> You got the correct answer: " + word
        document.getElementsByClassName("modal-content")[0].style.backgroundColor = "green"
        // setTimeout(function () { alert('You suvived! You Won!'); location.reload(); }, 0.5e3)
        modal.style.display = "block";
    }
}







