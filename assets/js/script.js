var questions = [
    {
        question: "Commonly used data types do NOT include:",
        answer: "3. alerts",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    },
    {
        question: "The condition of an if/else statement is enclosed with _________.",
        answer: "3. parentheses",
        options: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"]
    },
    {
        question: "Arrays in Javascript can be used to store _________.",
        answer: "4. all of the above",
        options: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"]
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answer: "3. quotes",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is ________.",
        answer: "4. console.log",
        options: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"]
    }
];

var quizContainerEl = document.querySelector("#quiz-container");
var btnStartEl = document.querySelector("#btn-start");
var headerEl = document.querySelector("header");
var timerEl = document.querySelector("#timer");
var btnHighScoreEl = document.querySelector("#highScores");
var btnContainerEl = document.querySelector("#button-container");


var userInfo = {
    initials: "",
    score: ""
};
var sec = 75;
let counter = 0;


var timer = function() {
    var time = setInterval(function() {
        timerEl.innerHTML = "Timer: " + sec;
        sec--;
        if (sec < 0) {
            clearInterval(time);
            return alert("You ran out of time!");
        };
        if (counter >= questions.length) {
            clearInterval(time);
        };
    }, 1000);
};

var queGenerator = function() {
    quizContainerEl.innerHTML = "";
    var question = questions[counter].question;

    // create a p element for every question
    var questionEl = document.createElement("p");
    questionEl.classList = "question";
    questionEl.textContent = question;
    quizContainerEl.appendChild(questionEl);

    // create a div to hold all the btnOptions and assign eventListener
    var btnContainerEl = document.createElement("div");
    btnContainerEl.id = "button-container";
    quizContainerEl.appendChild(btnContainerEl);

    for (let i = 0; i < questions[counter].options.length; i++) {
        var option = questions[counter].options;

        // create a button element for every option
        var btnOptionEl = document.createElement("button");
        btnOptionEl.classList = "options";
        btnOptionEl.textContent = option[i];
        btnContainerEl.appendChild(btnOptionEl);
        btnContainerEl.addEventListener("click", checkAnswer);
    };
};

var checkAnswer = function(event) {
    var checkAnswerEl = document.createElement("div");
    checkAnswerEl.classList = "answerConfirm";
    checkAnswerEl.id = "answerConfirm";
    checkAnswerEl.innerHTML = "";
    quizContainerEl.appendChild(checkAnswerEl);

    if (event.target.innerHTML === questions[counter].answer) {
        checkAnswerEl.innerHTML = "<hr><p><em>Correct!</em></p>"
    } else {
        checkAnswerEl.innerHTML = "<hr><p><em>Wrong!</em></p>"
        sec = sec - 10;
        if (sec < 0) {
            sec = 0;
            timerScore = sec;
            if (timerScore < 0) {
                timerScore = 0;
            }
            alert("You ran out of time!");
            clearInterval();
            handleScore();
            return timerScore;
        };
    };
    counter++;
    if (counter >= questions.length) {
        timerScore = sec;
        clearInterval();
        handleScore();
        return timerScore;
    } else {
        queGenerator();
    }
};


// will store the current score if it is high enough in localStorage
var handleScore = function() {

    quizContainerEl.innerHTML = "";
    userInfo.score = timerScore;

    var yourScoreEl = document.createElement("div");
    yourScoreEl.classList = "yourScore";
    yourScoreEl.id = "yourScore";
    yourScoreEl.innerHTML = "<form><p class='done'>All Done!</p>" +
    "<p class='finalScore'>Your final score is " +  userInfo.score + "</p>" +
    "<label for='initials'>Enter initials: </label>" +
    "<input id='initials' type='text' name='initials' placeholder='initials'>" +
    "<input type='submit' class='initialsSubmit'></form>";
    quizContainerEl.appendChild(yourScoreEl);

    document.querySelector(".initialsSubmit").addEventListener("click", function(event) {
        event.preventDefault();
        var initials = document.getElementById("initials").value;
        userInfo.initials = initials;
        if (userInfo.initials === "" || userInfo.initials === null) {
            alert("Please enter your initials");
            return handleScore();
        } else {
            localStorage.setItem("initials", userInfo.initials);
            localStorage.setItem("score", userInfo.score);
            viewHighScores();
        }
    });
};

// will access localStorage on button click
function viewHighScores() {
    quizContainerEl.innerHTML = "";
    var highScoreInitialsKey = localStorage.getItem("initials");
    var highScoreScoreKey = localStorage.getItem("score");
    var highScoreEl = document.createElement("div");
    highScoreEl.innerHTML = "<h2>High Scores</h2>" +
    "<ul>" + 
    // insert <li> from localStorage
    "</ul>" +
    "<br><button class='goBack' id='goBack'>Go Back</button>" +
    "<button class='clearHighScores' id='clearHighScores'>Clear High Scores</button>";
    quizContainerEl.appendChild(highScoreEl);

    var ulEL = document.querySelector("ul");

    for (var i = 0; i < localStorage.length; i++) {
        var highScoreInitials = highScoreInitialsKey[i];
        var highScoreScore = highScoreScoreKey[i];

        var liEl = document.createElement("li");
        liEl.innerHTML = highScoreInitials + " - " + highScoreScore

        ulEL.appendChild(liEl);
    };

    document.getElementById("goBack").addEventListener("click", function() {
        window.location.reload();
    });
    document.getElementById("clearHighScores").addEventListener("click", function() {
        localStorage.clear();
        viewHighScores();
    });
};


btnHighScoreEl.addEventListener("click", viewHighScores);
btnStartEl.addEventListener("click", queGenerator);
btnStartEl.addEventListener("click", timer);
