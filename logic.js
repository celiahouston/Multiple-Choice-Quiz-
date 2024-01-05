const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("start-screen"); 
const questionScreen = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const choicesContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submitButton");
const timerElement = document.getElementById("time");
let currentQuestion = 0;
let score = 0;
let timeLeft = 75;
let timer;

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
    question: "Which of the following languages is predominantly used for styling?",
    choices: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    answer: 1,
  },

  {
    question: "Which tag is used to reference an external CSS file?",
    choices: [
      "<script>",
      "<link>",
      "<style>",
    ],
    answer: 2,
  },

  {
    question: "Which HTML attribute is used to define inline styles?",
    choices: [
      "font",
      "class",
      "style",
    ],
    answer: 2,
  },
];

document.addEventListener("DOMContentLoaded", function () {
  showStartScreen();
});

function showStartScreen() {
  startScreen.classList.remove("hide");
  questionScreen.classList.add("hide");
  endScreen.classList.add("hide");
//   highscoresScreen.classList.add("hide");
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

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", () => {
  const initials = initialsInput.value;
  if (initials) {
    saveHighScore(initials, score);
  } else {
    alert("Please enter initials to save score.");
  }
});

function saveHighScore(initials, score) {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials, score });
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

showStartScreen();
