var questions = [
  {
    question: " What is the smallest country in the world?",
    choices: ["Vatican City", "Paris", "Vietnam", "Phillipine"],
    answer: "Vatican City ",
  },
  {
    question:" Alberta is a province of which country?",
    choices: ["USA", "Canada", "Austrailia", "England"],
    answer: "Canada",
  },
  {
    question:"What is the largest country in the world?",
    choices: ["USA", "Canada", "Russia", "Europe"],
    answer: "Russia",
  },
  {
    question:" Where would you find the River Thames?",
    choices: ["Chile ", "UK", "USA", "India"],
    answer: "UK",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var start = document.querySelector("#start");

var questionIndex = 0;
var correctCount = 0;
var time = 12;
var intervalId;

function startQuiz(){
  var startEl = document.getElementById("start");
  // un-hide questions section
  questionsEl.removeAttribute("question");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  renderQuestion();
}


function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
  setTimeout(showHighScore, 2);
}

function showHighScore() {
  var name = prompt("Please enter your name");

  var high_scores = localStorage.getItem("scores");

  if (!high_scores) {
    high_scores = [];
  } else {
    high_scores = JSON.parse(high_scores);
  }

  high_scores.push({ name: name, score: correctCount });

  localStorage.setItem("scores", JSON.stringify(high_scores));

  high_scores.sort(function (a, b) {
    return b.score - a.score;
  });

  var contentUL = document.createElement("ul");

  for (var i = 0; i < high_scores.length; i++) {
    var contentLI = document.createElement("button");
    contentLI.textContent =
      "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
    contentUL.appendChild(contentLI);
  }

  document.body.appendChild(contentUL);
}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  
  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("button");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);