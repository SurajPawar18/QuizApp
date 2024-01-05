const questions = [
    {
        question: "What is the main purpose of the 'public static void main(String[] args)' method in Java?",
        answers: [
            { text: "To declare variables", correct: false },
            { text: "To print 'Hello, World!'", correct: false },
            { text: "To serve as the entry point of a Java program", correct: true },
            { text: "To define a class", correct: false }
        ]
    },
    {
        question: "Which keyword is used to define a constant in Java?",
        answers: [
            { text: "final", correct: true },
            { text: "const", correct: false },
            { text: "static", correct: false },
            { text: "define", correct: false }
        ]
    },
    {
        question: "What is the default value of the data type 'int' in Java?",
        answers: [
            { text: "0.0", correct: false },
            { text: "null", correct: false },
            { text: "0", correct: true },
            { text: "false", correct: false }
        ]
    },
    {
        question: "Which of the following is a valid declaration of a String in Java?",
        answers: [
            { text: "String s = 'Hello';", correct: false },
            { text: "String s = \"Hello\";", correct: true },
            { text: "String s = (String) 'Hello';", correct: false },
            { text: "String s = new String('Hello');", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'this' keyword in Java?",
        answers: [
            { text: "To refer to the current instance of the class", correct: true },
            { text: "To create a new object", correct: false },
            { text: "To define a constructor", correct: false },
            { text: "To access static methods", correct: false }
        ]
    },
    {
        question: "Which loop is guaranteed to execute at least once in Java?",
        answers: [
            { text: "for loop", correct: false },
            { text: "while loop", correct: false },
            { text: "do-while loop", correct: true },
            { text: "foreach loop", correct: false }
        ]
    },
    {
        question: "What is the output of the code: 'System.out.println(5/2);' in Java?",
        answers: [
            { text: "2.5", correct: false },
            { text: "2", correct: true },
            { text: "2.0", correct: false },
            { text: "5/2", correct: false }
        ]
    },
    {
        question: "Which class is the superclass of all classes in Java?",
        answers: [
            { text: "Object", correct: true },
            { text: "Superclass", correct: false },
            { text: "Root", correct: false },
            { text: "Main", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'break' statement in Java?",
        answers: [
            { text: "To exit the program", correct: false },
            { text: "To skip the current iteration of a loop", correct: true },
            { text: "To go to the next case in a switch statement", correct: false },
            { text: "To terminate a method", correct: false }
        ]
    },
    {
        question: "Which Java keyword is used to implement multiple inheritance?",
        answers: [
            { text: "extends", correct: true },
            { text: "implements", correct: false },
            { text: "inherit", correct: false },
            { text: "interface", correct: false }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Function to display a question and its answers
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);

        // Set a data attribute to mark the correct answer
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        // Add an event listener to handle answer selection
        button.addEventListener("click", selectAnswer);
    });
}

// Function to reset the state by removing previous buttons
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to handle user's answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // Add appropriate classes based on correctness
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Disable all buttons and mark the correct one
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    // Display the "Next" button
    nextButton.style.display = "block";
}

// Function to display the final score
function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Function to handle the "Next" button click
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Initial quiz start
startQuiz();