const wordList = [
    { 
        title: "Actors",
        words: [
            {
                name: "Robert De Niro",
                hint: "Robert",
                chosen: false
            },
            {
                name: "Denzel Washington",
                hint: "Denzel",
                chosen: false
            },
            {
                name: "Betty White",
                hint: "Betty",
                chosen: false
            },
            {
                name: "Scarlett Johansson",
                hint: "Scarlett",
                chosen: false
            },
        ]
    },
    {
        title: "Movies",
        words: [
            {
                name: "The Godfather",
                hint: "Godfather",
                chosen: false
            },
            {
                name: "Citizen Kane",
                hint: "Cit Kane",
                chosen: false
            },
            {
                name: "The Wizard of Oz",
                hint: "Not in Kansas anymore",
                chosen: false
            },
            {
                name: "The Silence of the Lambs",
                hint: "Be quite lambs",
                chosen: false
            },
            {
                name: "Gladiator",
                hint: "Gladiator",
                chosen: false
            }
        ]
    },
    {
        title: "Animals",
        words: [
            { 
                name: "Red Panda",
                hint: "Cute fluffy mammal",
                chosen: false
            },
            {
                name: "Axolotl",
                hint: "aka Mexican walking fish",
                chosen: false
            },
            {
                name: "Brown Bear",
                hint: "Bear",
                chosen: false
            },
            {
                name: "Panther",
                hint: "Black Cat",
                chosen: false
            },
            {
                name: "Baboon",
                hint: "Has a red butt",
                chosen: false
            },
            {
                name: "Condor",
                hint: "Largest bird",
                chosen: false
            }
        ]
    },
    {
        title: "NFL Teams",
        words: [
            {
                name: "Seattle Seahawks",
                hint: "seattle seahawks",
                chosen: false
            },
            {
                name: "Chicago Bears",
                hint: "Chicago bears",
                chosen: false
            },
            {
                name: "Kansas City Chiefs",
                hint: "Chiefs",
                chosen: false
            },
            {
                name: "Buffalo Bills",
                hint: "Buffalo Bills",
                chosen: false
            },
            {
                name: "Jacksonville Jaguars",
                hint: "Jacksonville Jaguars",
                chosen: false
            }
        ]
    }
];

let category = "",
    guessingWord = "",
    hint = "",
    guesses = 10,
    removedCategoryButtons = [];

const canvas = document.getElementById("hangman-image"),
      ctx    = canvas.getContext('2d');
      ctx.strokeStyle = 'black',
      ctx.lineWidth = 2;

const randomWordSelector = (categoryName) => {
    wordList.forEach( (el) => {
        if (el.title === categoryName) {
            if (!isAllWordsChosen(el.words)) {
                index = getRandomInt(el.words.length);
                while (el.words[index].chosen){
                    index = getRandomInt(el.words.length);
                }
                word = el.words[index].name;
                hint = el.words[index].hint;
                el.words[index].chosen = true;
            } else {
                word = undefined;
            }
        }
    }); 
    return word;
}

