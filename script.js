import { quizData } from './data.js';

// ES6 Arrow Functions
const getElement = id => document.getElementById(id);

// Quiz Variables
let currentQuestionIndex = 0;
let score = 0;
const userAnswers = []; // Store user answers

const renderQuestion = () => {
    const quizContainer = getElement('quiz');
    const { question, options } = quizData[currentQuestionIndex];
    
    quizContainer.innerHTML = `
        <div class="question">
            <p>${question}</p>
            ${options.map(option => `
                <label>
                    <input type="radio" name="option" value="${option}"> ${option}
                </label>
            `).join('')}
        </div>
    `;
};

const handleNextQuestion = () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.value;
        userAnswers[currentQuestionIndex] = userAnswer; // Save user answer
        if (userAnswer === quizData[currentQuestionIndex].answer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            renderQuestion();
        } else {
            saveResultsAndRedirect();
        }
    } else {
        alert('Please select an answer!');
    }
};

const saveResultsAndRedirect = () => {
    // Store results in localStorage
    localStorage.setItem('quizScore', score);
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('quizData', JSON.stringify(quizData));

    // Redirect to results page
    window.location.href = 'results.html';
};

// Event Listeners
getElement('next-btn').addEventListener('click', handleNextQuestion);

// Initial Render
renderQuestion();
