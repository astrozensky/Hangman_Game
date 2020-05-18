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

const category = "";

$(document).ready( function() {
    // Add event listeners here
    
    // Input Button
    $(".col > button").click(function() {
        $(this).addClass("guessed-letter")
    });

    // Categories Button
    $(".categories > div > button").click(function() {
        alert("works");
    });
});