const isAllWordsChosen = (arr) => {
    const isChosenTrue = (el) => {
        if(el.chosen === true) return true;
        return false;
    }
    return arr.every(isChosenTrue);
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

function focusSelectedCategory() {
    let categoryButtons = $(".categories > div");

    categoryButtons.each(function(){
        if(this.children[0].textContent != category){
            $(this).fadeOut("fast");
        } 
    });
    $(".category-header > div > h6").text("Category:");
}

function removeSelectedCategory() {
    let categoryButtons = $(".categories > div");

    categoryButtons.each(function(){
        if(this.children[0].textContent === category){
            $(this).remove();
        } 
    });
}

function resetCategorySelector() {
    $(".category-header > div > h6").text("Pick a Category:");
    $(".categories > div").fadeIn("fast");
}

const displayEmptyUnderscore = () => {
        const maxLineLength = 12;
        if(guessingWord.length > maxLineLength) {
            let spliceIndex = guessingWord.lastIndexOf(" ", maxLineLength),
                lineOneWord = guessingWord.slice(0, spliceIndex),
                lineTwoWord = guessingWord.slice(spliceIndex + 1);
            
            insertEmptyUnderscore(lineOneWord, "line-one");
            insertEmptyUnderscore(lineTwoWord, "line-two");
        } else {
            insertEmptyUnderscore(guessingWord, "line-one");
        }
}

const displayInputArea = () => {
    $(".input-area").fadeIn(400, "swing");
}

function insertEmptyUnderscore(str, line){
    $(".underscore-display").append("<div id=" + line + " class='row justify-content-center text-center'></div>");
    for (let i = 0; i < str.length; i++){
        if(str.charAt(i) !== " "){
            $(".underscore-display > #" + line).append("<div data-letter='" + str.charAt(i) + "' class='col underscore'></div>");
        } else {
            $(".underscore-display > #" + line).append("<div data-letter='space' class='col space'></div>");
        }
    }
}

const isGuessLetterCorrect = (letter) => {
    const upperCaseWord = guessingWord.toUpperCase();
    if(upperCaseWord.includes(letter))  return true ;
    return false;
}

function displayGuessedLetter(letter) {
    let display = $(".underscore-display > div > div");
    
    display.each(function(){
        if(this.dataset.letter.toUpperCase() === letter) {
            this.textContent = this.dataset.letter;
        }
    });
}

function gameOver() {
    const resetButton = $(".input-area > div > #play-again").clone();

    $("#game-over").fadeIn("fast");
    $("#game-over > div > .correct-word").append("<div class='col'>The word was: " + guessingWord + "</div");
    $("#game-over > div >.play-again").append(resetButton);

    $(".reset").click(function(){
        resetGame();
    });

}

function gameWon() {
    alert("Game Won");
}

function resetGame() {
    let inputButtons = $(".input-area > div > div > button");
    // Reset Global Variables
    category = "",
    guessingWord = "",
    hint = "",
    guesses = 10;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    $(".input-area").hide();
    $(".underscore-display").empty();
    $(".hint-display").remove();
    resetCategorySelector();

    inputButtons.each( function() {
        $(this).removeClass("guessed-letter");
    });

    $("#game-over").fadeOut("fast");
    $("#game-over > div > .correct-word").empty();
    $("#game-over > div >.play-again").empty();
}

const isGameWon = () => {
    let display = $(".underscore-display > div > div"),
        word    = [];

    const isWordComplete = (currentVal) => {
        return currentVal != "";
    }

    display.each(function(){
        if(this.dataset.letter != "space"){
            word.push(this.textContent);
        }
    });
    if(word.every(isWordComplete)){
        return true;
    } else {
        return false;
    }
}

function drawHangman() {
    if(guesses === 9){
        drawBaseGallow();
    } else if(guesses === 8){
        drawVerticalGallow();
    } else if(guesses === 7){
        drawHorizontalGallow();
    } else if(guesses === 6){
        drawNoose();
    } else if(guesses === 5){
        drawHead();
    } else if(guesses === 4){
        drawBody();
    } else if(guesses === 3){
        drawLeg("left");
    } else if(guesses === 2){
        drawLeg("right");
    } else if(guesses === 1){
        drawArm("left");
    } else if(guesses === 0){
        drawArm("right");
    }
}

function drawBaseGallow() {
    // Base of Gallow
    ctx.beginPath();
    ctx.moveTo(25, 148);
    ctx.lineTo(100, 148);
    ctx.stroke();
}

function drawVerticalGallow(){
    // Vertical line
    ctx.beginPath();
    ctx.moveTo(50,148);
    ctx.lineTo(50,2);
    ctx.stroke();

    // Gallow Angle Brace Bottom
    ctx.beginPath();
    ctx.moveTo(75, 148);
    ctx.lineTo(50, 123);
    ctx.stroke();
}

function drawHorizontalGallow() {
    // Gallow Horizontal
    ctx.beginPath();
    ctx.moveTo(50,2);
    ctx.lineTo(150,2);
    ctx.stroke();
    // Gallow Angle Brace Top
    ctx.beginPath();
    ctx.moveTo(75, 2);
    ctx.lineTo(50, 27);
    ctx.stroke();
}

function drawNoose() {
    ctx.beginPath();
    ctx.moveTo(150,2);
    ctx.lineTo(150, 30);
    ctx.stroke();
}

function drawHead() {
    ctx.beginPath();
    ctx.arc(150, 40, 10, 0, Math.PI * 2);
    ctx.stroke();
}

function drawBody() {
    ctx.beginPath();
    ctx.moveTo(150, 50);
    ctx.lineTo(150, 80);
    ctx.stroke();
}

function drawLeg(side) {
    if(side === "left") {
        x = 135;
    } else if(side === "right"){
        x = 165;
    }
    ctx.beginPath();
    ctx.moveTo(150, 80);
    ctx.lineTo(x,95);
    ctx.stroke();
}

function drawArm(side) {
    if(side === "left") {
        x = 135;
    } else if(side === "right"){
        x = 165;
    }
    ctx.beginPath();
    ctx.moveTo(150, 55);
    ctx.lineTo(x,70);
    ctx.stroke();
}

$(document).ready( function() {
    // Add event listeners here
    // Input Button
    $(".letter-input > .col > button").click(function() {
        let guessLetter = $(this).text();
        
        if (isGuessLetterCorrect(guessLetter)) {
            $(this).addClass("guessed-letter");
            displayGuessedLetter(guessLetter);
            if(isGameWon()) {
                gameWon();
            }
        } else if (guesses === 1){
            guesses--;
            drawHangman();
            gameOver();
        } else {
            guesses--; 
            drawHangman();
            $(this).addClass("guessed-letter")
        }
    });

    // Categories Button
    $(".categories > div > button").click(function() {
        if(category === ""){
            category = $(this).text();
            guessingWord = randomWordSelector(category);
            if(guessingWord === undefined){
                removeSelectedCategory();
                category = "",
                guessingWord = "";
                alert("Please pick a different category");
            } else {
                focusSelectedCategory();
                displayEmptyUnderscore();
                displayInputArea();
                console.log(guessingWord);
            }
            
        }
        
    });

    // Hint Button
    $("#hint").click(function(){
        if($(".hint-display").length === 0){
            $(".input-area").before("<div class='row justify-content-center text-center hint-display'><div class='col'>Hint: " + hint + "</div>");
        }
    });

    // Play Again Button
    $(".reset").on("click", function(){
        resetGame();
    });
});

