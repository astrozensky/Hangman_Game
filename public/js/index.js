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
    hint = "";

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

const displayEmptyUnderscore = () => {
        const maxLineLength = 12;
        if(guessingWord.length > maxLineLength) {
            let spliceIndex = guessingWord.lastIndexOf(" ", maxLineLength);
            let lineOneWord = guessingWord.slice(0, spliceIndex);
            let lineTwoWord = guessingWord.slice(spliceIndex + 1);
            

            insertEmptyUnderscore(lineOneWord, "one");
            insertEmptyUnderscore(lineTwoWord, "two");
        } else {
            insertEmptyUnderscore(guessingWord);
        }
}

function insertEmptyUnderscore(str, line){
    $(".underscore-display").append("<div id=" + line + " class='row justify-content-center text-center'></div>")
    for (let i = 0; i < str.length; i++){
        if(str.charAt(i) !== " "){
            $(".underscore-display > #" + line).append("<div class='col underscore'>" + str.charAt(i) + "</div>");
        } else {
            $(".underscore-display > #" + line).append("<div class='col space'>space</div>");
        }
    }
    
}

$(document).ready( function() {
    // Add event listeners here
    
    // Input Button
    $(".col > button").click(function() {
        $(this).addClass("guessed-letter")
    });

    // Categories Button
    $(".categories > div > button").click(function() {
        category = $(this).text();
        guessingWord = randomWordSelector(category);
        displayEmptyUnderscore();
        console.log(guessingWord);
    });
});

