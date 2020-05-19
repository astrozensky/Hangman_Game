const wordList = [
    { 
        title: "Actors",
        words: [
            {
                name: "Robert De Niro",
                hint: "Robert"
            },
            {
                name: "Denzel Washington",
                hint: "Denzel"
            },
            {
                name: "Betty White",
                hint: "Betty"
            },
            {
                name: "Scarlett Johansson",
                hint: "Scarlett"
            },
        ]
    },
    {
        title: "Movies",
        words: [
            {
                name: "The Godfather",
                hint: "Godfather"
            },
            {
                name: "Citizen Kane",
                hint: "Cit Kane"
            },
            {
                name: "The Wizard of Oz",
                hint: "Not in Kansas anymore"
            },
            {
                name: "The Silence of the Lambs",
                hint: "Be quite lambs"
            },
            {
                name: "Gladiator",
                hint: "Gladiator"
            }
        ]
    },
    {
        title: "Animals",
        words: [
            { 
                name: "Red Panda",
                hint: "Cute fluffy mammal"
            },
            {
                name: "Axolotl",
                hint: "aka Mexican walking fish"
            },
            {
                name: "Brown Bear",
                hint: "Bear"
            },
            {
                name: "Panther",
                hint: "Black Cat"
            },
            {
                name: "Baboon",
                hint: "Has a red butt"
            },
            {
                name: "Condor",
                hint: "Largest bird"
            }
        ]
    },
    {
        title: "NFL Teams",
        words: [
            {
                name: "Seattle Seahawks",
                hint: "seattle seahawks"
            },
            {
                name: "Chicago Bears",
                hint: "Chicago bears"
            },
            {
                name: "Kansas City Chiefs",
                hint: "Chiefs"
            },
            {
                name: "Buffalo Bills",
                hint: "Buffalo Bills"
            },
            {
                name: "Jacksonville Jaguars",
                hint: "Jacksonville Jaguars"
            }
        ]
    }
];

let category = "",
    guessingWord = "",
    hint = "",
    guesses = 10,
    removedCategoryButtons = [];

const randomWordSelector = (categoryName) => {
    wordList.forEach( (el) => {
        if (el.title === categoryName) {
            index = getRandomInt(el.words.length);
            word = el.words[index].name;
            hint = el.words[index].hint;
        }
    }); 
    return word;
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

function focusSelectedCategory() {
    let categoryButtons = $(".categories > div");

    categoryButtons.each(function(){
        if(this.children[0].textContent != category){
            removedCategoryButtons.push($(this).detach()) 
        } else {
            removedCategoryButtons.push($(this));
        }
    });
    $(".category-header > div > h6").text("Category:");
}

function resetCategorySelector() {
    $(".category-header > div > h6").text("Pick a Category:");

    removedCategoryButtons.forEach(function(el){
        $(".categories").append(el);
    });
    
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
    $(".input-area").show(400, "swing");
}

function insertEmptyUnderscore(str, line){
    $(".underscore-display").append("<div id=" + line + " class='row justify-content-center text-center'></div>")
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

function endGame() {
    alert("Game Over");
}

function gameWon() {
    alert("Game Won");
}

function resetGame() {
    let inputButtons = $(".input-area > div > div > button");

    category = "",
    guessingWord = "",
    hint = "",
    guesses = 10;

    $(".input-area").hide();
    $(".underscore-display").empty();
    $(".hint-display").remove();
    resetCategorySelector();

    inputButtons.each( function() {
        $(this).removeClass("guessed-letter");
    });
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


$(document).ready( function() {
    // Add event listeners here
    
    // Input Button
    $(".col > button").click(function() {
        let guessLetter = $(this).text();
        
        if (isGuessLetterCorrect(guessLetter)) {
            $(this).addClass("guessed-letter");
            displayGuessedLetter(guessLetter);
            if(isGameWon()) {
                gameWon();
            }
        } else if (guesses === 1){
            endGame();
        } else {
            guesses--; 
            $(this).addClass("guessed-letter")
        }
    });

    // Categories Button
    $(".categories > div > button").click(function() {
        category = $(this).text();
        guessingWord = randomWordSelector(category);
        focusSelectedCategory();
        displayEmptyUnderscore();
        displayInputArea();
        console.log(guessingWord);
    });

    // Hint Button
    $("#hint").click(function(){
        if($(".hint-display").length === 0){
            $(".input-area").before("<div class='row justify-content-center text-center hint-display'><div class='col'>Hint: " + hint + "</div>");
        }
    });

    // Play Again Button
    $("#play-again").click(function(){
        resetGame();
    });
});

