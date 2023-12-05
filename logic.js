const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionTitle = document.getElementById("question-title");
// const questionContainer = document.getElementById("questions"); 
const questionScreen = document.getElementById("questionScreen"); 
const choicesContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit-score");
const timerElement = document.getElementById("time");
const highscoresScreen = document.getElementById("submitScore"); 

let currentQuestion = 0;
let score = 0;
let timeLeft = 75; 

const questions = [
    {
        question:"What is HTML?", 
        choices: [
        "HyperText Markup Language",
        "A styling language", 
        "A web browser",
        ], 
        answer: 0 
    }, 
];

// export default questions; 

// add in questions and choices 

document.addEventListener("DOMContentLoaded", function(){
    showStartScreen(); 
})

function showStartScreen() {
    startScreen.classList.remove("hide");
    questionScreen.classList.add("hide");
    endScreen.classList.add("hide");
    highscoresScreen.classList.add("hide"); 
}

function startQuiz () {
    startScreen.classList.add("hide");
    questionScreen.classList.remove("hide"); 
    endScreen.classList.add("hide"); 
    startTimer();
    showQuestion(); 
    console.log("start button clicked.");
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timerElement.textContent = timeLeft;
            timeLeft--;
        } else {
            clearInterval(timer);
            endQuiz();
        }
    },1000); 
}

function showQuestion() { 
    startScreen.classList.add("hide");
    questionScreen.classList.remove("hide"); 
    endScreen.classList.add("hide");
    highscoresScreen.classList.add("hide");
    const current = questions[currentQuestion];
    const questionTitle = document.getElementById("question-title");
    const choicesContainer = document.getElementById("choices"); 

    questionTitle.textContent = current.question;
    choicesContainer.innerHTML = ""; 

    current.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice; 
        button.addEventListener("click", () => {
            checkAnswer(index);
        })
        choicesContainer.appendChild(button); 
    }); 
}


function checkAnswer() {
    if (index === questions[currentQuestion].answer) {
        score += 10;
    } else {
        timeLeft -= 10;
    } 
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz(); 
    }
}

// function showEndScreen() {
//     startScreen.classList.add("hide");
//     questionScreen.classList.add("hide");
//     endScreen.classList.remove("hide");
//     highscoresScreen.classList.add("hide"); 
// }

// function showHighScores() {
//     startScreen.classList.add("hide");
//     questionScreen.classList.add("hide");
//     endScreen.classList.add("hide");
//     highscoresScreen.classList.remove("hide"); 
// }

function endQuiz() {
    clearInterval(timer);
    // questionContainer.classList.add("hide"); 
    endScreen.classList.remove("hide");
    finalScore.textContent = score; 
}


startButton.addEventListener("click", () => {
    const initials = initialsInput.value; 
    console.log("Initials: ", initials, "Score: ", score);
    startTimer();
    showQuestion();
}); 

submitButton.addEventListener("click", () => {
    const initials = initialsInput.value;
    console.log("Initials: ", initials, "Score: ", score); 
    showHighScores(); 
}); 

showStartScreen(); 

// document.getElementById("questions").classList.add("hide"); 