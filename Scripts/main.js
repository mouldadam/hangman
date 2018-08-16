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
var countHangman
var livesLeft
var chars
var word

function Initialize(){

    // resets the visbiltu of the hangman image , letter and keyboard to hidden
    var elementArray;
    elementArray = document.getElementsByClassName("game");

    for(var i = 0; i < elementArray.length; i++)
    {
        // PERFORM STUFF ON THE ELEMENT
        elementArray[i].setAttribute("style", "visbibility:hidden");
    }   
// sets the counter variable for the hangman images and lives
countHangman = 0;
livesLeft = 8
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
    $(function(){
        //     new WOW().init();
        var wows = new WOW({
            boxClass: 'game',
            animateClass: 'animated',
            offset: 100,
            callback: function(box) {
           
            }
            });
            
        wows.init();
        });
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
// $(document).ready(function() {
//     $("#start").click(function() {
//       $(".box").toggleClass("animated");
//       document.getElementById("reasons").style.visibility = "visible"
//       console.log("jquery")
//     });
//   });




// Checks if the selected letter is correct or not 
// Updates the image and lives left and alerts if the game is over or won

function clickLetterHandler(letter) {
    // sets the animation class for the game over and win modals
    $(function(){
        //     new WOW().init();
        var wows = new WOW({
            boxClass: 'modalanimation',
            animateClass: 'animated',
            offset: 100,
            callback: function(box) {

            }
            });
            
        wows.init();
        });

    

    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    Initialize()
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        Initialize()
    }
}

    var letterFound = 0;
    // document.getElementById(letter).disabled = true
    // document.getElementById(letter).setAttribute('style', 'background-color:red')
    document.getElementById(letter).setAttribute('style', 'visibility: hidden')
    for (var i = 0; i < chars.length; i++) {
        if (chars[i] === letter) {
            document.getElementById('letter-' + i).innerHTML = chars[i].toUpperCase();
            letterFound = 1
        }
    }
    if (letterFound === 0) {
        countHangman++
        livesLeft--
        document.getElementById("livesLeft").innerHTML = livesLeft


        document.getElementById("hangmanImage").setAttribute('src', images[countHangman])
        if (countHangman === 8) {
            var lose = document.getElementById( "audiolose" );
            lose.play();
            document.getElementById("status").innerHTML = "Game Over <br> The answer is " + word
            document.getElementsByClassName("modal-content")[0].style.backgroundColor = "red";
            // setTimeout(function () { alert('Game Over! You have been Hung!'); location.reload(); }, 0.5e3)
            modal.style.display = "block";
           
        }

    }
    var index = 0
    for (var i = 0; i < chars.length; i++) {
        if (document.getElementById('letter-' + i).innerHTML === chars[i].toUpperCase()) {
            index += 1

        }
    }
    if (index === chars.length) {
        var win = document.getElementById( "audiowin" );
        win.play();
        document.getElementById("status").innerHTML = "You won! <br> You got the correct answer: " + word
        document.getElementsByClassName("modal-content")[0].style.backgroundColor = "green"
        // setTimeout(function () { alert('You suvived! You Won!'); location.reload(); }, 0.5e3)
        modal.style.display = "block";
    }
    index = 0

}







