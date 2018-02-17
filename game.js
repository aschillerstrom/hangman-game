/*  would like to use but not working how I thought

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

context.font = "50px Impact";
context.fillStyle = "#4b5320";
context.textAlign = "center";
context.fillText("Hangman", canvas.width/2, canvas.height/2);

context.font = "25px Ariel";
context.fillText("Press enter to start game", canvas.width/2, canvas.height/2 + 50); */


// need an array of hangman words
var gameWords =["SALOON", "COWBOY", "STIRRUP", "SADDLE", "TUMBLEWEED", "LASSO", "STAGECOACH", "MAVERICK", "CHUCKWAGON", "BARREL", "HARMONICA","STAMPEDE", "CACTUS"]
const maxTries = 6;
var lettersGuessed = [];
var wordInPlayIndex;
var wordInPlay = [];
var triesLeft = 0;
var finished = false;
var wins = 0;


/*setup game*/
function gameSetup(){
    triesLeft = maxTries;
    wordInPlayIndex = Math.floor(Math.random()*(gameWords.length));

    lettersGuessed = [];
    wordInPlay = [];


    document.getElementById("hangmanimage").src = "";

    //get word and put in dashes
    for (var i = 0; i < gameWords[wordInPlayIndex].length; i++){
        wordInPlay.push(" _ ");
    }

    // hide win, lose and try again

    document.getElementById("hitKeyForAnotherTry").style.cssText= "display: none";
    document.getElementById("you-lose").style.cssText = "display: none";
    document.getElementById("winner").style.cssText = "display: none";


    
    updateGameScreen();
};

//update how the game looks to the user

function updateGameScreen() {
    document.getElementById("totalWins").innerText = wins;
    var wordInPlayCharacters = "";
    for (var i = 0; i<wordInPlay.length; i++) {
        wordInPlayCharacters += wordInPlay[i];
    }

    document.getElementById("wordInPlay").innerText = wordInPlayCharacters;
    document.getElementById("triesLeft").innerText = triesLeft;
    document. getElementById("lettersGuessed").innerText = lettersGuessed;
};
    //update hangman image
function updateHangmanImage() {
    document.getElementById("hangmanstartimage").style.cssText = "display: none";
    document.getElementById("hangmanimage").src = "assets/images/" + (maxTries - triesLeft) +".png";

};   

// replace dashes with guessed letters

function replaceDash(letter) {
    var letterPosition = [];

    for(var i = 0; i< gameWords[wordInPlayIndex].length; i++ ){
        if (gameWords[wordInPlayIndex][i] === letter){
            letterPosition.push(i);
        }
    }

    if (letterPosition.length <=0) {
        triesLeft--;
        updateHangmanImage();
    } else {
        for (var i = 0; i < letterPosition.length; i++) {
            wordInPlay[letterPosition[i]] = letter;
        }
    }
}
   
    function isItAWin () {
        if (wordInPlay.indexOf(" _ ") === -1) {
            document.getElementById("winner").style.cssText = "display: block";
            document.getElementById("hitKeyForAnotherTry").style.cssText="display:block";
            wins++;
            finished = true;
        }
    };

    function isItALoss (){
        if (triesLeft<=0) {
            document.getElementById("you-lose").style.cssText = "display.block";
            document.getElementById("hitKeyForAnotherTry").style.cssText="display:block";
            finished = true;

            
        }
    
    }

    function guessALetter (letter) {
        if (triesLeft>0) {
            if (lettersGuessed.indexOf(letter) === -1) {
                lettersGuessed.push(letter);
                replaceDash(letter);
            }
        }
    }



document.onkeydown = function(event) {
    if (finished){
        gameSetup();
        finished = false;
        } 
    else {
        if (event.keyCode >=65 && event.keyCode <=90) {
            guessALetter(event.key.toUpperCase());
            updateGameScreen()
            isItAWin();
            isItALoss();
            }
        }
};



/* create boolean variable to start game */


/* loop to start the game, the user needs to hit any key*/


/* game starts.  word from gameWords is chosen at random by computer.  A corresponding dashes need to appear - one per character in the string. 
the hangman stand image needs to appear */



/* Start of a loop.
the user will input a letter.  Letter needs to become uppercase.  if letter is in word, it needs to go to appropriate space.  
else if letter is not in word, new image needs to appear with body part
For all letters chosen, letter appears in Letters Already Selected row.
Loop ends with winner or hanged man.
if winner, tally wins.
*/

/*end loop by going back to hit a key to play*/