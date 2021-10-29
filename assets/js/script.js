var quizContainerEl = document.querySelector("#quiz-container");
var btnStart = document.querySelector("#btn-start");
var header = document.querySelector("header")

const questions = [
    "Commonly used data types do NOT include:",
    "The condition of an if/else statement is enclosed with _________.",
    "Arrays in Javascript can be used to store _________.",
    "String values must enclosed within ________ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is ________."
];

const answers1 = ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"];
const answers2 = ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"];
const answers3 = ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"];
const answers4 = ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"];


var startPrompt = function() {

    var startPromptH2 = document.createElement("h2");
    startPromptH2.className = "startPrompt";
    startPromptH2.textContent = "Coding Quiz Challenge";
    quizContainerEl.appendChild(startPromptH2);

    var startPromptP = document.createElement("p");
    startPromptP.className = "startPrompt p"
    startPromptP.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time/score by 10 seconds!";
    quizContainerEl.appendChild(startPromptP);

    var btnStart = document.createElement("button");
    btnStart.className = "btn-start";
    btnStart.id = "btn-start";
    btnStart.type = "button";
    btnStart.textContent = "Start Quiz";
    quizContainerEl.appendChild(btnStart);

    btnStart.addEventListener("click", quizStart);
    btnStart.addEventListener("click", timer);
};

function timer() {
    var sec = 75;
    var timer = 
        document.createElement("p");
        timer.className = "timer";
        timer.id = "timer";
        setInterval(function() {
            document.getElementById("timer").innerHTML = "Timer: " + sec;
            sec--;
            if (sec < 69) {
                clearInterval(timer);
                return alert("You ran out of time!");
            };
    });
    header.appendChild(timer);
};

var quizStart = function() {
    document.getElementById("quiz-container").innerHTML = "";

    var question1 = document.createElement("p");
    question1.className = "question";
    question1.textContent = questions[0];
    quizContainerEl.appendChild(question1);

    var buttonAnswers0 = document.createElement("button");
    buttonAnswers0.className = "options";
    buttonAnswers0.id = "option0";
    buttonAnswers0.textContent = answers1[0];
    quizContainerEl.appendChild(buttonAnswers0);

    var buttonAnswers1 = document.createElement("button");
    buttonAnswers1.className = "options";
    buttonAnswers1.id = "option1";
    buttonAnswers1.textContent = answers1[1];
    quizContainerEl.appendChild(buttonAnswers1);

    var buttonAnswers2 = document.createElement("button");
    buttonAnswers2.className = "options";
    buttonAnswers2.id = "option2";
    buttonAnswers2.textContent = answers1[2];
    quizContainerEl.appendChild(buttonAnswers2);

    var buttonAnswers3 = document.createElement("button");
    buttonAnswers3.className = "options";
    buttonAnswers3.id = "option3";
    buttonAnswers3.textContent = answers1[3];
    quizContainerEl.appendChild(buttonAnswers3);

    var max = Math.max($("#option0").width(), $("#option1").width(), $("#option2").width(), $("#option3").width());
    $("#option0").width(max);
    $("#option1").width(max);
    $("#option2").width(max);
    $("#option3").width(max);
};

// will access localStorage on button click
function viewHighScores() {


}

document.onload = startPrompt();
