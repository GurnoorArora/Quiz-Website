const questions = [
    {
        question: "Which data structure operates on a last-in, first-out (LIFO) basis?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Heap", correct: false },
            { text: "Tree", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Texting Markup Language", correct: false }
        ]
    },
    {
        question: "Which programming language is used to style web pages?",
        answers: [
            { text: "Java", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "What is the primary function of a CPU?",
        answers: [
            { text: "To store data", correct: false },
            { text: "To process data", correct: true },
            { text: "To display data", correct: false },
            { text: "To connect to the internet", correct: false }
        ]
    },
    {
        question: "What does SQL stand for?",
        answers: [
            { text: "Simple Query Language", correct: false },
            { text: "Structured Query Language", correct: true },
            { text: "Standard Question Language", correct: false },
            { text: "Software Query Language", correct: false }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer-display"); // Reference to the timer display

let currentQuestionIndex = 0;
let score = 0;
let timerInterval; // Variable to hold the timer interval

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    startTimer(); // Start the timer when the quiz starts
}

function startTimer() {
    let timeLeft = 30;
    timerDisplay.innerText = timeLeft; // Reset the timer display for each question
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleNextButton(); // Move to the next question when the timer runs out
        }
        timerDisplay.innerText = timeLeft;
        timeLeft--;
    }, 1000);
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    clearInterval(timerInterval); // Clear the timer interval for each question
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


    function showScore() {
        resetState();
        timerDisplay.innerText=''
        timerDisplay.parentNode.removeChild(timerDisplay); // Remove the timer display
        questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }
    


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        startTimer(); // Restart the timer for the next question
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();