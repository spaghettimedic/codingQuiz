var questions = [
    {
        question: "Commonly used data types do NOT include:",
        answer: "3. alerts",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    },
    {
        question: "The condition of an if/else statement is enclosed with _________.",
        answer: "2. curly brackets",
        options: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"]
    },
    {
        question: "Arrays in Javascript can be used to store _________.",
        answer: "4. all of the above",
        options: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"]
    },
    {
        question: "String values must enclosed within ________ when being assigned to variables.",
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


var sec = 75;


function timer() {
    var timer = 
        setInterval(function() {
            timerEl.innerHTML = "Timer: " + sec;
            sec--;
            if (sec < 0) {
                clearInterval(timer);
                return alert("You ran out of time!");
            };
    }, 1000);
};


var queGenerator = function() {
    
    quizContainerEl.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
        var question = questions[i].question;
        var answer = questions[i].answer;

        // create a p element for every question
        var questionEl = document.createElement("p");
        questionEl.classList = "question";
        questionEl.textContent = question;
        quizContainerEl.appendChild(questionEl);

        for (let o = 0; o < questions[i].options.length; o++) {
            var option = questions[i].options;

            // create a button element for every option
            var btnOptionEl1 = document.createElement("button");
            btnOptionEl1.classList = "options";
            btnOptionEl1.textContent = option[o];
            quizContainerEl.appendChild(btnOptionEl1);

            var optionSelected = document.querySelectorAll(".options");

            // add event listener to option buttons and perform necessary actions based on user's choice
            for (var b = 0; b < optionSelected.length; b++) {

                // create a div to hold the answerConfirm message when an option is selected
                var answerConfirmEl = document.createElement("div");
                answerConfirmEl.classList = "answerConfirm";
                answerConfirmEl.id = "answerConfirm";

                if (this.textContent === answer) {
                    optionSelected[b].addEventListener("click", function(){
                        answerConfirmEl.innerHTML = "<br><hr><p><em>Correct!</em></p>"
                        quizContainerEl.appendChild(answerConfirmEl);
                        question++;
                        option++;
                        answer++;
                        
                        console.log("answerRight!");
                    })
                } else {
                    optionSelected[b].addEventListener("click", function() {
                        answerConfirmEl.innerHTML = "<br><hr><p><em>Wrong!</em></p>"
                        quizContainerEl.appendChild(answerConfirmEl);
                        question++;
                        option++;
                        answer++;

                        sec = sec - 10;
                        if (sec < 0) {
                            sec = 0;
                        };
                        console.log("answerWrong!");
                        console.log(answer);
                    });
                };
            };
        };
    }
    // capture timerScore when all questions have been answered
    var timerScore = sec
    handleScore();

};


// will store the current score if it is high enough in localStorage
var handleScore = function() {

    var userInfo = {
        initials: "",
        score: timerScore.value
    };

    quizContainerEl.innerHTML = "";

    var yourScoreEl = document.createElement("div");
    yourScoreEl.classList = "yourScore";
    yourScoreEl.id = "yourScore";
    yourScoreEl.innerHTML = "<form><p class='done'>All Done!</p>" +
    "<p class='finalScore'>Your final score is " + userInfo.score + "</p>" +
    "<label for='initials'>Enter initials: </label>" +
    "<input id='userInput' type='text' placeholder='initials'>" +
    "<button class='initialsSubmit'>Submit</button></form>";

    userInfo.initials = document.getElementById("userInput").value;

    localStorage.setItem("initials", userInfo.initials);
    localStorage.setItem("score", userInfo.score);
};

// will access localStorage on button click
function viewHighScores() {
    quizContainerEl.innerHTML = "";
    var highScoreEl = document.createElement("div");
    highScoreEl.innerHTML = "<h2>High Scores</h2>" +
    "<ul>" + "</ul>" +
    "<br><button class='goBack' id='goBack'>Go Back</button>" +
    "<button class='clearHighScores'>Clear High Scores</button>";
    quizContainerEl.appendChild(highScoreEl);

    var btnGoBackEl = document.getElementById("goBack");


    btnGoBackEl.addEventListener("click", function() {
        window.location.reload();
    });
};

btnHighScoreEl.addEventListener("click", viewHighScores);
btnStartEl.addEventListener("click", queGenerator);
btnStartEl.addEventListener("click", timer);
