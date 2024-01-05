let currentQuestion = 0;
let score = 0;
let timeLeft = 75;
let timer;
let choicesContainer;
let timerElement; 
let questionTitle;
let endScreen;
let finalScore;
let initialsInput;
let submitButton; 

const questions = [
  {
    question: "What is HTML?",
    choices: [
      "HyperText Markup Language",
      "A styling language",
      "A web browser",
    ],
    answer: 0,
  },

  {
    question:
      "Which of the following languages is predominantly used for styling?",
    choices: ["HTML", "CSS", "JavaScript"],
    answer: 1,
  },

  {
    question: "Which tag is used to reference an external CSS file?",
    choices: ["<script>", "<link>", "<style>"],
    answer: 2,
  },

  {
    question: "Which HTML attribute is used to define inline styles?",
    choices: ["font", "class", "style"],
    answer: 2,
  },
];

document.addEventListener("DOMContentLoaded", function () {
    startButton = document.getElementById("startButton");
    startScreen = document.getElementById("startScreen");
    questionScreen = document.getElementById("questionScreen");
    questionTitle = document.getElementById("questionTitle");
    choicesContainer = document.getElementById("choices");
    endScreen = document.getElementById("endScreen");
    finalScore = document.getElementById("finalScore");
    timerElement = document.getElementById("time");
    initialsInput = document.getElementById("initials");
    submitButton = document.getElementById("submitButton");
    
    if (!startScreen || !questionScreen || !endScreen || !submitButton) {
        console.error("One or more elements not found in HTML");
        return; 
    }

    startButton.addEventListener("click", startQuiz); 

    submitButton.addEventListener("click", () => {
        const initials = initialsInput.value;
        if (initials) {
            saveHighScore(initials, score);
        } else {
            alert("please enter initials to save score"); 
        }
    }); 

    showStartScreen()
}); 

function showStartScreen() {
  startScreen.classList.remove("hide");
  questionScreen.classList.add("hide");
  endScreen.classList.add("hide");
}

function startQuiz() {
  startScreen.classList.add("hide");
  questionScreen.classList.remove("hide");
  startTimer();
  showQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timerElement.textContent = timeLeft;
      timeLeft--;
    } else {
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  const current = questions[currentQuestion];
  questionTitle.textContent = current.question;
  choicesContainer.innerHTML = "";

  current.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("choice");
    button.addEventListener("click", () => checkAnswer(index));
    choicesContainer.appendChild(button);
  });
}

function checkAnswer(index) {
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

function endQuiz() {
  clearInterval(timer);
  questionScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.textContent = score;
}

function saveHighScore(initials, score) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({initials, score});
    localStorage.setItem("highScores", JSON.stringify(highScores));
    console.log("High score saved:", highScores); 
}