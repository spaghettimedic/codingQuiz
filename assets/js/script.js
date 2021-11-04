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
var btnStart = document.querySelector("#btn-start");
var header = document.querySelector("header");
var btnOption = document.querySelector(".options");


// function timer() {
//     var sec = 75;
//     var timer = 
//         document.createElement("p");
//         timer.className = "timer";
//         timer.id = "timer";
//         setInterval(function() {
//             document.getElementById("timer").innerHTML = "Timer: " + sec;
//             sec--;
//             if (sec < 65) {
//                 clearInterval(timer);
//                 return alert("You ran out of time!");
//             };
//     });
//     header.appendChild(timer);
// };


var quizStart = function() {
    document.getElementById("quiz-container").innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var question = questions[i].question;

        // create a p element for every question
        var questionEl = document.createElement("p");
        questionEl.classList = "question";
        questionEl.textContent = question;
        quizContainerEl.appendChild(questionEl);

        for (var o = 0; o < questions[i].options.length; o++) {
            var option = questions[i].options[o];

            // create a button element for every option
            var optionEl = document.createElement("button");
            optionEl.classList = "options";
            optionEl.textContent = option;
            quizContainerEl.appendChild(optionEl);
        };
    }

    var max = Math.max($("#option0").width(), $("#option1").width(), $("#option2").width(), $("#option3").width());
    $("#option0").width(max);
    $("#option1").width(max);
    $("#option2").width(max);
    $("#option3").width(max);
};

var checkAnswer = function(optionSelected) {
    if (optionSelected === answer) {
        var answerConfirmEl = document.createElement("div")
        answerConfirmEl.classList = "answerConfirm";
        answerConfirmEl.innerHTML = "<hr><p><em>Correct!</em></p>"
        quizContainerEl.appendChild(answerConfirmEl);
    } else {
        var answerConfirmEl = document.createElement("div")
        answerConfirmEl.classList = "answerConfirm";
        answerConfirmEl.innerHTML = "<hr><p><em>Wrong!</em></p>"
        quizContainerEl.appendChild(answerConfirmEl);
    }
};

// will access localStorage on button click
function viewHighScores() {


}

btnStart.addEventListener("click", quizStart);
btnStart.addEventListener("click", timer);
btnOption.addEventListener("click", checkAnswer);
