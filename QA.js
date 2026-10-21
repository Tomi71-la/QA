// ---------- 1. Question bank ----------
// correctAnswer is the position of the right choice, counting from 0.
const questionBank = [
    {
        question: "What does CSS stand for?",
        choices: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: 1
    },
    {
        question: "Which language provides structure to a webpage?",
        choices: ["Java", "CSS", "HTML", "Python"],
        correctAnswer: 2
    },
    {
        question: "What does HTML stand for?",
        choices: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which language adds behavior and interactivity to a webpage?",
        choices: ["HTML", "CSS", "JavaScript", "XML"],
        correctAnswer: 2
    },
    {
        question: "Which file extension is used for JavaScript files?",
        choices: [".java", ".js", ".script", ".jsx"],
        correctAnswer: 1
    }
];

// ---------- 2. Variables that change while the quiz runs ----------
let currentQuestionIndex = 0;
let score = 0;
let selectedChoice = null; // null means "nothing picked yet"

// ---------- 3. Elements from the page ----------
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const progressText = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const choicesBox = document.getElementById("choices");
const scoreText = document.getElementById("score");
const messageText = document.getElementById("message");

// ---------- 4. Functions ----------

// Put the current question and its choices on the page
function loadQuestion() {
    const current = questionBank[currentQuestionIndex];

    progressText.textContent =
        "Question " + (currentQuestionIndex + 1) + " of " + questionBank.length;
    questionText.textContent = current.question;

    // Clear the old choices, then reset the selection
    choicesBox.innerHTML = "";
    selectedChoice = null;
    nextBtn.disabled = true;

    // Build one button per choice
    current.choices.forEach(function (choiceText, position) {
        const button = document.createElement("button");
        button.textContent = choiceText;
        button.classList.add("choice-btn");
        button.addEventListener("click", function () {
            selectChoice(button, position);
        });
        choicesBox.appendChild(button);
    });
}

// Highlight the clicked choice and enable Next
function selectChoice(clickedButton, position) {
    const allChoices = document.querySelectorAll(".choice-btn");
    allChoices.forEach(function (button) {
        button.classList.remove("selected");
    });

    clickedButton.classList.add("selected");
    selectedChoice = position;
    nextBtn.disabled = false;
}

// Show the final score and a message based on performance
function showResults() {
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";

    scoreText.textContent = "You scored " + score + "/" + questionBank.length + "!";

    const percentage = (score / questionBank.length) * 100;

    if (percentage >= 80) {
        messageText.textContent = "Excellent work!";
    } else if (percentage >= 50) {
        messageText.textContent = "Good effort. Keep practicing!";
    } else {
        messageText.textContent = "Keep learning and try again!";
    }
}

// ---------- 5. Event listeners ----------

// Start Quiz: hide the Start Screen, show the Quiz Screen
startBtn.addEventListener("click", function () {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";

    currentQuestionIndex = 0;
    score = 0;
    selectedChoice = null;

    loadQuestion();
});

// Next: check the answer, then move on or finish
nextBtn.addEventListener("click", function () {
    if (selectedChoice === null) {
        return; // nothing picked, do nothing
    }

    if (selectedChoice === questionBank[currentQuestionIndex].correctAnswer) {
        score = score + 1;
    }

    currentQuestionIndex = currentQuestionIndex + 1;

    if (currentQuestionIndex < questionBank.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Restart Quiz: reset everything and go back to the Start Screen
restartBtn.addEventListener("click", function () {
    currentQuestionIndex = 0;
    score = 0;
    selectedChoice = null;

    resultScreen.style.display = "none";
    startScreen.style.display = "block";
});